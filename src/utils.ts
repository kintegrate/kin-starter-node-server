export const sleep = (seconds = 1) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))
export const randomId = (size = 5) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
