'use strict';

async function waiter(interval) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(0)
        }, interval)
    });
}

module.exports = waiter;
