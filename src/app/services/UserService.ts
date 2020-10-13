import { injectable } from 'inversify'

@injectable()
export default class UserService {
  public findAll() {
    return [{ id: 1 }]
  }
}
