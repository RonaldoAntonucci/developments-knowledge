import request from 'supertest';
import app from '../../src/start/app';
import { factory, truncate } from '../utils';

describe('Delete Developers', () => {
  afterEach(async () => {
    await truncate();
  });

  it('Should be able to delete Developers', async () => {
    const developer = await factory.create('Developer');

    const { status } = await request(app)
      // eslint-disable-next-line no-underscore-dangle
      .delete(`/developers/${developer._id}`)
      .send();

    expect(status).toBe(200);
  });

  it('Should be return error if Developer not exists', async () => {
    const developer = await factory.create('Developer');
    await developer.delete();

    const {
      status,
      body: { message },
    } = await request(app)
      // eslint-disable-next-line no-underscore-dangle
      .delete(`/developers/${developer._id}`)
      .send();

    expect(status).toBe(400);
    expect(message).toBe('Developer not exists.');
  });

  it('Should be return error if Developer id is invalid.', async () => {
    const developer = { _id: 'invalid' };

    const {
      status,
      body: { message },
    } = await request(app)
      // eslint-disable-next-line no-underscore-dangle
      .delete(`/developers/${developer._id}`)
      .send();

    expect(status).toBe(400);
    expect(message).toBe('developerId is invalid Object Id.');
  });
});
