export class Router {
  constructor (){
    this._index = 0
    this._routes = new Map()
  }

  _validate (route) {
    if (!route || typeof route !== 'object') return false
    if (typeof route.method !== 'string') return false
    if (typeof route.path !== 'string') return false
    if (typeof route.callback !== 'function') return false
    return true
  }

  register (route, id = this._index++) {
    if (!this._validate(route)) return
    this._routes.set(id, route)
    return id
  }

  unregister (id) {
    this._routes.delete(id)
  }

  route ({ method, path }) {
    for (const route of this._routes.values()) {
      if (route.method === method && route.path === path) return route
    }
  }
}