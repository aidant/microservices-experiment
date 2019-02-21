import chokidar from 'chokidar'
import { execute } from './vm'
import { require, register, plugin } from './context'

const plugins = new Map()

const test = plugin(plugins)

const context = { require, register }
const create = async (filepath) => {
  const { name, version, plugin } = await execute(filepath, context)
  const versions = plugins.get(name) || new Map()
  versions.set(version, plugin)
  plugins.set(name, versions)
  console.log(test('axios@^1.0.0'))
}

const remove = (filepath) => {

}

export const start = () => {
  chokidar.watch('plugins')
    .on('add', create)
    .on('change', create)
    .on('unlink', remove)
}