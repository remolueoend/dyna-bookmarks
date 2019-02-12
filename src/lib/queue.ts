export interface QueueItem<T> {
  value: T
  next: QueueItem<T> | undefined
}

/**
 * Simple implementation of a Queue data structure using a single linked list,
 * but persisting the last item in the queue too, archiving O(1) for enqueuing and dequeuing.
 *
 * @export
 * @class Queue
 * @template T
 */
export class Queue<T> {
  /**
   * Contains pointers to the beginning and end of the internal linked list based data structure.
   * Storying both pointers in the same object makes it impossible to set one without the other.
   * There is no defined state of the linked list with only `head` or only `last` defined.
   *
   * @protected
   * @type {({
   *         head: QueueItem<T>
   *         last: QueueItem<T>
   *       }
   *     | undefined)}
   * @memberof Queue
   */
  protected items:
    | {
        head: QueueItem<T>
        last: QueueItem<T>
      }
    | undefined

  constructor()
  constructor(...initialValues: T[])
  constructor(...initialValues: T[]) {
    if (typeof initialValues !== "undefined") {
      this.enqueue(...initialValues)
    }
  }

  /**
   * Returns whether or not the queue is empty.
   *
   * @returns
   * @memberof Queue
   */
  public isEmpty() {
    return !this.items
  }

  /**
   * Appends the given value to the end of the  queue.
   *
   * @param {T} item The value to append
   * @memberof Queue
   */
  public enqueue(...values: T[]) {
    values.forEach(value => {
      const newItem: QueueItem<T> = { next: undefined, value }
      if (this.items) {
        this.items.last.next = newItem
        this.items = {
          head: this.items.head,
          last: newItem,
        }
      } else {
        this.items = {
          head: newItem,
          last: newItem,
        }
      }
    })
  }

  /**
   * Removes and returns the first item in the queue.
   *
   * @returns {T}
   * @memberof Queue
   */
  public dequeue(): T {
    if (!this.items) {
      throw new Error("lib/quere::dequeue: Queue is empty.")
    }
    const item = this.items.head
    this.items = !!item.next
      ? {
          head: item.next,
          last: this.items.last,
        }
      : undefined

    return item.value
  }
}
