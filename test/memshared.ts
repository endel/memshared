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
                list: [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ]
            });
        });

        it("all tests", (done) => {
            worker.on("exit", () => done());
        });

    } else {
        // Exit worker on completion
        after(() => process.exit());

        describe("basic", () => {
            describe("#get", () => {
                it("get", () => {
                    assert.isTrue(true);
                });
            });

            describe("#set", () => {
                it("set", (done) => {
                    commands.set("key", "value", function(result) {
                        assert.equal(result, "OK");
                        done();
                    })
                });
            });

            describe("#delete", () => {
                it("delete", (done) => {
                    commands.get("number", (result) => {
                        assert.equal(result, 1);
                    });

                    commands.del("number", (result) => {
                        assert.equal(result, "OK");

                        commands.get("number", (result) => {
                            assert.equal(undefined, result);
                            done();
                        });
                    });
                    assert.isTrue(true);
                });
            });

        });

    }

});

