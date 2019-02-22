import { watch } from 'chokidar'
import { execute } from './execute'
import { createContext } from './context'
import { plugins as plugs, Getter, Setter } from './plugins'

const destroyers: { [key: string]: Function } = {}

const destroy = (filepath: string) => (destroyer: Function) => destroyers[filepath] = destroyer

const microservices = {
  async create (filepath: string) {
    const context = createContext('buffer', 'console', 'timers', 'url')
    context.plugins = new Getter(plugs, filepath, destroy(filepath))
    await execute(filepath, context)
  },

  remove: (filepath: string) => destroyers[filepath](),

  async update (filepath: string) {
    microservices.remove(filepath)
    await microservices.create(filepath)
  }
}

const plugins = {
  async create (filepath: string) {
    const context = createContext('buffer', 'console', 'process', 'require', 'timers', 'url')
    context.plugins = new Setter(plugs)
    await execute(filepath, context)
  }
}

export const start = () => {
  watch('plugins')
    .on('add', plugins.create)
    // .on('unlink', plugins.remove)
    // .on('change', plugins.update)


  watch('microservices')
    .on('add', microservices.create)
    .on('unlink', microservices.remove)
    .on('change', microservices.update)
}


start()
