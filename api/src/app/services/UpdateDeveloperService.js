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

    if (name) developer.name = name;
    if (email) developer.email = email;
    if (phone) developer.phone = phone;
    if (linkedin) developer.linkedin = linkedin;
    if (city) developer.city = city;
    if (state) developer.state = state;
    if (shift) developer.shift = shift;
    if (skills) {
      if (skills.nodejs || skills.nodejs === 0) {
        developer.skills.nodejs = skills.nodejs;
      }

      if (skills.html || skills.html === 0) {
        developer.skills.html = skills.html;
      }
      if (skills.css || skills.css === 0) {
        developer.skills.css = skills.css;
      }
      if (skills.angular || skills.angular === 0) {
        developer.skills.angular = skills.angular;
      }

      if (skills.database || skills.database === 0) {
        developer.skills.database = skills.database;
      }
    }

    await developer.save();

    return developer;
  },
};
