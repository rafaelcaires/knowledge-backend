import * as yup from 'yup'
import label from 'validations/setLocale'

export const validateCategory = data =>
  yup
    .object()
    .shape({
      title: yup
        .string()
        .label(label.title)
        .max(100)
        .required(),
      description: yup
        .string()
        .max(255)
        .label(label.description)
        .required()
    })
    .validate(data, { abortEarly: false })
    .catch(({ inner }) => inner.map(({ path, message }) => ({ path, message })))
