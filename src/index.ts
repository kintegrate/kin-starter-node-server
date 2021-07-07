import { main } from './main'

main()
  .then((code) => process.exit())
  .catch((e) => console.error(`An error occurred:`, e))
