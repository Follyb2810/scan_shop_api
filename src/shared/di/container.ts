type Factory<T> = () => T;

/**
 * Minimal DI registry for module wiring.
 * Prefer constructor injection of interfaces in application/domain layers.
 */
class Container {
  private readonly singletons = new Map<string | symbol, unknown>();
  private readonly factories = new Map<string | symbol, Factory<unknown>>();

  register<T>(token: string | symbol, factory: Factory<T>): void {
    this.factories.set(token, factory as Factory<unknown>);
  }

  registerValue<T>(token: string | symbol, value: T): void {
    this.singletons.set(token, value);
  }

  resolve<T>(token: string | symbol): T {
    if (this.singletons.has(token)) {
      return this.singletons.get(token) as T;
    }

    const factory = this.factories.get(token);
    if (!factory) {
      throw new Error(`DI: no registration for token ${String(token)}`);
    }

    const instance = factory() as T;
    this.singletons.set(token, instance);
    return instance;
  }

  has(token: string | symbol): boolean {
    return this.singletons.has(token) || this.factories.has(token);
  }

  clear(): void {
    this.singletons.clear();
    this.factories.clear();
  }
}

export const container = new Container();

export const tokens = {
  prisma: Symbol("prisma"),
  redis: Symbol("redis"),
  eventBus: Symbol("eventBus"),
  logger: Symbol("logger"),
} as const;
