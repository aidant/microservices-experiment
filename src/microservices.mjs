import chokidar from 'chokidar'
import express from 'express'
import { Router } from './router'
import { execute } from './vm'
import { app as fakeExpress } from './context'

const app = express()
const router = new Router()

const context = { app: fakeExpress }
const create = async (filepath) => {
  const route = await execute(filepath, context)
  router.register(route, filepath)
}

const remove = (filepath) => {
  router.unregister(filepath)
}

app.use((req, res, next) => {
  const route = router.route({ method: req.method.toLowerCase(), path: req.path })
  if (!route) return next()
  route.callback(req, res)
})

export const start = () => {
  chokidar.watch('microservices')
    .on('add', create)
    .on('change', create)
    .on('unlink', remove)

  app.listen(1337)
}