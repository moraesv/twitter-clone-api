import UserModel from './UserModel'

const userView = {
  render(user: UserModel) {
    return {
      id: user.id,
      name: user.username,
      username: user.username,
      email: user.email,
      birthDate: user.birthDate,
      bio: user.bio,
      location: user.location,
      website: user.website,
      profileImgUrl: user.profileImg ? user.profileImg.url : null,
      profileBackgroundUrl: user.profileBackground ? user.profileBackground.url : null,
    }
  },
}

export default userView
