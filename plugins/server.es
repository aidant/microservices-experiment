const hapi = require('hapi')

const app = hapi.server({ port: 1337 })

class Server {
  constructor () {
    this.routes = new Set()
  }

  get (path, callback) { this.routes.add({ method: 'get', path, callback }) }
  head (path, callback) { this.routes.add({ method: 'head', path, callback }) }
  post (path, callback) { this.routes.add({ method: 'post', path, callback }) }
  put (path, callback) { this.routes.add({ method: 'put', path, callback }) }
  delete (path, callback) { this.routes.add({ method: 'delete', path, callback }) }
  connect (path, callback) { this.routes.add({ method: 'connect', path, callback }) }
  options (path, callback) { this.routes.add({ method: 'options', path, callback }) }
  trace (path, callback) { this.routes.add({ method: 'trace', path, callback }) }
  patch (path, callback) { this.routes.add({ method: 'patch', path, callback }) }

  route ({ method, path }) {
    for (const route of this._routes.values()) {
      if (route.method === method && route.path === path) return route
    }
  }
}

const server = new Server()

app.route({
  method: '*',
  path: '/{p*}',
  handler (request, h) {
    const route = server.route({ method: request.method, path: request.url.pathname })
    if (!route) return h.abandon
    return route.callback(request, h)
  }
})

app.start()
plugin.register({ name: 'server', version: '1.0.0' }, server)
