import bcrypt from 'bcryptjs'
import { inject, injectable } from 'inversify'

import TYPES from '../../config/types'
import validateSchema from '../../utils/validateSchema'
import FileRepository from '../File/FileRepository'

import UserModel from './UserModel'
import UserRepository from './UserRepository'

import userView from './userView'
import userStoreSchema from './validation/store'
import userUpdateSchema from './validation/update'

@injectable()
export default class UserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.FileRepository) private fileRepository: FileRepository,
  ) {}

  public async findAll() {
    const users = await this.userRepository.find({ relations: ['profileImg'] })

    return users.map((user) => userView.render(user))
  }

  public async findById(id: number) {
    const user = await this.userRepository.findOne(id, { relations: ['profileImg'] })

    return userView.render(user)
  }

  public async storeValidate(body: UserModel) {
    const { ready, errors } = await validateSchema<typeof userStoreSchema, UserModel>(userStoreSchema, body)

    const userEmailExists = await this.userRepository.findOne({ where: { email: ready.email } })
    if (userEmailExists) {
      errors.emailExists = 'E-mail já cadastrado'
    }

    const userUsernameExists = await this.userRepository.findOne({ where: { username: ready.username } })
    if (userUsernameExists) {
      errors.usernameExists = 'Nome de usuário já cadastrado'
    }

    return { ready, errors, hasErrors: Object.keys(errors).length }
  }

  public async store(user: UserModel) {
    const passwordHash = await bcrypt.hash(user.password, bcrypt.genSaltSync())

    const createdUser = await this.userRepository.save({ ...user, passwordHash })

    return userView.render(createdUser)
  }

  public async updateValidate(body: UserModel, id: number, loggedUser: UserModel) {
    const { ready, errors } = await validateSchema<typeof userUpdateSchema, UserModel>(userUpdateSchema, body)

    if (id !== loggedUser.id) {
      errors.notYou = 'Você só pode atualizar seu próprio usuário'
    }

    return { ready, errors, hasErrors: Object.keys(errors).length }
  }

  public async update(id: number, user: UserModel) {
    const { profileImgId, profileBackgroundId, ...data } = user

    const profileImg = await this.fileRepository.findOne(profileImgId)
    const profileBackground = await this.fileRepository.findOne(profileBackgroundId)

    await this.userRepository.update(id, { ...data, profileImg, profileBackground })

    const updatedUser = await this.userRepository.findOne(id, { relations: ['profileImg', 'profileBackground'] })

    return userView.render(updatedUser)
  }

  public async delete(id: number) {
    await this.userRepository.softDelete(id)
  }
}
