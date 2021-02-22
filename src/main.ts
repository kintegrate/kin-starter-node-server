import { randomId, sleep } from './utils'

export async function main(): Promise<number> {
  const rand = randomId()
  await Promise.all([
    sleep(1000).then(() => console.log(rand + ' I slept for 1000 ms')),
    sleep(2000).then(() => console.log(rand + ' I slept for 2000 ms')),
    sleep(1500).then(() => console.log(rand + ' I slept for 1500 ms')),
    sleep(500).then(() => console.log(rand + ' I slept for 500 ms')),
  ])

  console.log('Done!')
  return 0
}
