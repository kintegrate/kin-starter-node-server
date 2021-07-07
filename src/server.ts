import { Environment } from '@kinecosystem/kin-sdk-v2'
import { CreateAccountHandler, EventsHandler, SignTransactionHandler } from '@kinecosystem/kin-sdk-v2/dist/webhook'
import * as dotenv from 'dotenv'
import express, { json } from 'express'

dotenv.config()

export async function main() {
  const env = Environment.Test
  const PORT = process.env.PORT || '7890'
  const SECRET = process.env.KIN_WEBHOOK_SECRET

  const app = express()
  app.use(json())

  app.use(
    '/api/kin/create-account',
    CreateAccountHandler(
      env,
      (req, resp) => {
        const owner = req.creation.owner
        const address = req.creation.address
        console.log('CreateAccount:', {
          owner: owner.toBase58(),
          tokenAccount: address.toBase58(),
        })
      },
      SECRET,
    ),
  )
  app.use(
    '/api/kin/transaction-events',
    EventsHandler((events) => {
      console.log('Event', events)
    }, SECRET),
  )

  app.use(
    '/api/kin/sign-transaction',
    SignTransactionHandler(
      env,
      (req, resp) => {
        console.log('sign', req)
      },
      SECRET,
    ),
  )
  app.use('/', (req, res) => {
    console.log(req.url)
    const result = { uptime: process.uptime() }
    console.log('Uptime', result)
    res.json(result)
  })

  app.listen(Number(PORT), '0.0.0.0').on('listening', () => {
    console.log(`🎧 Listening on port ${PORT}`)
  })
}

main().catch((e) => console.error(`An error occurred:`, e))
