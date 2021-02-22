import { main } from './main'

main()
  .then((code) => process.exit(code))
  .catch((e) => console.error(`An error occurred:`, e))
