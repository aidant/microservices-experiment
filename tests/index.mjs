import vm from 'vm'
import fs from 'fs'
import path from 'path'

const run = async (filepath, object) => {
  const code = await fs.promises.readFile(filepath, { encoding: 'utf8' })
  const context = vm.createContext(object)
  const module = new vm.SourceTextModule(code, { context })
  await module.link((url, parent) => run(path.resolve(filepath, '..', url), parent.context))
  return module
}

run(path.resolve('tests/index.es'), { console })
  .then(async (module) => {
    module.instantiate()
    await module.evaluate()
    return module 
  })
  .then(console.log)
  .catch(console.error)