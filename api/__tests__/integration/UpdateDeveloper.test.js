import request from 'supertest';
import app from '../../src/start/app';
import { factory, truncate } from '../utils';

describe('Developers Update', () => {
  afterEach(async () => {
    await truncate();
  });

  it('Should can be able to update Developers attributes.', async () => {
    const [developer, newAttrs] = await Promise.all([
      factory.create('Developer'),
      factory.attrs('Developer'),
    ]);

    delete newAttrs.name;
    delete newAttrs.skills.nodejs;

    // eslint-disable-next-line no-underscore-dangle
    const developerId = String(developer._id);

    const { status, body } = await request(app)
      .put(`/developers/${developerId}`)
      .send(newAttrs);

    expect(status).toBe(200);
    // eslint-disable-next-line no-underscore-dangle
    expect(body._id).toBe(developerId);
    expect(body).toHaveProperty('name', developer.name);
    expect(body).toHaveProperty('email', newAttrs.email);
    expect(body).toHaveProperty('phone', newAttrs.phone);
    expect(body).toHaveProperty('linkedin', newAttrs.linkedin);
    expect(body).toHaveProperty('city', newAttrs.city);
    expect(body).toHaveProperty('state', newAttrs.state);
    expect(body).toHaveProperty('shift', newAttrs.shift);
    const { skills } = body;
    expect(skills).toHaveProperty('html', newAttrs.skills.html);
    expect(skills).toHaveProperty('css', newAttrs.skills.css);
    expect(skills).toHaveProperty('angular', newAttrs.skills.angular);
    expect(skills).toHaveProperty('nodejs', developer.skills.nodejs);
    expect(skills).toHaveProperty('database', newAttrs.skills.database);
  });

  it('Should can be able to update Developers skills only.', async () => {
    const [developer, newAttrs] = await Promise.all([
      factory.create('Developer'),
      factory.attrs('Developer'),
    ]);

    delete newAttrs.skills;
    // eslint-disable-next-line no-underscore-dangle
    const developerId = String(developer._id);

    const { status, body } = await request(app)
      .put(`/developers/${developerId}`)
      .send(newAttrs);

    expect(status).toBe(200);
    // eslint-disable-next-line no-underscore-dangle
    expect(body._id).toBe(developerId);
    expect(body).toHaveProperty('name', newAttrs.name);
    expect(body).toHaveProperty('email', newAttrs.email);
    expect(body).toHaveProperty('phone', newAttrs.phone);
    expect(body).toHaveProperty('linkedin', newAttrs.linkedin);
    expect(body).toHaveProperty('city', newAttrs.city);
    expect(body).toHaveProperty('state', newAttrs.state);
    expect(body).toHaveProperty('shift', newAttrs.shift);
    const { skills } = body;
    expect(skills).toHaveProperty('html', developer.skills.html);
    expect(skills).toHaveProperty('css', developer.skills.css);
    expect(skills).toHaveProperty('angular', developer.skills.angular);
    expect(skills).toHaveProperty('nodejs', developer.skills.nodejs);
    expect(skills).toHaveProperty('database', developer.skills.database);
  });
});
