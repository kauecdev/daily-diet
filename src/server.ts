import fastify from 'fastify'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
  return 'Hello'
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log('Http server running'))
