import express from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const images = express.Router();

images.get('/', async (req, res) => {
  const filename = req.query.filename as string;
  const width = req.query.width;
  const height = req.query.height;

  // Validate filename
  if (!filename) {
    return res.status(400).send('Missing required parameter: filename');
  }

  // Validate width
  const widthNum = Number(width);
  if (
    width === undefined ||
    width === '' ||
    isNaN(widthNum) ||
    !isFinite(widthNum) ||
    widthNum <= 0
  ) {
    return res.status(400).send('Width must be a positive number');
  }

  // Validate height
  const heightNum = Number(height);
  if (
    height === undefined ||
    height === '' ||
    isNaN(heightNum) ||
    !isFinite(heightNum) ||
    heightNum <= 0
  ) {
    return res.status(400).send('Height must be a positive number');
  }

  const fullImagePath = path.resolve(__dirname, '../../images', `${filename}.jpg`);
  const thumbDir = path.resolve(__dirname, '../../thumb');
  const thumbPath = path.join(thumbDir, `${filename}_${widthNum}x${heightNum}.jpg`);

  // Ensure thumb directory exists
  if (!fs.existsSync(thumbDir)) {
    fs.mkdirSync(thumbDir);
  }

  // Serve cached image if exists
  if (fs.existsSync(thumbPath)) {
    return res.sendFile(thumbPath, (err) => {
      if (err) {
        res.status(500).send('Error sending cached image.');
      }
    });
  }

  // Check if original image exists
  if (!fs.existsSync(fullImagePath)) {
    return res.status(404).send('Original image not found.');
  }

  // Resize and cache
  try {
    await sharp(fullImagePath)
      .resize(widthNum, heightNum)
      .toFile(thumbPath);
    return res.sendFile(thumbPath, (err) => {
      if (err) {
        res.status(500).send('Error sending resized image.');
      }
    });
  } catch (err) {
    return res.status(500).send('Error processing image.');
  }
});

export default images;
