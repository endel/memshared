import * as cluster from "cluster";
import { store } from "../";

/*
 * HDEL key field [field ...]
 * Delete one or more hash fields
 */
export function hdel (key: string, field: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("hdel", callback, key, field);

    } else {
        if (typeof(store[key])!=="object") {
            throw new Error(`'${key}' expected to be type of hash.`);
        }

        delete store[key][field];
        return "OK";
    }
}

/*
 * HEXISTS key field
 * Determine if a hash field exists
 */
export function hexists (key: string, field: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("hexists", callback, key, field);

    } else {
        return (store[key] && store[key][field] !== undefined);
    }
}

/*
 * HGET key field
 * Get the value of a hash field
 */
export function hget (key: string, field: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("hget", callback, key, field);

    } else {
        return (store[key] && store[key][field]);
    }
}

/*
 * HGETALL key
 * Get all the fields and values in a hash
 */
export function hgetall (key: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("hgetall", callback, key);

    } else {
        let result = [];
        let target = store[key] || {};

        for (let k in target) {
            result.push(k);
            result.push(store[key][k]);
        }

        return result;
    }
}

/*
 * HINCRBY key field increment
 * Increment the integer value of a hash field by the given number
 */
export function hincrby (key: string, field: string, increment: number, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("hincrby", callback, key, field, increment);

    } else {
        if (!store[key]) {
            store[key] = {};
        }

        if (!store[key][field]) {
            store[key][field] = increment;
        } else {
            store[key][field] += increment;
        }

        return store[key][field];
    }
}

/*
 * HINCRBYFLOAT key field increment
 * Increment the float value of a hash field by the given amount
 */
export function hincrbyfloat () {
}

/*
 * HKEYS key
 * Get all the fields in a hash
 */
export function hkeys (key: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("hkeys", callback, key);

    } else {
        return (store[key] !== undefined)
            ? Object.keys(store[key])
            : [];
    }
}

/*
 * HLEN key
 * Get the number of fields in a hash
 */
export function hlen (key: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("hlen", callback, key);

    } else {
        return (store[key] !== undefined)
            ? Object.keys(store[key]).length
            : 0;
    }
}

/*
 * HMGET key field [field ...]
 * Get the values of all the given hash fields
 */
export function hmget () {
}

/*
 * HMSET key field value [field value ...]
 * Set multiple hash fields to multiple values
 */
export function hmset () {
}

/*
 * HSET key field value
 * Set the string value of a hash field
 */
export function hset (key: string, field: string, value: any, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("hset", callback, key, field, value);

    } else {
        if (!store[key]) {
            store[key] = {};
        }

        store[key][field] = value;

        return true;
    }
}

/*
 * HSETNX key field value
 * Set the value of a hash field, only if the field does not exist
 */
export function hsetnx () {
}

/*
 * HSTRLEN key field
 * Get the length of the value of a hash field
 */
export function hstrlen () {
}

/*
 * HVALS key
 * Get all the values in a hash
 */
export function hvals (key: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("hvals", callback, key);

    } else {
        let result = [];
        let target = store[key] || {};

        for (let k in target) {
            result.push(target[k]);
        }

        return result;
    }
}

/*
 * HSCAN key cursor [MATCH pattern] [COUNT count]
 * Incrementally iterate hash fields and associated values
 */
export function hscan () {
}
