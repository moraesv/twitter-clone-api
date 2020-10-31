import * as Yup from 'yup'

const tweetStoreSchema = {
  text: Yup.string()
    .required('Você deve inserir um texto para seu tweet')
    .max(280, 'Máximo de 280 caracteres')
    .min(1, 'Minimo de 1 caracter'),
}

export default tweetStoreSchema
