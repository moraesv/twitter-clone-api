import { injectable } from 'inversify'

import CustomResponse from '../../base/CustomResponse'
import CustomRequest from '../../base/CustomRequest'

@injectable()
export default class LogoutController {
  public async store(req: CustomRequest, res: CustomResponse) {
    try {
      return res.noContentResponse()
    } catch (e) {
      return res.internalErrorResponse(e)
    }
  }
}
