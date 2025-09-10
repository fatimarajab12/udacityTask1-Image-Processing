import supertest from 'supertest';
import app from '../app';
const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('endpoint: /api/images', (): void => {
  it('gets /api/images?filename=fjord&height=700&width=400', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?filename=fjord&width=400&height=700'
    );
    expect(response.status).toBe(200);
  });
});
