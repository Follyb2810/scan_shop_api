type EventHandler<T = unknown> = (payload: T) => void | Promise<void>;

/**
 * In-process domain event bus (Step 2 foundation).
 * Async side-effects should fan out to BullMQ from handlers when Redis is available.
 */
class EventBus {
  private handlers = new Map<string, Set<EventHandler>>();

  on<T = unknown>(event: string, handler: EventHandler<T>): () => void {
    const set = this.handlers.get(event) ?? new Set();
    set.add(handler as EventHandler);
    this.handlers.set(event, set);

    return () => {
      set.delete(handler as EventHandler);
    };
  }

  async emit<T = unknown>(event: string, payload: T): Promise<void> {
    const set = this.handlers.get(event);
    if (!set || set.size === 0) return;

    for (const handler of set) {
      await handler(payload);
    }
  }

  clear(): void {
    this.handlers.clear();
  }
}

export const eventBus = new EventBus();
