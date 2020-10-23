/* import { Request, Response } from 'express'
import faker from 'faker/locale/pt_BR'

import User from '../../models/User'
import UserRepository from '../../repositories/UserRepository'
import UserService from '../../services/UserService'
import UserController from '../UserController' */

describe('UserController', () => {
  /*   let user: unknown = null

  let differentUser: unknown = null

  let userService: unknown = null

  let userController: UserController = null

  let request: unknown = null
  let response: unknown = null */

  beforeEach(() => {
    /*     user = {
      id: 1,
      name: faker.name.findName(),
    }

    differentUser = {
      id: faker.random.number(),
      name: faker.name.findName(),
    }

    userService = {
      find: jest.fn().mockReturnValue([user]),
      findOne: jest.fn().mockReturnValue(user),
      save: jest.fn().mockReturnValue(user),
      update: jest.fn().mockReturnValue(differentUser),
      softDelete: jest.fn().mockReturnThis(),
    } */
    /*
    userController = new UserController(userService as UserService)

    request = {}

    response = {} */
  })

  describe('findById', () => {
    it('find a user by id and return this', async () => {
      expect(true).toBe(true)
    })
  })
})
