import vm from 'vm'
import fs from 'fs'
import path from 'path'

const open = (filepath) => fs.promises.readFile(filepath, { encoding: 'utf8' })
const run = (code, context, filepath) =>
  vm.runInNewContext(code, context, { filename: path.parse(filepath).base })

export const execute = async (filepath, context) => {
  const code = await open(filepath)
  return run(code, context, filepath)
}

// export const wrap = async (filepath, context) => {
//   const module = { exports: {} }
//   const code = await open(filepath).then(Module.wrap)
//   const { base: filename, dir: dirname } = path.parse(filepath)
//   return run(code, context, filename)(module.exports, require, module, filename, dirname)
// }