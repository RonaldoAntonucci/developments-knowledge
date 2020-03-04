import { Types } from 'mongoose';

import Exception from '../app/exceptions/ServiceException';

const { ObjectId } = Types;

export default ({ params }, res, next) => {
  const keys = Object.keys(params);

  keys.forEach(key => {
    if (key.includes('Id') && !ObjectId.isValid(params[key])) {
      throw new Exception(`${key} is invalid Object Id.`);
    }
  });

  return next();
};
