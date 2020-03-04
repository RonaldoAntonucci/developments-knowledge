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

  it('Should be able to list developers with filter by shift (morning)', async () => {
    const total = 20;
    await Promise.all([
      factory.createMany('Developer', total / 2, { shift: 'night' }),
      factory.createMany('Developer', total / 2, { shift: 'morning' }),
    ]);
    const limit = '15';
    const page = '1';
    const {
      status,
      body: { data, limit: limitData, page: pageData, total: totalData, count },
    } = await request(app)
      .get('/developers')
      .query({ limit, page, shift: 'morning' })
      .send();

    expect(status).toBe(200);
    data.map(developer => expect(developer.shift).toBe('morning'));
    expect(limitData).toBe(limit);
    expect(data.length).toBe(10);
    expect(count).toBe(10);
    expect(pageData).toBe(page);
    expect(totalData).toBe(total / 2);
    expect(data).toBeInstanceOf(Array);
  });

  it('Should be able to list developers with filter by shift (afternoon)', async () => {
    const total = 20;
    await Promise.all([
      factory.createMany('Developer', total / 2, { shift: 'night' }),
      factory.createMany('Developer', total / 2, { shift: 'afternoon' }),
    ]);
    const limit = '15';
    const page = '1';
    const {
      status,
      body: { data, limit: limitData, page: pageData, total: totalData, count },
    } = await request(app)
      .get('/developers')
      .query({ limit, page, shift: 'afternoon' })
      .send();

    expect(status).toBe(200);
    data.map(developer => expect(developer.shift).toBe('afternoon'));
    expect(limitData).toBe(limit);
    expect(data.length).toBe(10);
    expect(count).toBe(10);
    expect(pageData).toBe(page);
    expect(totalData).toBe(total / 2);
    expect(data).toBeInstanceOf(Array);
  });

  it('Should be able to list developers with filter by shift (night)', async () => {
    const total = 20;
    await Promise.all([
      factory.createMany('Developer', total / 2, { shift: 'morning' }),
      factory.createMany('Developer', total / 2, { shift: 'night' }),
    ]);
    const limit = '15';
    const page = '1';
    const {
      status,
      body: { data, limit: limitData, page: pageData, total: totalData, count },
    } = await request(app)
      .get('/developers')
      .query({
        limit,
        page,
        shift: 'night',
        orderBy: 'skills.nodejs',
        desc: true,
      })
      .send();

    expect(status).toBe(200);
    data.map(developer => expect(developer.shift).toBe('night'));
    expect(limitData).toBe(limit);
    expect(data.length).toBe(10);
    expect(count).toBe(10);
    expect(pageData).toBe(page);
    expect(totalData).toBe(total / 2);
    expect(data).toBeInstanceOf(Array);
  });

  it('Should be able to filer by name', async () => {
    await Promise.all([
      factory.create('Developer', { name: 'teste' }),
      factory.createMany('Developer', 20),
    ]);
    const {
      status,
      body: { data },
    } = await request(app)
      .get('/developers')
      .query({
        name: 't',
      })
      .send();

    expect(status).toBe(200);

    data.map(developer =>
      expect(String(developer.name).includes('t')).toBe(true)
    );
  });
});
