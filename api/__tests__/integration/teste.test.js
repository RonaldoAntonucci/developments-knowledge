import request from 'supertest';
import app from '../../src/start/app';

describe('teste', () => {
  it('teste', async done => {
    const response = await request(app)
      .get('/')
      .send();

    expect(response.status).toBe(200);
    done();
  });
});
