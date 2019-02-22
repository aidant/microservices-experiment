class Options {
  buffer = { Buffer }
  console = { console }
  process = { process }
  require = { require }
  timers = { clearImmediate, clearInterval, clearTimeout, setImmediate, setInterval, setTimeout }
  url = { URL, URLSearchParams }
}

const options = new Options()

export const createContext = (...contexts: (keyof Options)[]): any =>
  contexts.reduce((context, option) => Object.assign(context, options[option]), {})
