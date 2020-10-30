import bcrypt from 'bcryptjs'
import { inject, injectable } from 'inversify'
import { ValidationError } from 'yup'

import TYPES from '../../config/types'
import ValidationErrors from '../../types/ValidationErrors'

import UserModel from './UserModel'

import UserRepository from './UserRepository'
import userView from './userView'
import userStoreSchema from './validation/store'
import userUpdateSchema from './validation/update'

@injectable()
export default class UserService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  public async findAll() {
    const users = await this.userRepository.find()

    return users.map((user) => userView.render(user))
  }

  public async findById(id: number) {
    const user = await this.userRepository.findOne(id)

    return userView.render(user)
  }

  public async storeValidate(user: UserModel): Promise<ValidationErrors> {
    await userStoreSchema.validate(user, { abortEarly: false })

    const errors: ValidationErrors = {}

    const userEmailExists = await this.userRepository.findOne({ where: { email: user.email } })
    if (userEmailExists) {
      errors.emailExists = 'E-mail já cadastrado'
    }

    const userUsernameExists = await this.userRepository.findOne({ where: { username: user.username } })
    if (userUsernameExists) {
      errors.usernameExists = 'Nome de usuário já cadastrado'
    }

    if (Object.keys(errors).length !== 0) {
      return errors
    }

    return null
  }

  public async store(user: UserModel) {
    const passwordHash = await bcrypt.hash(user.password, bcrypt.genSaltSync())

    const createdUser = await this.userRepository.save({ ...user, passwordHash })

    return userView.render(createdUser)
  }

  public async updateValidate(body: UserModel): Promise<{ userBody?: UserModel; errors?: ValidationErrors }> {
    return userUpdateSchema
      .validate(body, { abortEarly: false })
      .then((userBody: UserModel) => ({
        userBody,
      }))
      .catch((e: ValidationError) => {
        const errors: ValidationErrors = {}
        e.inner.forEach((err) => {
          errors[err.path || 'unknown'] = err.message
        })

        return { errors }
      })
  }

  public async update(id: number, user: UserModel) {
    await this.userRepository.update(id, user)

    const updatedUser = await this.userRepository.findOne(id)

    return userView.render(updatedUser)
  }

  public async delete(id: number) {
    await this.userRepository.softDelete(id)
  }
}
