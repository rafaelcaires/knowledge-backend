import * as yup from 'yup'
import label from 'validations/setLocale'

export const validateFeedBack = data =>
  yup
    .object()
    .shape({
      isUseFul: yup
        .boolean()
        .label(label.isUseFul)
        .required(),
      comment: yup
        .string()
        .max(255)
        .label(label.comment)
        .required(),
      user: yup.object().shape({
        connect: yup.object().shape({
          id: yup
            .string()
            .required()
            .label(label.userId)
        })
      }),
      article: yup.object().shape({
        connect: yup.object().shape({
          id: yup
            .string()
            .required()
            .label(label.articleId)
        })
      })
    })
    .validate(data, { abortEarly: false })
    .catch(({ inner }) => inner.map(({ path, message }) => ({ path, message })))
