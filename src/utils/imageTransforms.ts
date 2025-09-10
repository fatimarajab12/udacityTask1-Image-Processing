import sharp from 'sharp';
import path from 'path';

export const resizeImage = (filename: string, height: number, width: number): Promise<Buffer> => {
  return sharp(path.resolve(`src/images/full/${filename}.jpg`))
    .resize({ height, width })
    .toBuffer();
};

export const resizeImagePath = (filename: string, height: number, width: number): string => {
  return `src/images/thumbnails/${filename}${height}x${width}.jpg`;
};
