import { Queue } from "../queue"
describe("Queue", () => {
  it("correctly enqueues and dequeues values", () => {
    const q = new Queue(1)
    q.enqueue(2)
    q.enqueue(3)

    const firstVal = q.dequeue()
    const secVal = q.dequeue()
    const thirdVal = q.dequeue()

    expect(firstVal).toEqual(1)
    expect(secVal).toEqual(2)
    expect(thirdVal).toEqual(3)

    q.enqueue(4)

    expect(q.dequeue()).toEqual(4)
  })

  it("correctly returns if it is empty or not", () => {
    const q = new Queue()
    expect(q.isEmpty()).toBeTruthy()

    q.enqueue(1)
    expect(q.isEmpty()).toBeFalsy()

    q.enqueue(2)
    expect(q.isEmpty()).toBeFalsy()

    q.dequeue()
    q.dequeue()

    expect(q.isEmpty()).toBeTruthy()
  })

  it("throws an error when dequeuing on an empty queue", () => {
    const q = new Queue()
    q.enqueue(1)
    q.dequeue()

    expect(() => q.dequeue()).toThrow()
  })

  it("correctly enqueues multiple values", () => {
    const q = new Queue()
    q.enqueue(1, 2, 3)

    expect(q.dequeue()).toEqual(1)
    expect(q.dequeue()).toEqual(2)
    expect(q.dequeue()).toEqual(3)
  })

  it("correctly enqueues initial values", () => {
    let q = new Queue()
    expect(() => q.dequeue()).toThrow()

    q = new Queue(1)
    expect(q.dequeue()).toEqual(1)
    expect(q.isEmpty()).toBeTruthy()

    q = new Queue(1, 2, 3)
    expect(q.dequeue()).toEqual(1)
    expect(q.dequeue()).toEqual(2)
    expect(q.dequeue()).toEqual(3)
    expect(q.isEmpty()).toBeTruthy()
  })
})
