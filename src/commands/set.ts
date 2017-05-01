import * as cluster from "cluster";
import { store } from "../";

/*
 * SADD key member [member ...]
 * Add one or more members to a set
 */
export function sadd () {
}

/*
 * SCARD key
 * Get the number of members in a set
 */
export function scard () {
}

/*
 * SDIFF key [key ...]
 * Subtract multiple sets
 */
export function sdiff () {
}

/*
 * SDIFFSTORE destination key [key ...]
 * Subtract multiple sets and store the resulting set in a key
 */
export function sdiffstore () {
}

/*
 * SINTER key [key ...]
 * Intersect multiple sets
 */
export function sinter () {
}

/*
 * SINTERSTORE destination key [key ...]
 * Intersect multiple sets and store the resulting set in a key
 */
export function sinterstore () {
}

/*
 * SISMEMBER key member
 * Determine if a given value is a member of a set
 */
export function sismember () {
}

/*
 * SMEMBERS key
 * Get all the members in a set
 */
export function smembers () {
}

/*
 * SMOVE source destination member
 * Move a member from one set to another
 */
export function smove () {
}

/*
 * SPOP key [count]
 * Remove and return one or multiple random members from a set
 */
export function spop () {
}

/*
 * SRANDMEMBER key [count]
 * Get one or multiple random members from a set
 */
export function srandmember () {
}

/*
 * SREM key member [member ...]
 * Remove one or more members from a set
 */
export function srem () {
}

/*
 * SUNION key [key ...]
 * Add multiple sets
 */
export function sunion () {
}

/*
 * SUNIONSTORE destination key [key ...]
 * Add multiple sets and store the resulting set in a key
 */
export function sunionstore () {
}

/*
 * SSCAN key cursor [MATCH pattern] [COUNT count]
 * Incrementally iterate Set elements
 */
export function sscan () {
}

