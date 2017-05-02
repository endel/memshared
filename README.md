# memshared

[![Build Status](https://secure.travis-ci.org/endel/memshared.png?branch=master)](http://travis-ci.org/endel/memshared)

Redis-like in-memory database for NodeJS clustered applications.

**This project is still under development**. Currently only basic commands are
implemented. If you would like to help, [pick one command that is not
implemented yet](https://github.com/endel/memshared/tree/master/src/commands)
and feel free to submit a pull-request!

## Usage

```typescript
import * as cluster from "cluster";
import * as memshared from "memshared";

if (cluster.isMaster) {
  memshared.setup({
    // setup your initial data
  });

  cluster.fork();

} else {
  memshared.set('foo', 'bar');

  memshared.get('foo', function (err, result) {
    console.log(result);
  });

  memshared.del('key');

  memshared.sadd('set', 1, 3, 5, 7);
}
```

## License

MIT
