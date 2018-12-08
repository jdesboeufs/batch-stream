const test = require('ava')
const getStream = require('get-stream').array
const intoStream = require('into-stream').obj
const batchify = require('.')

function runThroughPipe(input, batchSize = 2) {
  return getStream(intoStream(input).pipe(batchify(batchSize)))
}

test('empty stream', async t => {
  const result = await runThroughPipe([])
  t.deepEqual(result, [])
})

test('stream with a single item', async t => {
  const result = await runThroughPipe(['foo'])
  t.deepEqual(result, [['foo']])
})

test('stream with item number === batchSize', async t => {
  const result = await runThroughPipe(['foo', 'bar'])
  t.deepEqual(result, [['foo', 'bar']])
})

test('stream with item number >= batchSize', async t => {
  const result = await runThroughPipe(['foo', 'bar', 'baz'])
  t.deepEqual(result, [['foo', 'bar'], ['baz']])
})

test('stream with more items', async t => {
  const result = await runThroughPipe(['foo', 'bar', 'baz', 'boo', 'crop', 'stud'])
  t.deepEqual(result, [['foo', 'bar'], ['baz', 'boo'], ['crop', 'stud']])
})

test('no batchSize given', t => {
  t.throws(() => batchify())
})
