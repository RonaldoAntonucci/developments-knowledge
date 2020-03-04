import { factory, MongooseAdapter } from 'factory-girl';
import faker from './faker';

import Developer from '../../src/schemas/Developer';

const adapter = new MongooseAdapter();

// use the mongoose adapter as the default adapter
factory.setAdapter(adapter);

factory.define('Developer', Developer, () => ({
  name: faker.name(),
  email: faker.email(),
  phone: faker.phone(),
  linkedin: faker.url(),
  city: faker.city(),
  state: faker.state(),
}));

export default factory;
