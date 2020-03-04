import Developer from '../schemas/Developer';

import Exception from '../exceptions/ServiceException';

export default {
  async isAvailableEmail(email) {
    if (email && (await Developer.find({ email }))) {
      return false;
    }
    return true;
  },
  async run(id, { name, email, phone, linkedin, city, state, shift, skills }) {
    const developer = await Developer.findById(id);
    if (!developer) {
      throw new Exception('Invalid Developer id.');
    }

    if (!this.isAvailableEmail(email)) {
      throw new Exception('Email already in use.');
    }

    return developer.update({
      name,
      email,
      phone,
      linkedin,
      city,
      state,
      shift,
      skills,
    });
  },
};
