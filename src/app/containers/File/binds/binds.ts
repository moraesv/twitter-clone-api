import { interfaces } from 'inversify'

import FileController from '../FileController'

import fileTypes from './types'
import FileRoutes from '../FileRoutes'
import FileService from '../FileService'
import FileRepository from '../FileRepository'

const fileBinds = (bind: interfaces.Bind) => {
  bind<FileController>(fileTypes.FileController).to(FileController)
  bind<FileRoutes>(fileTypes.FileRoutes).to(FileRoutes)
  bind<FileService>(fileTypes.FileService).to(FileService)
  bind(fileTypes.FileRepository).toDynamicValue(() => {
    return new FileRepository()
  })
}

export default fileBinds
