const appConfig = {
  environment: process.env.ENVIRONMENT,
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
  fullUrl: `${process.env.APP_URL}:${process.env.APP_PORT}`,
}

export default appConfig
