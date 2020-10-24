export default class Request {
  constructor(req) {
    this.init(req)
  }

  init(req) {
    function getBody() {
      return {
        ...req.body,
      }
    }

    function queryParams() {
      return {
        ...req.query,
      }
    }

    function routeParams() {
      return {
        ...req.params,
      }
    }

    function getUser() {
      return req.user
    }

    function setUser(user) {
      req.user = user
    }

    req.getBody = getBody
    req.queryParams = queryParams
    req.routeParams = routeParams
    req.getUser = getUser
    req.setUser = setUser
  }
}
