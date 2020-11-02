import { inject, injectable } from 'inversify'

import TYPES from '../../config/types'

import UserModel from '../User/UserModel'
import UserRepository from '../User/UserRepository'

import userFollowerView from './userFollowerView'

@injectable()
export default class UserFollowerService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  public async following(userId: number) {
    const userFollowers = await this.userRepository.findOne(userId, { relations: ['following'] })

    return userFollowers.following.map((userFollower) => userFollowerView.render(userFollower))
  }

  public async followers(userId: number) {
    const userFollowers = await this.userRepository.findOne(userId, { relations: ['followers'] })

    return userFollowers.followers.map((userFollower) => userFollowerView.render(userFollower))
  }

  public async store(userId: number, followerUser: UserModel) {
    const user = await this.userRepository.findOne(userId, { relations: ['followers'] })

    if (!user.followers.some((follower) => follower.id === followerUser.id)) {
      user.followers.push(followerUser)

      await this.userRepository.save(user)
    }

    const returnUser = await this.userRepository.findOne(followerUser.id, { relations: ['following'] })

    return returnUser.following.map((following) => userFollowerView.render(following))
  }

  public async delete(userId: number, followerUser: UserModel) {
    const user = await this.userRepository.findOne(userId, { relations: ['followers'] })

    user.followers = user.followers.filter((follower) => follower.id !== followerUser.id)

    await this.userRepository.save(user)

    const returnUser = await this.userRepository.findOne(followerUser.id, { relations: ['following'] })

    return returnUser.following.map((following) => userFollowerView.render(following))
  }
}
