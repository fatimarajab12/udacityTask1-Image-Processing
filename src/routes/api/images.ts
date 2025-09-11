import express from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const images = express.Router();

images.get('/', async (req, res) => {
  const filename = req.query.filename as string;
  const width = parseInt(req.query.width as string, 10);
  const height = parseInt(req.query.height as string, 10);

  if (!filename || isNaN(width) || isNaN(height)) {
    return res.status(400).send('Missing or invalid parameters.');
  }

  const fullImagePath = path.resolve(__dirname, '../../images', `${filename}.jpg`);
  const thumbDir = path.resolve(__dirname, '../../thumb');
  const thumbPath = path.join(thumbDir, `${filename}_${width}x${height}.jpg`);

  // Ensure thumb directory exists
  if (!fs.existsSync(thumbDir)) {
    fs.mkdirSync(thumbDir);
  }

  // Serve cached image if exists
  if (fs.existsSync(thumbPath)) {
    return res.sendFile(thumbPath, (err) => {
      if (err) {
        res.status(500).send('Error sending image.');
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
      .resize(width, height)
      .toFile(thumbPath);
    return res.sendFile(thumbPath);
  } catch (err) {
    return res.status(500).send('Error processing image.');
  }
});

export default images;
