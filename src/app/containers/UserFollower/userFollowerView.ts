import UserModel from '../User/UserModel'

const userFollowerView = {
  render(user: UserModel) {
    return {
      id: user.id,
      name: user.username,
      username: user.username,
    }
  },
}

export default userFollowerView
