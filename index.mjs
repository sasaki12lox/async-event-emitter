//@ts-check

export class EventEmitter {
    /**
     * @type {{[x: string]: Function[]}}
     */
    #events = {};

    /**
     * 
     * @param {String} event Event name
     * @param {(...data: any[]) => void} callback Callback function
     * @returns {Function} Remove listener
     */
    on(event, callback) {
        if (!(event && callback)) return () => {};
        if (this.#events[event]) this.#events[event].push(callback);
        else this.#events[event] = [callback];
        return () => {
            const index = this.#events[event].findIndex(e => e == callback);
            if (index != -1) this.#events[event].splice(index, 1);
        };
    }

    /**
     * 
     * @param {String} event Event name
     */
    removeAllListeners(event) {
        if (this.#events[event]) this.#events[event].length = 0;
    }

    /**
     * 
     * @param {String} event Event name
     * @param {any} evenData
     */
    emit(event, evenData) {
        if (this.#events[event]) this.#events[event].forEach(e => e(evenData));
    }
}

export class AsyncEventEmitter extends EventEmitter {
    constructor () {
        super();
    }

    /**
     * 
     * @param {String} event Event name
     * @returns {Promise<any>} Remove listener
     */
    awaitEvent(event) {
        return new Promise((ok) => {
            let remove = this.on(event, (data) => {
                ok(data);
                remove();
            });
        });
    }
}