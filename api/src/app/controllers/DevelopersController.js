import CreateDeveloper from '../services/CreateDeveloperService';

import Developer from '../schemas/Developer';
import Exception from '../exceptions/ServiceException';

import pagination from '../../util/pagination';

export default {
  async index({ query }, res) {
    const { page, limit } = pagination(query);

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

  async delete({ params: { developerId } }, res) {
    const developer = await Developer.findOneAndDelete({ _id: developerId });
    if (!developer) {
      throw new Exception('Developer not exists.');
    }
    return res.send();
  },
};
