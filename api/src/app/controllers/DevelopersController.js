import CreateDeveloper from '../services/CreateDeveloperService';

import Developer from '../schemas/Developer';

export default {
  async index({ query }, res) {
    let { page = 1, limit = 20 } = query;
    page = page < 1 ? 1 : page;
    limit = limit > 100 || limit < 1 ? 100 : limit;

    const [developers, total] = await Promise.all([
      await Developer.find()
        .skip((page - 1) * limit)
        .limit(Number(limit)),
      Developer.countDocuments(),
    ]);

    return res.json({
      limit,
      total,
      page,
      count: developers.length,
      data: developers,
    });
  },

  async store({ body }, res) {
    const developer = await CreateDeveloper.run(body);

    return res.json(developer);
  },
};
