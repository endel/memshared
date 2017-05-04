import * as cluster from "cluster";
import { store } from "../";

/**
 * DEL key [key ...]
 * Delete a key
 */
export function del (key: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("del", callback, key);

    } else {
        delete store[key];
        return "OK";
    }
}

/**
 * DUMP key
 * Return a serialized version of the value stored at the specified key.
 */
export function dump () {
}

/**
 * EXISTS key [key ...]
 * Determine if a key exists
 */
export function exists (key: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("exists", callback, key);

    } else {
        return (store[key] !== undefined);
    }
}

/**
 * EXPIRE key seconds
 * Set a key's time to live in seconds
 */
export function expire () {
}

/**
 * EXPIREAT key timestamp
 * Set the expiration for a key as a UNIX timestamp
 */
export function expireat () {
}

/**
 * KEYS pattern
 * Find all keys matching the given pattern
 */
export function keys (pattern: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("keys", callback, pattern);

    } else {
        let keys = [];
        let regexp = new RegExp(pattern.replace("*", ".*"));
        let allKeys = Object.keys(store)

        for (var i = 0, len = allKeys.length; i < len; i++) {
            if (regexp.test(allKeys[i])) {
                keys.push(allKeys[i]);
            }
        }

        return keys;
    }
}

/**
 * MIGRATE host port key|"" destination-db timeout [COPY] [REPLACE] [KEYS key [key ...]]
 * Atomically transfer a key from a Redis instance to another one.
 */
export function migrate () {
}

/**
 * MOVE key db
 * Move a key to another database
 */
export function move () {
}

/**
 * OBJECT subcommand [arguments [arguments ...]]
 * Inspect the internals of Redis objects
 */
export function object () {
}

/**
 * PERSIST key
 * Remove the expiration from a key
 */
export function persist () {
}

/**
 * PEXPIRE key milliseconds
 * Set a key's time to live in milliseconds
 */
export function pexpire () {
}

/**
 * PEXPIREAT key milliseconds-timestamp
 * Set the expiration for a key as a UNIX timestamp specified in milliseconds
 */
export function pexpireat () {
}

/**
 * PTTL key
 * Get the time to live for a key in milliseconds
 */
export function pttl () {
}

/**
 * RANDOMKEY
 * Return a random key from the keyspace
 */
export function randomkey () {
}

/**
 * RENAME key newkey
 * Rename a key
 */
export function rename (key: string, newkey: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("rename", callback, key, newkey);

    } else {
        if (!store[key]) {
            throw new Error(`no such key '${ key }'`);
        }

        store[newkey] = store[key];
        delete store[key];

        return true;
    }
}

/**
 * RENAMENX key newkey
 * Rename a key, only if the new key does not exist
 */
export function renamenx () {
}

/**
 * RESTORE key ttl serialized-value [REPLACE]
 * Create a key using the provided serialized value, previously obtained using DUMP.
 */
export function restore () {
}

/**
 * SORT key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]
 * Sort the elements in a list, set or sorted set
 */
export function sort () {
}

/**
 * TOUCH key [key ...]
 * Alters the last access time of a key(s). Returns the number of existing keys specified.
 */
export function touch () {
}

/**
 * TTL key
 * Get the time to live for a key
 */
export function ttl () {
}

/**
 * TYPE key
 * Determine the type stored at key
 */
export function type (key: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("type", callback, key);

    } else {
        return typeof(store[key]);
    }
}

/**
 * UNLINK key [key ...]
 * Delete a key asynchronously in another thread. Otherwise it is just as DEL, but non blocking.
 */
export function unlink () {
}

/**
 * WAIT numslaves timeout
 * Wait for the synchronous replication of all the write commands sent in the context of the current connection
 */
export function wait () {
}

/**
 * SCAN cursor [MATCH pattern] [COUNT count]
 * Incrementally iterate the keys space
 */
export function scan () {
}

