import express from 'express';
import { promises as fsPromises } from 'fs';
import fs from 'fs';
import path from 'path';
import { resizeImage, resizeImagePath } from '../utils/imageTransforms';
import getAvailableImageNames from './file';

const routes = express.Router();

interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

const validate = async (query: ImageQuery): Promise<null | string> => {
  if (!query.filename) {
    const availableImageNames: string = (await getAvailableImageNames()).join(', ');
    return `Please pass a valid filename in the 'filename' query segment. Available filenames are: ${availableImageNames}.`;
  }

  if (!query.width && !query.height) return null;

  const width: number = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return "Please provide a positive numerical value for the 'width' query segment.";
  }

  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return "Please provide a positive numerical value for the 'height' query segment.";
  }

  return null;
};

routes.get('/images', async (req: express.Request, res: express.Response) => {
  try {
    const filename = req.query.filename as string;
    const height = parseInt(req.query.height as string);
    const width = parseInt(req.query.width as string);
    const outputPath: string = resizeImagePath(filename, height, width);

    const validationMessage: null | string = await validate(req.query);
    if (validationMessage) {
      res.send(validationMessage);
      return;
    }

    if (!fs.existsSync(outputPath)) {
      const resizedImage = await resizeImage(filename, height, width);
      await fsPromises.writeFile(outputPath, new Uint8Array(resizedImage));
    }

    res.sendFile(path.resolve(outputPath));
  } catch (err: any) {
    res.render('errors', { message: err.message });
  }
});

export default routes;
