import * as yup from 'yup'
import label from 'validations/setLocale'

export const validateArticle = data =>
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
        .required(),
      isPublished: yup
        .boolean()
        .label(label.isPublished)
        .required(),
      content: yup
        .string()
        .label(label.content)
        .required(),
      user: yup.object().shape({
        connect: yup.object().shape({
          id: yup
            .string()
            .required()
            .label(label.userId)
        })
      }),
      category: yup.object().shape({
        connect: yup.object().shape({
          id: yup
            .string()
            .required()
            .label(label.categoryId)
        })
      })
    })
    .validate(data, { abortEarly: false })
    .catch(({ inner }) => inner.map(({ path, message }) => ({ path, message })))
