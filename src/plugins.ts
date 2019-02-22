export interface Plugin {
  create (id: string): unknown
  destroy (id: string): unknown
}

export class Getter {
  private initialized: Plugin[] = []

  constructor (
    private plugins: Map<string, Plugin>,
    private id: string,
    destroy: Function
  ) {
    destroy(() => this.initialized.map((plugin) => plugin.destroy(id)))
  }

  get (name: string) {
    const plugin = this.plugins.get(name)
    this.initialized.push(plugin)
    return plugin.create(this.id)
  }
}

export class Setter {
  constructor (private plugins: Map<string, Plugin>) {}
  set (name: string, plugin: Plugin) {
    this.plugins.set(name, plugin)
  }
}

export class Plugins extends Map<string, Plugin> {}
export const plugins = new Plugins()
