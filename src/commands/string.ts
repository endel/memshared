import { store, isMasterNode } from "../";
import { ArrayCallback, Callback } from "../callbacks";
import { del } from "./key";

/*
 * GET key
 * Get the value of a key
 */
export function get (key: string, callback: Callback<any>) {
    if (!isMasterNode()) {
        store.dispatch("get", callback, key);

    } else {
        return store[key];
    }
}

/*
 * SET key value [EX seconds] [PX milliseconds] [NX|XX]
 * Set the string value of a key
 */
export function set (key: string, value: any, callback?: Callback<string>) {
    if (!isMasterNode()) {
        store.dispatch("set", callback, key, value);

    } else {
        store[key] = value;
        return "OK";
    }
}

/*
 * APPEND key value
 * Append a value to a key
 */
export function append () {
}

/*
 * BITCOUNT key [start end]
 * Count set bits in a string
 */
export function bitcount () {
}

/*
 * BITFIELD key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL]
 * Perform arbitrary bitfield integer operations on strings
 */
export function bitfield () {
}

/*
 * BITOP operation destkey key [key ...]
 * Perform bitwise operations between strings
 */
export function bitop () {
}

/*
 * BITPOS key bit [start] [end]
 * Find first bit set or clear in a string
 */
export function bitpos () {
}

/*
 * DECR key
 * Decrement the integer value of a key by one
 */
export function decr (key: string, callback: Callback<number>) {
    if (!isMasterNode()) {
        store.dispatch("decr", callback, key);

    } else {
        if (!store[key]) {
            store[key] = 0;
        }
        return (--store[key]);
    }
}

/*
 * DECRBY key decrement
 * Decrement the integer value of a key by the given number
 */
export function decrby (key: string, value: number, callback: Callback<number>) {
    if (!isMasterNode()) {
        store.dispatch("decrby", callback, key, value);

    } else {
        if (!store[key]) {
            store[key] = 0;
        }
        store[key] -= value;
        return store[key];
    }
}

/*
 * GETBIT key offset
 * Returns the bit value at offset in the string value stored at key
 */
export function getbit () {
}

/*
 * GETRANGE key start end
 * Get a substring of the string stored at a key
 */
export function getrange () {
}

/*
 * GETSET key value
 * Set the string value of a key and return its old value
 */
export function getset () {
}

/*
 * INCR key
 * Increment the integer value of a key by one
 */
export function incr (key: string, callback: Callback<number>) {
    if (!isMasterNode()) {
        store.dispatch("incr", callback, key);

    } else {
        if (!store[key]) {
            store[key] = 0;
        }
        return ++store[key];
    }
}

/*
 * INCRBY key increment
 * Increment the integer value of a key by the given amount
 */
export function incrby (key: string, value: number, callback: Callback<number>) {
    if (!isMasterNode()) {
        store.dispatch("incrby", callback, key, value);

    } else {
        if (!store[key]) {
            store[key] = 0;
        }
        store[key] += value;
        return store[key];
    }
}

/*
 * INCRBYFLOAT key increment
 * Increment the float value of a key by the given amount
 */
export function incrbyfloat () {
}

/*
 * MGET key [key ...]
 * Get the values of all the given keys
 */
export function mget (keys: string[], callback: ArrayCallback<any>) {
    if (!isMasterNode()) {
        store.dispatch("mget", callback, keys);

    } else {
        return keys.map(k => get(k, undefined));
    }
}

/*
 * MSET key value [key value ...]
 * Set multiple keys to multiple values
 */
export function mset () {
}

/*
 * MSETNX key value [key value ...]
 * Set multiple keys to multiple values, only if none of the keys exist
 */
export function msetnx () {
}

/*
 * PSETEX key milliseconds value
 * Set the value and expiration in milliseconds of a key
 */
export function psetex () {
}

/*
 * SETBIT key offset value
 * Sets or clears the bit at offset in the string value stored at key
 */
export function setbit () {
}

/*
 * SETEX key seconds value
 * Set the value and expiration of a key
 */
export function setex (key: string, seconds: number, value: any, callback?: Callback<string>) {
    if (!isMasterNode()) {
        store.dispatch("setex", callback, key, seconds, value);

    } else {
        set(key, value, undefined);

        // enqueue to delete after timeout in seconds.
        setTimeout(del, seconds * 1000, key);

        return "OK";
    }
}

/*
 * SETNX key value
 * Set the value of a key, only if the key does not exist
 */
export function setnx () {
}

/*
 * SETRANGE key offset value
 * Overwrite part of a string at key starting at the specified offset
 */
export function setrange () {
}

/*
 * STRLEN key
 * Get the length of the value stored in a key
 */
export function strlen (key: string, callback: Callback<number>) {
    if (!isMasterNode()) {
        store.dispatch("strlen", callback, key);

    } else {
        return (store[key] || "").length;
    }
}

