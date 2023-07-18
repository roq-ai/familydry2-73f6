import * as yup from 'yup';

export const memoryValidationSchema = yup.object().shape({
  description: yup.string().required(),
  date: yup.date().required(),
  keywords: yup.string().required(),
  family_id: yup.string().nullable().required(),
});
