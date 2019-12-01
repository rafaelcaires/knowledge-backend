import * as yup from 'yup'
import label from 'validations/setLocale'

export const validateUser = data =>
  yup
    .object()
    .shape({
      name: yup
        .string()
        .label(label.name)
        .required(),
      email: yup
        .string()
        .strict()
        .email()
        .lowercase()
        .label(label.email)
        .required(),
      password: yup
        .string()
        .min(5)
        .max(10)
        .label(label.password)
        .required(),
      registration: yup
        .string()
        .min(7)
        .max(7)
        .label(label.registration)
        .required(),
      image: yup
        .string()
        .label(label.image)
        .notRequired(),
      paper: yup.object().shape({
        connect: yup.object().shape({
          id: yup
            .string()
            .required()
            .label(label.paperId)
        })
      })
    })
    .validate(data, { abortEarly: false })
    .catch(({ inner }) => inner.map(({ path, message }) => ({ path, message })))
