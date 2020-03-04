import { Schema, model } from 'mongoose';
import Skills from './types/Skills';
import Shift from './types/Shift';

const DevSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    phone: { type: String, required: true },
    linkedin: { type: String, required: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },

    shift: Shift,
    skills: { type: Skills, required: true },
  },
  { timestamps: true }
);

export default model('developer', DevSchema);
