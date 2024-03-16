import { config } from 'dotenv'
import 'reflect-metadata'
config({ path: '.env.container' })
import { decodeAuthToken } from '@mocoito/auth'
import { createGQLContext } from '@hgraph/graphql'
import { createRepositoryResolver, initializeFirestore, resolveRepositories } from '@hgraph/storage'
import { ApolloServer } from 'apollo-server-cloud-functions'
import type { Request, Response } from 'express'
import { onRequest } from 'firebase-functions/v2/https'
import { resolve } from 'path'
import { createSchema } from './schema'
type Handler = (request: Request, response: Response) => void | Promise<void>
let handler: Handler = () => undefined
void (async () => {
  const { schema } = await createSchema()
  const context = createGQLContext(
    async token => decodeAuthToken({ token, secret: process.env.TOKEN_SECRET ?? '' }),
    createRepositoryResolver,
  )
  const server = new ApolloServer({ schema, context })
  handler = server.createHandler() as any
  await resolveRepositories([`${__dirname}/**/*-repository.js`])
  await initializeFirestore({ serviceAccountConfig: resolve('firebase-service-account.json') })
})()

export const graphql = onRequest(
  { ingressSettings: 'ALLOW_ALL' },
  async (request: Request, response: Response) => {
    return handler(request, response)
  },
)
