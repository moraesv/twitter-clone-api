import * as Yup from 'yup'

const userStoreSchema = {
  name: Yup.string().required('Você deve inserir um nome'),
  username: Yup.string().required('Você deve inserir um nome de usuário'),
  email: Yup.string().email('Você deve inserir um e-mail válido').required('Você deve inserir um e-mail'),
  password: Yup.string().required('Você deve inserir uma senha').min(8, 'A senha deve conter no mínimo 8 caracteres'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas de vem ser iguais')
    .required('Você deve confirmar sua senha'),
  birthDate: Yup.date().required('Data de nascimento deve ser inserida'),
}

export default userStoreSchema
