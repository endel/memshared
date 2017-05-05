import { store, isMasterNode } from "../";

/*
 * BLPOP key [key ...] timeout
 * Remove and get the first element in a list, or block until one is available
 */
export function blpop () {
}

/*
 * BRPOP key [key ...] timeout
 * Remove and get the last element in a list, or block until one is available
 */
export function brpop () {
}

/*
 * BRPOPLPUSH source destination timeout
 * Pop a value from a list, push it to another list and return it; or block until one is available
 */
export function brpoplpush () {
}

/*
 * LINDEX key index
 * Get an element from a list by its index
 */
export function lindex (key: string, value: any, callback: Function) {
    if (!isMasterNode()) {
        store.dispatch("lindex", callback, key, value);

    } else {
        return (!store[key])
            ? null
            : store[key].indexOf(value);
    }
}

/*
 * LINSERT key BEFORE|AFTER pivot value
 * Insert an element before or after another element in a list
 */
export function linsert () {
}

/*
 * LLEN key
 * Get the length of a list
 */
export function llen (key: string, callback: Function) {
    if (!isMasterNode()) {
        store.dispatch("llen", callback, key);

    } else {
        return (store[key] || []).length;
    }
}

/*
 * LPOP key
 * Remove and get the first element in a list
 */
export function lpop (key: string, callback: Function) {
    if (!isMasterNode()) {
        store.dispatch("lpop", callback, key);

    } else {
        return (store[key] || []).shift();
    }
}

/*
 * LPUSH key value [value ...]
 * Prepend one or multiple values to a list
 */
export function lpush (key: string, value: any, callback: Function) {
    if (!isMasterNode()) {
        store.dispatch("lpush", callback, key, value);

    } else {
        return store[key].unshift(value);
    }
}

/*
 * LPUSHX key value
 * Prepend a value to a list, only if the list exists
 */
export function lpushx () {
}

/*
 * LRANGE key start stop
 * Get a range of elements from a list
 */
export function lrange (key: string, start: number, stop: number, callback: Function) {
    if (!isMasterNode()) {
        store.dispatch("lrange", callback, key, start, stop);

    } else {
        return (store[key] || []).slice(start, stop);
    }
}

/*
 * LREM key count value
 * Remove elements from a list
 */
export function lrem () {
}

/*
 * LSET key index value
 * Set the value of an element in a list by its index
 */
export function lset (key: string, index: number, value: any, callback: Function) {
    if (!isMasterNode()) {
        store.dispatch("lset", callback, key, index, value);

    } else {
        if (store[key][index] === undefined) {
            throw new Error("index out of range");
        }

        store[key][index] = value;

        return "OK";
    }
}

/*
 * LTRIM key start stop
 * Trim a list to the specified range
 */
export function ltrim () {
}

/*
 * RPOP key
 * Remove and get the last element in a list
 */
export function rpop (key: string, callback: Function) {
    if (!isMasterNode()) {
        store.dispatch("rpop", callback, key);

    } else {
        return (store[key] || []).pop();
    }
}

/*
 * RPOPLPUSH source destination
 * Remove the last element in a list, prepend it to another list and return it
 */
export function rpoplpush (source: string, destination: string, callback: Function) {
    if (!isMasterNode()) {
        store.dispatch("rpoplpush", callback, source, destination);

    } else {
        let value = rpop(source, undefined);
        lpush(destination, value, undefined)
        return value;
    }
}

/*
 * RPUSH key value [value ...]
 * Append one or multiple values to a list
 */
export function rpush (key: string, value: any, callback: Function) {
    if (!isMasterNode()) {
        store.dispatch("rpush", callback, key, value);

    } else {
        return store[key].push(value);
    }
}

/*
 * RPUSHX key value
 * Append a value to a list, only if the list exists
 */
export function rpushx () {
}
