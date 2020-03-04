import { factory, MongooseAdapter } from 'factory-girl';
import faker from './faker';

import Developer from '../../src/schemas/Developer';

import { shiftValues } from '../../src/schemas/types/Shift';
import { skillValues } from '../../src/schemas/types/Skill';
import { skillsNames } from '../../src/schemas/types/Skills';

const adapter = new MongooseAdapter();

// use the mongoose adapter as the default adapter
factory.setAdapter(adapter);

factory.define('Developer', Developer, () => {
  const shiftValue = () =>
    shiftValues[faker.integer({ min: 0, max: shiftValues.length - 1 })];

  const skillsValues = () =>
    faker.integer({ min: 0, max: skillValues.length - 1 });

  const getSkills = () => {
    const skills = {};
    skillsNames.forEach(skill => {
      skills[skill] = skillsValues();
    });
    return skills;
  };

  return {
    name: faker.name(),
    email: faker.email(),
    phone: faker.phone(),
    linkedin: faker.url(),
    city: faker.city(),
    state: faker.state(),
    shift: shiftValue(),
    skills: getSkills(),
  };
});

export default factory;
