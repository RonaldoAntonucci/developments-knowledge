import Developer from '../schemas/Developer';

export default {
  async store({ body }, res) {
    const { name, email, phone, linkedin, city, state, shift, skills } = body;
    const developer = await Developer.create({
      name,
      email,
      phone,
      linkedin,
      city,
      state,
      shift,
      skills,
    });

    return res.json(developer);
  },
};
