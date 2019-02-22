import { Script } from 'vm'
import { promises as fs } from 'fs'

export const execute = async (filepath, context) => {
  const code = await fs.readFile(filepath, { encoding: 'utf8' })
  new Script(code, filepath).runInNewContext(context)
}
