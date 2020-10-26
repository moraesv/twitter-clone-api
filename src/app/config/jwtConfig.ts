const jwtConfig = {
  algorithm: process.env.JWT_ALGORITHM,
  secret: process.env.JWT_SECRET,
}

export default jwtConfig
