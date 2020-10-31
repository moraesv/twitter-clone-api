import { inject, injectable } from 'inversify'
import TYPES from '../../config/types'
import FileController from './FileController'
import { IRoute } from '../../routes'

import upload from '../../config/upload'
import { auth } from '../../middlewares/auth'

@injectable()
export default class FileRoutes {
  public routes: IRoute[] = []

  constructor(@inject(TYPES.FileController) private fileController: FileController) {
    this.init()
  }

  private init() {
    this.routes = [
      {
        method: 'get',
        path: '/files/:id/:filename',
        action: this.fileController.show.bind(this.fileController),
        middlewares: [],
      },
      {
        method: 'post',
        path: '/files',
        action: this.fileController.store.bind(this.fileController),
        middlewares: [auth, upload.single('file')],
      },
      {
        method: 'delete',
        path: '/files/:id',
        action: this.fileController.delete.bind(this.fileController),
        middlewares: [],
      },
    ]
  }
}
