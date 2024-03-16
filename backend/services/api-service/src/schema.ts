import { makeExecutableSchema } from '@graphql-tools/schema'
import { authChecker } from '@hgraph/graphql'
import { sync } from 'glob'
import { reduceAsync } from 'tsds-tools'
import { buildTypeDefsAndResolvers } from 'type-graphql'
const isNotFieldResolver = ({ name }: any) => !/FieldResolver$/.test(name ?? '')
const importResolvers = async (file: string) =>
  Object.values(await import(file)).filter(isNotFieldResolver)

async function getResolvers(resolverPath: string) {
  return await reduceAsync(
    sync(resolverPath),
    async (resolvers: any, file: string) => [...resolvers, ...(await importResolvers(file))],
    [] as any[],
  )
}

export async function createSchema(resolverPath = `${__dirname}/**/*-resolver.js`) {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: (await getResolvers(resolverPath)) as any,
    authChecker: authChecker as any,
    authMode: 'null',
  })
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  return { schema, typeDefs, resolvers }
}
void (async () => {
  process.argv[2] === '--print'
    ? console.log((await createSchema(`${__dirname}/**/*-resolver.ts`)).typeDefs)
    : null
})()
