const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  #state = PENDING
  #result = void 0
  #handlers = []

  constructor(executor) {
    const resolve = (result) => {
      this.#changeState(FULFILLED, result)
    }
    const reject = (reason) => {
      this.#changeState(REJECTED, reason)
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  #changeState(state, result) {
    if (this.#state !== PENDING) return
    this.#state = state
    this.#result = result
    this.#run()
  }

  #isPromiseLike(value) {
    if (
      value !== null &&
      (typeof value === 'object' || typeof value === 'function')
    ) {
      return typeof value.then === 'function'
    }
    return false
  }

  #runMicroTask(func) {
    if (typeof queueMicrotask === 'function') {
      queueMicrotask(func)
    } else {
      setTimeout(func, 0)
    }
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback === 'function') {
        // 函数
        try {
          const result = callback(this.#result)
          if (this.#isPromiseLike(result)) {
            // promise
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (err) {
          reject(err)
        }
      } else {
        const settled = this.#state === FULFILLED ? resolve : reject
        settled(this.#result)
      }
    })
  }

  #run() {
    if (this.#state === PENDING) return
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handlers.shift()
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject)
      } else {
        this.#runOne(onRejected, resolve, reject)
      }
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({ onFulfilled, onRejected, resolve, reject })
      this.#run()
    })
  }
}

module.exports = {
  deferred() {
    const res = {}
    res.promise = new MyPromise((resolve, reject) => {
      res.resolve = resolve
      res.reject = reject
    })
    return res
  },
}
