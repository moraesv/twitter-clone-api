import * as Yup from 'yup'

const userUpdateSchema = {
  profileImgId: Yup.number(),
  profileBackgroundId: Yup.number(),
  name: Yup.string().required('Você deve inserir um nome'),
  birthDate: Yup.date()
    .typeError('Sua data de nascimento deve ser uma data válida')
    .required('Você deve inserir sua data de nascimento'),
  bio: Yup.string(),
  location: Yup.string(),
  website: Yup.string(),
}

export default userUpdateSchema
