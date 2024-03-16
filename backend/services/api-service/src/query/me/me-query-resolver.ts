import { Ctx, Query, Resolver } from 'type-graphql'
import { User } from '../../schema/user/user-schema'
import fetchMe from './me-query-service'

@Resolver()
export class MeQueryResolver {
  @Query(() => User, { nullable: true })
  async me(
    @Ctx()
    context: HGContext,
  ) {
    return fetchMe(context)
  }
}
