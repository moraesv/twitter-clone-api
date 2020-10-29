import faker from 'faker/locale/pt_BR'

import UserModel from '../UserModel'
import UserRepository from '../UserRepository'
import UserService from '../UserService'

describe('UserService', () => {
  let user: unknown = null

  let differentUser: unknown = null

  let userRepository: unknown = null

  let userService: UserService = null

  beforeEach(() => {
    user = {
      id: 1,
      name: faker.name.findName(),
    }

    differentUser = {
      id: faker.random.number(),
      name: faker.name.findName(),
    }

    userRepository = {
      find: jest.fn().mockReturnValue([user]),
      findOne: jest.fn().mockReturnValue(user),
      save: jest.fn().mockReturnValue(user),
      update: jest.fn().mockReturnValue(differentUser),
      softDelete: jest.fn().mockReturnThis(),
    }

    userService = new UserService(userRepository as UserRepository)
  })

  describe('findAll', () => {
    it('find all users and return them', async () => {
      const foundUsers = await userService.findAll()

      expect(foundUsers).toStrictEqual([user])
    })
  })

  describe('findById', () => {
    it('find a user by id and return this', async () => {
      const foundUser = await userService.findById(1)

      expect(foundUser).toBe(user)
    })
  })

  describe('store', () => {
    it('create a user and return this', async () => {
      const createdUser = await userService.store(user as UserModel)

      expect(createdUser).toBe(user)
    })
  })

  describe('update', () => {
    it('update a existent user and return this', async () => {
      userRepository = {
        findOne: jest.fn().mockReturnValue(differentUser),
        update: jest.fn().mockReturnValue(differentUser),
      }

      userService = new UserService(userRepository as UserRepository)

      const updatedUser = await userService.update(1, differentUser as UserModel)

      expect(updatedUser).toBe(differentUser)
    })
  })

  describe('delete', () => {
    it('delete a existent user', async () => {
      await userService.delete(1)

      expect((userRepository as UserRepository).softDelete).toHaveBeenCalled()
    })
  })
})
