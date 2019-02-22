const logger = {
  log: (...args) => console.log('logger:', ...args),
  error: (...args) => console.error('logger:', ...args)
}

const create = (id) => {
  console.log('Script created!', id)
  return logger
}

const destroy = (id) => {
  console.log('Script destroyed!', id)
}

plugins.set('logger', { create, destroy })
