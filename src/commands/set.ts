import * as cluster from "cluster";
import { store } from "../";

function notASetError(key: string) {
    throw new Error(`'${key}' is not a Set.`)
}

/*
 * SADD key member [member ...]
 * Add one or more members to a set
 */
export function sadd (key: string, member: any, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("sadd", callback, key, member);

    } else {
        if (!Array.isArray(store[key])) {
            store[key] = [];
        }

        store[key].push(member);

        return true;
    }
}

/*
 * SCARD key
 * Get the number of members in a set
 */
export function scard (key: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("scard", callback, key);

    } else {
        if (!Array.isArray(store[key])) {
            notASetError(key);
        }
        return store[key].length;
    }
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
export function sismember (key: string, member: any, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("sismember", callback, key, member);

    } else {
        if (!Array.isArray(store[key])) {
            notASetError(key);
        }
        return store[key].indexOf(member) >= 0;
    }
}

/*
 * SMEMBERS key
 * Get all the members in a set
 */
export function smembers (key: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("smembers", callback, key);

    } else {
        return (!Array.isArray(store[key]))
            ? []
            : store[key];
    }
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
export function spop (key: string, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("spop", callback, key);

    } else {
        return (!Array.isArray(store[key]))
            ? null
            : store[key].pop();
    }
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
export function srem (key: string, member: any, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("srem", callback, key, member);

    } else {
        let s = (store[key] || []);
        let index = s.indexOf(member);
        let found = (index !== -1);

        if (found) {
            s.splice(index, 1);
        }

        return found;
    }
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

