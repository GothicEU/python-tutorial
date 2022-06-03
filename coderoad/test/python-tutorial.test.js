const assert = require('assert')
const fs = require('fs')
const util = require('util')
const path = require('path')

const readdir = util.promisify(fs.readdir)
const getRootDir = async (dir = process.cwd()) => {
  const pathToRoot = path.join(dir, '..')
  const rootDir = await readdir(pathToRoot)

  if (!rootDir) {
    throw new Error(`Could not find folder ${pathToRoot}`)
  }

  return rootDir
}

describe('python-tutorial folder', () => {
  let rootDir
  before(async () => {
    rootDir = await getRootDir()
  })

  it('should have an hello.py file', async () => {
    assert(rootDir.indexOf('hello.py') >= 0)
  })
})

const readFile = util.promisify(fs.readFile)
const getIndexFile = async (dir = process.cwd()) => {
  const pathToIndex = path.join(dir, '..', 'hello.py')
  const indexFile = await readFile(pathToIndex)

  if (!indexFile) {
    throw new Error(`Could not find ${pathToIndex}`)
  }
  return indexFile
}

describe('hello.py', () => {
  let indexFile
  before(async () => {
    indexFile = await getIndexFile()
  })

  it('should have a code', () => {
    assert(/print\(\"hello, world\"\)/i.test(indexFile) || /print\(\'hello, world\'\)/i.test(indexFile))
  })
})