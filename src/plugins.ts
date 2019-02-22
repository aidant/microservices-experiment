class Getter {
  constructor (private plugins: Map) {}
  get (name: string, version?: string) {}
}

class Setter {
  constructor (private plugins: Map) {}
  set ({ name, version }: { [key: string]: string }) {}
}

class Plugins {
  private plugins = new Map()
  getter = new Getter(this.plugins)
  setter = new Setter(this.plugins)
}