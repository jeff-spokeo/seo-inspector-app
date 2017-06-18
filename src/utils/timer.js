'use strict'

class Timer {

    constructor(description) {
        this.description = description
        this.id = Date.now()
    }

    static startNew(description) {
        let timer = new Timer(description)
        timer.start()
        return timer
    }

    start() {
        this.startTime = Date.now()
        console.log(`[${this.id}] >> START: ${this.description}`)
    }

    end() {
        console.log(`[${this.id}] >> DONE! (${Date.now() - this.startTime} ms)`)
    }

    execute(description, syncFn) {
        let start = Date.now()
        let result = syncFn()
        this.logExecutionStep(description, start)
        return result
    }

    async executeAsync(description, asyncFn) {
        let start = Date.now()
        let result = await asyncFn()
        this.logExecutionStep(description, start)
        return result
    }

    async executePromiseAsync(description, promise) {
        let start = Date.now()
        let result = await promise
        this.logExecutionStep(description, start)
        return result
    }

    async executeAsPromiseAsync(description, promiseCb) {
        return await this.executePromiseAsync(description, new Promise(promiseCb))
    }

    logExecutionStep(description, start) {
        console.log(`[${this.id || ''}] >> ${description}... done (${Date.now() - start} ms)`)
    }

}

module.exports = exports = Timer

