import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { User } from '../../schema/user/user-schema'
import { CreateUserInput } from './create-user-mutation-input'
import createUser from './create-user-mutation-service'

@Resolver()
export class CreateUserMutationResolver {
  @Mutation(() => User)
  async createUser(
    @Ctx()
    context: HGContext,

    @Arg('input')
    input: CreateUserInput,
  ) {
    return createUser(context, input)
  }
}
