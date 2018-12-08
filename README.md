# batch-stream
Transform a stream of items into a stream of arrays

## Usage

```js
const batchify = require('@jdesboeufs/batch-stream')

inputStream
  .pipe(batchify(1000))
  .pipe(outputStream)
```

## License

MIT
