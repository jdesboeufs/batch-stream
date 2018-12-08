const {Transform} = require('stream')

function createBatch(batchSize) {
  if (!batchSize) {
    throw new Error('batchSize is required')
  }
  let bucket = []
  return new Transform({
    transform(item, enc, cb) {
      bucket.push(item)
      if (bucket.length === batchSize) {
        cb(null, bucket)
        bucket = []
      } else {
        cb()
      }
    },
    flush(cb) {
      if (bucket.length > 0) {
        cb(null, bucket)
      } else {
        cb()
      }
    },
    objectMode: true
  })
}

module.exports = createBatch
