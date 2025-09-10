import express from 'express';
import path from 'path';
import { resizeImage, resizeImagePath } from '../../utils/imageTransforms';
import { promises as fsPromises } from 'fs';
import fs from 'fs';

const images = express.Router();

images.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const filename = req.query.filename as string;
    const height = parseInt(req.query.height as string, 10);
    const width = parseInt(req.query.width as string, 10);

    // التحقق من الباراميترز
    if (!filename) {
      return res.status(400).render('errors', { message: 'Missing filename parameter' });
    }
    if (isNaN(height) || isNaN(width) || height <= 0 || width <= 0) {
      return res.status(400).render('errors', { message: 'Height and width must be positive numbers' });
    }

    const outputPath: string = resizeImagePath(filename, height, width);

    // إذا الصورة ليست موجودة مسبقًا، نقوم بإنشائها
    if (!fs.existsSync(outputPath)) {
      const resizedImage: Buffer = await resizeImage(filename, height, width);
      await fsPromises.writeFile(outputPath, new Uint8Array(resizedImage));
    }

    res.sendFile(path.resolve(outputPath));
  } catch (err: any) {
    res.status(500).render('errors', { message: err.message });
  }
});

export default images;
