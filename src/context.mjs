import { METHODS } from './constants'
import common from './common'
import semver from 'semver'

const { require } = common

const handler = (method) => (path, callback) => ({ method, path, callback })
const app = {}
for (const method of METHODS) app[method] = handler(method)

const register = ({ name, version }, plugin) => ({ name, version, plugin })

const plugin = (plugins) => (id) => {
  const [name, v] = id.split('@')
  for (const [version, plugin] of plugins.get(name)) {
    if (semver.satisfies(version, v)) return plugin
  }
}

export {
  app,
  require,
  register,
  plugin
}