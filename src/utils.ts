export const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))
export const randomId = (size = 5) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
