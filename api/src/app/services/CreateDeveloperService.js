import Developer from '../schemas/Developer';
import { skillsNames } from '../schemas/types/Skills';
import Exception from '../exceptions/ServiceException';

export default {
  getValidSkills(skills) {
    const getValidSkills = {};
    skillsNames.forEach(skill => {
      getValidSkills[skill] = skills[skill];
    });
    return getValidSkills;
  },

  async run({ name, email, phone, linkedin, city, state, shift, skills }) {
    const developerExists = await Developer.findOne({ email });
    if (developerExists) {
      throw new Exception('Email already exists.');
    }

    const validSkills = this.getValidSkills(skills);

    const developer = await Developer.create({
      name,
      email,
      phone,
      linkedin,
      city,
      state,
      shift,
      skills: validSkills,
    });

    return developer;
  },
};
