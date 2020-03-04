import CreateDeveloper from '../services/CreateDeveloperService';

export default {
  async store({ body }, res) {
    const developer = await CreateDeveloper.run(body);

    return res.json(developer);
  },
};
