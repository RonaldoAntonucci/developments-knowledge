export const shiftValues = ['morning', 'afternoon', 'night'];

export default {
  type: String,
  required: true,
  enum: shiftValues,
};
