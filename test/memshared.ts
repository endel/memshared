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
                string: "Hello world!",
                hash: { one: 1, two: 2, three: 3 },
                mutateme: { one: 1, two: 2, three: 3 },
                deleteme: { one: 1, two: 2, three: 3 },
                list: [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ]
            });
        });

        it("all tests", (done) => {
            worker.on("exit", () => done());
        }).timeout(5000);;

    } else {
        // Exit worker on completion
        after(() => process.exit());

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
                    commands.set("key", "value", function(err, result) {
                        assert.equal(result, "OK");
                        commands.get("key", (err, result) => {
                            assert.equal(result, "value");
                            done();
                        });
                    });
                });
            });

            describe("#delete", () => {
                it("delete", (done) => {
                    commands.del("number", (err, result) => {
                        assert.equal(result, "OK");

                        commands.get("number", (err, result) => {
                            assert.equal(undefined, result);
                            done();
                        });
                    });
                    assert.isTrue(true);
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

    }

});

