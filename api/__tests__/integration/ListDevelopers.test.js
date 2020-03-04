import request from 'supertest';
import app from '../../src/start/app';
import { factory, truncate } from '../utils';

describe('Developers List', () => {
  afterEach(async () => {
    await truncate();
  });

  it('Should be able to list developers with pagination', async () => {
    const total = 50;
    await factory.createMany('Developer', total);
    const limit = '30';
    const page = '2';
    const {
      status,
      body: { data, limit: limitData, page: pageData, total: totalData, count },
    } = await request(app)
      .get('/developers')
      .query({ limit, page })
      .send();

    expect(status).toBe(200);
    expect(limitData).toBe(limit);
    expect(data.length).toBe(limit - 10);
    expect(count).toBe(limit - 10);
    expect(pageData).toBe(page);
    expect(totalData).toBe(total);
    expect(data).toBeInstanceOf(Array);
  });
});
