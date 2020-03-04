import request from 'supertest';
import app from '../../src/start/app';
import { factory, truncate } from '../utils';

describe('Create Developers', () => {
  afterEach(async () => {
    await truncate();
  });

  it('Should be able to create Developer', async done => {
    const developerAttrs = await factory.attrs('Developer');
    const { status, body } = await request(app)
      .post('/developers')
      .send(developerAttrs);

    expect(status).toBe(200);
    expect(body).toHaveProperty('name', developerAttrs.name);
    expect(body).toHaveProperty('email', developerAttrs.email);
    expect(body).toHaveProperty('phone', developerAttrs.phone);
    expect(body).toHaveProperty('linkedin', developerAttrs.linkedin);
    expect(body).toHaveProperty('city', developerAttrs.city);
    expect(body).toHaveProperty('state', developerAttrs.state);
    done();
  });

  // it('Should be return error if hav');
});
