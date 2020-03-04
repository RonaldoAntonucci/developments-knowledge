import CreateDeveloper from '../services/CreateDeveloperService';
import UpdateDeveloper from '../services/UpdateDeveloperService';

import Developer from '../schemas/Developer';
import Exception from '../exceptions/ServiceException';

import pagination from '../../util/pagination';

export default {
  async index({ query }, res) {
    const { page, limit } = pagination(query);
    const { shift, orderBy, desc, name } = query;

    const filter = {};
    const order = {};

    if (shift) filter.shift = shift;

    if (orderBy) order[orderBy] = desc ? -1 : 1;
    if (name) filter.name = new RegExp(name, 'i');

    const [developers, total] = await Promise.all([
      await Developer.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort(order),
      Developer.countDocuments(filter),
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

  async update({ body, params: { developerId } }, res) {
    const developer = await UpdateDeveloper.run(developerId, body);

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
