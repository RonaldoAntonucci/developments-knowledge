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

  it('Should be return error if email exists', async () => {
    const exists = await factory.create('Developer');
    const developerAttrs = await factory.attrs('Developer', {
      email: exists.email,
    });

    const {
      status,
      body: { message },
    } = await request(app)
      .post('/developers')
      .send(developerAttrs);

    expect(status).toBe(400);
    expect(message).toBe('Email already exists.');
  });

  it('Should be return error if props is invalid', async () => {
    const developerAttrs = {};

    const {
      status,
      body: { error },
    } = await request(app)
      .post('/developers')
      .send(developerAttrs);

    expect(status).toBe(400);
    expect(error).toBe('Validation fails');
  });
});
