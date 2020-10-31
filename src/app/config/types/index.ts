import configTypes from '../binds/types'

import routesTypes from '../../routes/binds/types'
import userTypes from '../../containers/User/binds/types'
import fileTypes from '../../containers/File/binds/types'
import loginTypes from '../../containers/Login/binds/types'
import tweetTypes from '../../containers/Tweet/binds/types'
import logoutTypes from '../../containers/Logout/binds/types'

const TYPES = {
  ...configTypes,
  ...routesTypes,
  ...userTypes,
  ...fileTypes,
  ...loginTypes,
  ...logoutTypes,
  ...tweetTypes,
}

export default TYPES
