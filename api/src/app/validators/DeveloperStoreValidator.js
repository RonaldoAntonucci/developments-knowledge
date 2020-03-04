import * as Yup from 'yup';
import { skillsNames } from '../schemas/types/Skills';
import { skillValues } from '../schemas/types/Skill';

export default async (req, res, next) => {
  const skills = {};
  skillsNames.forEach(skill => {
    skills[skill] = Yup.number()
      .integer()
      .min(skillValues[0])
      .max(skillValues[skillValues.length - 1]);
  });

  try {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(3),
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.string().required(),
      linkedin: Yup.string()
        .url()
        .required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      shift: Yup.string().matches(/(morning|afternoon|night)/, {
        excludeEmptyString: true,
      }),
      skills: Yup.object()
        .shape(skills)
        .required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
