import Developer from '../schemas/Developer';

export default {
  async store({ body }, res) {
    const { name, email, phone, linkedin, city, state } = body;
    const developer = await Developer.create({
      name,
      email,
      phone,
      linkedin,
      city,
      state,
    });

    return res.json(developer);
  },
};
