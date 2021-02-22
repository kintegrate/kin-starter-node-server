import { Environment, quarksToKin, TransactionType } from '@kinecosystem/kin-sdk-v2'
import { Kin } from './kin'
import { sleep } from './utils'

export async function main(): Promise<number> {
  const kin = new Kin(Environment.Test)

  const alicePrivateKey = Kin.generateKey()
  console.log(`Public Key Alice    ${alicePrivateKey.publicKey().toBase58()}`)

  const aliceTokenAccounts = await kin.createAccount(alicePrivateKey)

  for (const tokenAccount of aliceTokenAccounts) {
    console.log(`Token Account Alice ${tokenAccount.toBase58()}`)
  }

  const bobPrivateKey = Kin.generateKey()
  console.log(`Public Key Bob      ${bobPrivateKey.publicKey().toBase58()}`)
  const bobTokenAccounts = await kin.createAccount(bobPrivateKey)

  for (const tokenAccount of bobTokenAccounts) {
    console.log(`Token Account Bob   ${tokenAccount.toBase58()}`)
  }

  async function sleepAndPrintBalances() {
    console.log('Sleeping for a bit...')
    await sleep(15)
    await kin.getBalance(alicePrivateKey.publicKey()).then((b) => {
      console.log(`Balance for Alice:  ${quarksToKin(b)} Kin`)
    })
    await kin.getBalance(bobPrivateKey.publicKey()).then((b) => {
      console.log(`Balance for Bob:    ${quarksToKin(b)} Kin`)
    })
  }

  await sleepAndPrintBalances()

  console.log('Request Airdrop for Alice')
  await kin.requestAirdrop(aliceTokenAccounts[0], '10')

  console.log('Request Airdrop for Bob')
  await kin.requestAirdrop(bobTokenAccounts[0], '10')

  await sleepAndPrintBalances()

  console.log('Submitting Payment from Alice to Bob')
  await kin.submitPayment(alicePrivateKey, bobPrivateKey.publicKey(), '2', TransactionType.Earn, 'My demo payment')

  await sleepAndPrintBalances()

  console.log('Done!')
  return 0
}
