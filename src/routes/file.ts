import path from 'path';
import { promises as fs } from 'fs';

const imagesFullPath = path.resolve(__dirname, '../images/full/');

const getAvailableImageNames = async (): Promise<string[]> => {
  try {
    return (await fs.readdir(imagesFullPath)).map(filename => filename.split('.')[0]);
  } catch {
    return [];
  }
};

export default getAvailableImageNames;
