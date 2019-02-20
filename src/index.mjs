import hapi from 'hapi'
import vm from 'vm'
import chokidar from 'chokidar'
import fs from 'fs'
import path from 'path'

const scripts = Object.create(null)

function get ({ method, path }) {
  for (const property in scripts) {
    const route = scripts[property]
    console.log(arguments[0], route)
    if (route && route.path === path && route.method === method) return route
  }
}

async function create (filepath) {
  console.log('create', filepath)
  const content = await fs.promises.readFile(filepath, { encoding: 'utf8' })
  const { base: filename } = path.parse(filepath)
  const script = new vm.Script(content, filename)
  const route = script.runInThisContext()
  scripts[filepath] = route
}

async function remove (filepath) {
  console.log('remove', filepath)
  delete scripts[filepath]
}

chokidar.watch('microservices')
  .on('add', create)
  .on('change', create)
  .on('unlink', remove)

const server =  hapi.server({
  port: 1337
})

server.route({
  method: '*',
  path: '/{path*}',
  handler (request, h) {
    const route = get({ method: request.method, path: request.url.pathname })
    if (!route) return h.response(404)
    return route.handler(request, h)
  }
})

server.start()
