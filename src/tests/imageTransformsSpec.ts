import { resizeImage } from '../utils/imageTransforms';

describe('Testing image processing API', () => {
  it('Resolves successfully when provided the right filename, height and width parameters', async () => {
    await expectAsync(resizeImage('santamonica', 400, 200)).toBeResolved();
  });
});
