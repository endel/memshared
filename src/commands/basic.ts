import * as cluster from "cluster";

import { buildMessage } from "../protocol";
import { store } from "../";

/*
 * GET key
 * Get the value of a key
 */
export function get (key: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("get", callback, key);

    } else {
        return store[key];
    }
}

/*
 * SET key value [EX seconds] [PX milliseconds] [NX|XX]
 * Set the string value of a key
 */
export function set (key: string, value: any, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("set", callback, key);

    } else {
        store[key] = value;
        return "OK";
    }
}

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

/*
 * APPEND key value
 * Append a value to a key
 */

/*
 * BITCOUNT key [start end]
 * Count set bits in a string
 */

/*
 * BITFIELD key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL]
 * Perform arbitrary bitfield integer operations on strings
 */

/*
 * BITOP operation destkey key [key ...]
 * Perform bitwise operations between strings
 */

/*
 * BITPOS key bit [start] [end]
 * Find first bit set or clear in a string
 */

/*
 * DECR key
 * Decrement the integer value of a key by one
 */

/*
 * DECRBY key decrement
 * Decrement the integer value of a key by the given number
 */

/*
 * GETBIT key offset
 * Returns the bit value at offset in the string value stored at key
 */

/*
 * GETRANGE key start end
 * Get a substring of the string stored at a key
 */

/*
 * GETSET key value
 * Set the string value of a key and return its old value
 */

/*
 * INCR key
 * Increment the integer value of a key by one
 */

/*
 * INCRBY key increment
 * Increment the integer value of a key by the given amount
 */

/*
 * INCRBYFLOAT key increment
 * Increment the float value of a key by the given amount
 */

/*
 * MGET key [key ...]
 * Get the values of all the given keys
 */

/*
 * MSET key value [key value ...]
 * Set multiple keys to multiple values
 */

/*
 * MSETNX key value [key value ...]
 * Set multiple keys to multiple values, only if none of the keys exist
 */

/*
 * PSETEX key milliseconds value
 * Set the value and expiration in milliseconds of a key
 */

/*
 * SETBIT key offset value
 * Sets or clears the bit at offset in the string value stored at key
 */

/*
 * SETEX key seconds value
 * Set the value and expiration of a key
 */

/*
 * SETNX key value
 * Set the value of a key, only if the key does not exist
 */

/*
 * SETRANGE key offset value
 * Overwrite part of a string at key starting at the specified offset
 */

/*
 * STRLEN key
 * Get the length of the value stored in a key
 */

/**
 * DUMP key
 * Return a serialized version of the value stored at the specified key.
 */

/**
 * EXISTS key [key ...]
 * Determine if a key exists
 */

/**
 * EXPIRE key seconds
 * Set a key's time to live in seconds
 */

/**
 * EXPIREAT key timestamp
 * Set the expiration for a key as a UNIX timestamp
 */

/**
 * KEYS pattern
 * Find all keys matching the given pattern
 */

/**
 * MIGRATE host port key|"" destination-db timeout [COPY] [REPLACE] [KEYS key [key ...]]
 * Atomically transfer a key from a Redis instance to another one.
 */

/**
 * MOVE key db
 * Move a key to another database
 */

/**
 * OBJECT subcommand [arguments [arguments ...]]
 * Inspect the internals of Redis objects
 */

/**
 * PERSIST key
 * Remove the expiration from a key
 */

/**
 * PEXPIRE key milliseconds
 * Set a key's time to live in milliseconds
 */

/**
 * PEXPIREAT key milliseconds-timestamp
 * Set the expiration for a key as a UNIX timestamp specified in milliseconds
 */

/**
 * PTTL key
 * Get the time to live for a key in milliseconds
 */

/**
 * RANDOMKEY
 * Return a random key from the keyspace
 */

/**
 * RENAME key newkey
 * Rename a key
 */

/**
 * RENAMENX key newkey
 * Rename a key, only if the new key does not exist
 */

/**
 * RESTORE key ttl serialized-value [REPLACE]
 * Create a key using the provided serialized value, previously obtained using DUMP.
 */

/**
 * SORT key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]
 * Sort the elements in a list, set or sorted set
 */

/**
 * TOUCH key [key ...]
 * Alters the last access time of a key(s). Returns the number of existing keys specified.
 */

/**
 * TTL key
 * Get the time to live for a key
 */

/**
 * TYPE key
 * Determine the type stored at key
 */

/**
 * UNLINK key [key ...]
 * Delete a key asynchronously in another thread. Otherwise it is just as DEL, but non blocking.
 */

/**
 * WAIT numslaves timeout
 * Wait for the synchronous replication of all the write commands sent in the context of the current connection
 */

/**
 * SCAN cursor [MATCH pattern] [COUNT count]
 * Incrementally iterate the keys space
 */
