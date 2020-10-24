import { inject, injectable } from 'inversify'

import TYPES from '../config/types'

import CustomResponse from '../base/CustomResponse'
import FileService from '../services/FileService'
import CustomRequest from '../base/CustomRequest'

@injectable()
export default class FileController {
  constructor(@inject(TYPES.FileService) private fileService: FileService) {}

  public async show(req: CustomRequest, res: CustomResponse) {
    try {
      const { id, filename } = req.routeParams()

      const file = await this.fileService.findByIdAndName(Number(id), filename)
      return res.okResponse(file)
    } catch (e) {
      return res.internalErrorResponse()
    }
  }

  public async store(req: CustomRequest, res: CustomResponse) {
    try {
      const file = req.file()

      const createdFile = await this.fileService.store(file)
      return res.okResponse(createdFile)
    } catch (e) {
      return res.internalErrorResponse()
    }
  }

  public async delete(req: CustomRequest, res: CustomResponse) {
    try {
      const { id } = req.routeParams()
      await this.fileService.delete(Number(id))
      return res.noContentResponse()
    } catch (e) {
      return res.internalErrorResponse()
    }
  }
}
