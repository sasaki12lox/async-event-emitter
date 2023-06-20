import { AsyncEventEmitter } from "./index.mjs";

const emitter = new AsyncEventEmitter();

(async () => {
    setTimeout(() => {
        emitter.emit('test', 'working');
    }, 500);
    console.log(await emitter.awaitEvent('test'));
})();