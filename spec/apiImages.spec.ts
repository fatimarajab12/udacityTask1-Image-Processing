import supertest from 'supertest';
import app from '../src/app';
import fs from 'fs';
import path from 'path';

const request = supertest(app);

describe('Image Processing API', () => {
  const thumbnailPath = path.resolve('src/images/thumbnails/encenadaport200x200.jpg');

  afterAll(() => {
    if (fs.existsSync(thumbnailPath)) {
      fs.unlinkSync(thumbnailPath);
    }
  });

  it('Resolves successfully when provided the right filename, height and width parameters', async () => {
    const res = await request.get('/api/images?filename=encenadaport&height=200&width=200');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/image/);
  });

  it('Returns an error message for missing filename', async () => {
    const res = await request.get('/api/images?height=200&width=200');
    expect(res.text).toContain('Please pass a valid filename');
  });

  it('Returns an error message for invalid dimensions', async () => {
    const res = await request.get('/api/images?filename=encenadaport&height=-50&width=0');
    expect(res.text).toContain('Height and width must be positive numbers');
  });

  it('Returns 404 for unknown route', async () => {
    const res = await request.get('/api/unknown');
    expect(res.status).toBe(404);
    expect(res.text).toContain('404 - Page Not Found');
  });
});
