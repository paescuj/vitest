import { unlink, writeFile } from 'node:fs'
import { beforeEach, describe, expect, it } from 'vitest'

import { runVitest } from '../../test-utils'

async function run() {
  return runVitest({
    include: ['tests/related.test.ts'],
    forceRerunTriggers: ['**/rerun.temp/**'],
    changed: true,
  })
}

const fileName = 'rerun.temp'

describe('forceRerunTrigger', () => {
  beforeEach(async () => {
    unlink(fileName, () => {})
  })

  it('should run the whole test suite if file exists', async () => {
    writeFile(fileName, '', () => {})
    const { stdout } = await run()
    expect(stdout).toContain('1 passed')
  }, 60_000)

  it('should run no tests if file does not exist', async () => {
    const { stdout } = await run()
    expect(stdout).toContain('No test files found, exiting with code 0')
  }, 60_000)
})
