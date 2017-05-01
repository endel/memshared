import * as cluster from "cluster";
import { store } from "../";

/*
 * HDEL key field [field ...]
 * Delete one or more hash fields
 */
export function hdel () {
}

/*
 * HEXISTS key field
 * Determine if a hash field exists
 */
export function hexists () {
}

/*
 * HGET key field
 * Get the value of a hash field
 */
export function hget () {
}

/*
 * HGETALL key
 * Get all the fields and values in a hash
 */
export function hgetall () {
}

/*
 * HINCRBY key field increment
 * Increment the integer value of a hash field by the given number
 */
export function hincrby () {
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
export function hkeys () {
}

/*
 * HLEN key
 * Get the number of fields in a hash
 */
export function hlen () {
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
export function hset () {
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
export function hvals () {
}

/*
 * HSCAN key cursor [MATCH pattern] [COUNT count]
 * Incrementally iterate hash fields and associated values
 */
export function hscan () {
}
