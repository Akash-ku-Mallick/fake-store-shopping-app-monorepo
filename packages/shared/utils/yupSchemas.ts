import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const productSchema = yup.object({
  title: yup.string().required(),
  price: yup.number().positive().required(),
  description: yup.string().required(),
  category: yup.string().required(),
});
