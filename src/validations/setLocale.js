/* eslint-disable no-template-curly-in-string */

import { setLocale } from 'yup'

setLocale({
  mixed: {
    required: 'O campo ${path} é requerido'
  },
  string: {
    email: 'Informe o campo ${path} corretamente',
    lowercase: 'Informe campo ${path} com letras minusculas',
    min: 'O campo ${path} deve ter mais que ${min} caracteres',
    max: 'O campo ${path} deve ter menos que ${max} caracteres'
  }
})

export default {
  name: 'nome',
  email: 'e-mail',
  password: 'senha',
  registration: 'matrícula',
  image: 'imagem',
  title: 'título',
  description: 'descrição',
  isUseFul: 'é útil',
  comment: 'comentário',
  content: 'conteúdo',
  articleId: 'ID do artigo',
  userId: 'ID do usuário',
  categoryId: 'ID da categoria',
  paperId: 'ID do papel'
}
