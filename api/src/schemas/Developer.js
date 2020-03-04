import { Schema, model } from 'mongoose';

const DevSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  linkedin: String,
  city: String,
  state: String,
});

export default model('developer', DevSchema);
