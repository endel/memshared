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
        if (!(store[key] instanceof Set)) {
            store[key] = new Set();
        }
        store[key].add(member);
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
        if (!(store[key] instanceof Set)) {
            notASetError(key);
        }
        return store[key].size;
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
        if (!(store[key] instanceof Set)) {
            notASetError(key);
        }
        return store[key].has(member);
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
        return (!(store[key] instanceof Set))
            ? []
            : Array.from(store[key].values());
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
export function spop (key: string, count: number = 1, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("spop", callback, key, count);

    } else {
        let members = srandmember(key, count, undefined);

        for (var i = 0, len = members.length; i < len; i++) {
            srem(key, members[i], undefined);
        }

        return members;
    }
}

/*
 * SRANDMEMBER key [count]
 * Get one or multiple random members from a set
 */
export function srandmember (key: string, count: number=1, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("srandmember", callback, key, count);

    } else {
        var setLength: number = store[key].size;
        var returnArr = [];
        var isPositive: boolean = true ? (count > 0) : false;
        count = Math.abs(count);
        var set = Array.from(store[key]);
        if ((isPositive) && (count >= setLength)) {
          return set;
        }
        var returnedIndexes: Array<number> = [];
        for(var i = 0; i < count; i++) {
            var randIndex: number;
            do {
              randIndex = Math.floor(Math.random() * setLength);
            } while((isPositive) && (returnedIndexes.indexOf(randIndex) != -1));
            returnArr.push(set[randIndex]);
            if (isPositive) {
              returnedIndexes.push(randIndex);
            }
          }
          return returnArr;
        }
    }

/*
 * SREM key member [member ...]
 * Remove one or more members from a set
 */
export function srem (key: string, member: any, callback: Function) {
    if (cluster.isWorker) {
        store.dispatch("srem", callback, key, member);

    } else {
        return (!(store[key] instanceof Set))
            ? false
            : store[key].delete(member);
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
