import { assert } from "chai";

import * as commands from "../src/commands";
import * as cluster from "cluster";
import { setup } from "../src/index";

describe("memshared", () => {

    if (cluster.isMaster) {
        let worker = cluster.fork();

        it("should set up with initial data", () => {
            setup({
                number: 1,
                number_decr: 5,
                number_decrby: 5,
                number_incr: 5,
                number_incrby: 5,
                string: "Hello world!",
                hash: { one: 1, two: 2, three: 3 },
                mutateme: { one: 1, two: 2, three: 3 },
                deleteme: { one: 1, two: 2, three: 3 },
                list: [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ],
                list_pop: [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ],
                set: new Set([ 9, 8, 7, 6, 5, 4, 3, 2, 1 ]),
                set_pop: new Set([ 9, 8, 7, 6, 5, 4, 3, 2, 1 ]),
            });
        });

        it("all tests", (done) => {
            worker.on("exit", () => done());
        }).timeout(5000);;

    } else {
        // Exit worker on completion
        after(() => process.exit());

        //
        // String
        //
        describe("basic", () => {
            describe("#get", () => {
                it("get", () => {
                    commands.get("number", (err, result) => {
                        assert.equal(result, 1);
                    });
                });
            });

            describe("#set", () => {
                it("set", (done) => {
                    commands.set("key", "value", (err, result) => {
                        assert.equal(result, "OK");
                        commands.get("key", (err, result) => {
                            assert.equal(result, "value");
                            done();
                        });
                    });
                });
            });

            describe("#decr", () => {
                it("should decrease non-existing key", (done) => {
                    commands.decr("decr-non-existing", (err, result) => {
                        assert.equal(result, -1);
                        commands.get("decr-non-existing", (err, result) => {
                            assert.equal(result, -1);
                            done();
                        });
                    });
                });

                it("should decrease existing key", (done) => {
                    commands.decr("number_decr", (err, result) => {
                        assert.equal(result, 4);
                        commands.get("number_decr", (err, result) => {
                            assert.equal(result, 4);
                            done();
                        });
                    });
                });
            });

            describe("#decrby", () => {
                it("should decrease non-existing key", (done) => {
                    commands.decrby("decrby-non-existing", 3, (err, result) => {
                        assert.equal(result, -3);
                        commands.get("decrby-non-existing", (err, result) => {
                            assert.equal(result, -3);
                            done();
                        });
                    });
                });

                it("should decrease existing key", (done) => {
                    commands.decrby("number_decrby", 3, (err, result) => {
                        assert.equal(result, 2);
                        commands.get("number_decrby", (err, result) => {
                            assert.equal(result, 2); done();
                        });
                    });
                });
            });


            describe("#incr", () => {
                it("should increase non-existing key", (done) => {
                    commands.incr("incr-non-existing", (err, result) => {
                        assert.equal(result, 1);
                        commands.get("incr-non-existing", (err, result) => {
                            assert.equal(result, 1);
                            done();
                        });
                    });
                });

                it("should increase existing key", (done) => {
                    commands.incr("number_incr", (err, result) => {
                        assert.equal(result, 6);
                        commands.get("number_incr", (err, result) => {
                            assert.equal(result, 6);
                            done();
                        });
                    });
                });
            });

            describe("#incrby", () => {
                it("should increase non-existing key", (done) => {
                    commands.incrby("incrby-non-existing", 3, (err, result) => {
                        assert.equal(result, 3);
                        commands.get("incrby-non-existing", (err, result) => {
                            assert.equal(result, 3);
                            done();
                        });
                    });
                });

                it("should increase existing key", (done) => {
                    commands.incrby("number_incrby", 3, (err, result) => {
                        assert.equal(result, 8);
                        commands.get("number_incrby", (err, result) => {
                            assert.equal(result, 8); done();
                        });
                    });
                });
            });

            describe("#strlen", () => {
                it("should return 0 for non-existing key", (done) => {
                    commands.strlen("strlen-non-existing", (err, result) => {
                        assert.equal(result, 0);
                        done();
                    });
                });

                it("should return string length for existing key", (done) => {
                    commands.strlen("string", (err, result) => {
                        assert.equal(result, 12);
                        done();
                    });
                });
            });

        });

        //
        // Key
        //
        describe("key", () => {
            describe("#delete", () => {
                it("delete", (done) => {
                    commands.del("number", (err, result) => {
                        assert.equal(result, "OK");

                        commands.get("number", (err, result) => {
                            assert.equal(undefined, result);
                            done();
                        });
                    });
                });
            });
        });

        //
        // Hash
        //
        describe("hash", () => {

            describe("#hdel", () => {
                it("should error when trying to delete invalid key", (done) => {
                    commands.hdel("not-a-hash", "key", (err, result) => {
                        assert.typeOf(err, "string");
                        done();
                    });
                });

                it("should error when trying to delete invalid key", (done) => {
                    commands.hdel("deleteme", "one", (err, result) => {
                        assert.equal(result, "OK");
                        done();
                    });
                });
            });


            describe("#hget", () => {
                it("should return array of keys and values", (done) => {
                    commands.hget("hash", "one", (err, result) => {
                        assert.equal(result, 1);
                        done();
                    });
                });

                it("should return undefined for non-existing key", (done) => {
                    commands.hget("not-a-hash", "field", (err, result) => {
                        assert.deepEqual(result, undefined);
                        done();
                    });
                });
            });

            describe("#hgetall", () => {
                it("should return array of keys and values", (done) => {
                    commands.hgetall("hash", (err, result) => {
                        assert.deepEqual(result, ['one', 1, 'two', 2, 'three', 3]);
                        done();
                    });
                });

                it("should return empty for non-existing keys", (done) => {
                    commands.hgetall("not-a-hash", (err, result) => {
                        assert.deepEqual(result, []);
                        done();
                    });
                });
            });

            describe("#hincrby", () => {
                it("should increment non-existing keys", (done) => {
                    commands.hincrby("non-existing", "field", 2, (err, result) => {
                        assert.equal(result, 2);
                        commands.hget("non-existing", "field", (err, result) => {
                            assert.equal(result, 2);
                            done();
                        });
                    });
                });

                it("should increment existing values", (done) => {
                    commands.hincrby("mutateme", "two", 1, (err, result) => {
                        assert.equal(result, 3);
                        commands.hget("mutateme", "two", (err, result) => {
                            assert.equal(result, 3);
                            done();
                        });
                    });
                });
            });

            describe("#hkeys", () => {
                it("should return empty for non-existing keys", (done) => {
                    commands.hkeys("non-existing-hkeys", (err, result) => {
                        assert.deepEqual(result, []);
                        done();
                    });
                });

                it("should return array of keys for valid object", (done) => {
                    commands.hkeys("hash", (err, result) => {
                        assert.deepEqual(result, ['one', 'two', 'three']);
                        done();
                    });
                });
            });

            describe("#hvals", () => {
                it("should return empty for non-existing keys", (done) => {
                    commands.hvals("non-existing-hkeys", (err, result) => {
                        assert.deepEqual(result, []);
                        done();
                    });
                });

                it("should return array of values for valid object", (done) => {
                    commands.hvals("hash", (err, result) => {
                        assert.deepEqual(result, [1, 2, 3]);
                        done();
                    });
                });
            });

            describe("#hlen", () => {
                it("should return 0 for non-existing keys", (done) => {
                    commands.hlen("non-existing-hlen", (err, result) => {
                        assert.equal(result, 0);
                        done();
                    });
                });

                it("should return number of keys for valid object", (done) => {
                    commands.hlen("hash", (err, result) => {
                        assert.deepEqual(result, 3);
                        done();
                    });
                });
            });

            describe("#hset", () => {
                it("should set value for a hash", (done) => {
                    commands.hset("mutateme", "newkey", "value", (err, result) => {
                        assert.equal(result, true);
                        commands.hget("mutateme", "newkey", (err, result) => {
                            assert.equal(result, "value");
                            done();
                        });
                    });
                });
            });

        });

        //
        // Set
        //
        describe("set", () => {
            describe("#sadd", () => {
                it("should add item to set", (done) => {
                    commands.sadd("sadd-set", "element", (err, result) => {
                        assert.equal(result, true);
                        commands.sismember("sadd-set", "element", (err, result) => {
                            assert.equal(result, true);
                            done();
                        });
                    });
                });
            });

            describe("#scard", () => {
                it("should get number of elements on set", (done) => {
                    commands.scard("set", (err, result) => {
                        assert.equal(result, 9);
                        done();
                    });
                });
            });

            describe("#sismember", () => {
                it("should return true if member is found", (done) => {
                    commands.sismember("set", 1, (err, result) => {
                        assert.equal(result, true);
                        done();
                    });
                });

                it("should return false if member couldn't be found", (done) => {
                    commands.sismember("set", 20, (err, result) => {
                        assert.equal(result, false);
                        done();
                    });
                });
            });

            describe("#smembers", () => {
                it("should return empty for non-existing keys", (done) => {
                    commands.smembers("smembers-non-existing-key", (err, result) => {
                        assert.deepEqual(result, []);
                        done();
                    });
                });

                it("should return all elements for valid key", (done) => {
                    commands.smembers("set", (err, result) => {
                        assert.deepEqual(result, [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ]);
                        done();
                    });
                });

            });

            // describe("#spop", () => {
            //     it("should return null for non-existing keys", (done) => {
            //         commands.spop("smembers-non-existing-key", (err, result) => {
            //             assert.equal(result, null);
            //             done();
            //         });
            //     });
            //
            //     it("should return last value for valid keys", (done) => {
            //         commands.spop("list_pop", (err, result) => {
            //             assert.equal(result, 1);
            //             done();
            //         });
            //     });
            //
            // });

            describe("#srem", () => {
                it("should return false for non-existing keys", (done) => {
                    commands.srem("srem-non-existing-key", "it-doesn't-work-anyway", (err, result) => {
                        assert.equal(result, false);
                        done();
                    });
                });

                it("should return true if removed successfully", (done) => {
                    commands.srem("set_pop", 5, (err, result) => {
                        assert.equal(result, true);
                        done();
                    });
                });

            });
        });

    }

});

