import { Schema } from 'mongoose';
import Skill from './Skill';

export const skillsNames = ['nodejs', 'angular', 'html', 'css', 'database'];

const skills = {};

skillsNames.forEach(skill => {
  skills[skill] = Skill;
});

export default new Schema(
  {
    ...skills,
  },
  { timestamps: true }
);
