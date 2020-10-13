import 'reflect-metadata'

import app from './app'

const server = app.init()

server.listen(process.env.APP_PORT, async () => {
  console.log(`Server listening on port ${process.env.APP_PORT}`)
})
