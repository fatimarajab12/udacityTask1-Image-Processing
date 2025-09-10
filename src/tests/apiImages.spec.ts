import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('endpoint: /api/images', () => {
  it('gets /api/images?filename=fjord&height=700&width=400', async () => {
    const res = await request.get('/api/images?filename=fjord&width=400&height=700');
    expect(res.status).toBe(200);
  });
});
