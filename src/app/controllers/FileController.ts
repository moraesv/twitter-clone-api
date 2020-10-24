import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import httpStatus from 'http-status'

import TYPES from '../config/types'

import FileService from '../services/FileService'

@injectable()
export default class FileController {
  constructor(@inject(TYPES.FileService) private fileService: FileService) {}

  public async show(req: Request, res: Response) {
    try {
      const { id, filename } = req.params

      const file = await this.fileService.findByIdAndName(Number(id), filename)
      return res.status(httpStatus.OK).send(file)
    } catch (e) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }

  public async store(req: Request, res: Response) {
    try {
      const { file } = req

      const createdFile = await this.fileService.store(file)
      return res.status(httpStatus.OK).send(createdFile)
    } catch (e) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      await this.fileService.delete(Number(id))
      return res.status(httpStatus.NO_CONTENT).send()
    } catch (e) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }
}
