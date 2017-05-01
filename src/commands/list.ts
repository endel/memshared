import * as cluster from "cluster";
import { store } from "../";

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
export function lindex () {
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
export function llen () {
}

/*
 * LPOP key
 * Remove and get the first element in a list
 */
export function lpop () {
}

/*
 * LPUSH key value [value ...]
 * Prepend one or multiple values to a list
 */
export function lpush () {
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
export function lrange () {
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
export function lset () {
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
export function rpop () {
}

/*
 * RPOPLPUSH source destination
 * Remove the last element in a list, prepend it to another list and return it
 */
export function rpoplpush () {
}

/*
 * RPUSH key value [value ...]
 * Append one or multiple values to a list
 */
export function rpush () {
}

/*
 * RPUSHX key value
 * Append a value to a list, only if the list exists
 */
export function rpushx () {
}
