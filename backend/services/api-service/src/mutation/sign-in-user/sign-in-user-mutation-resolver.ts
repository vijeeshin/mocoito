import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { SignInUserResponse } from './sign-in-user-mutation-response'
import signInUser from './sign-in-user-mutation-service'

@Resolver()
export class SignInUserMutationResolver {
  @Mutation(() => SignInUserResponse)
  async signInUser(
    @Ctx()
    context: HGContext,

    @Arg('email')
    email: string,

    @Arg('password')
    password: string,
  ) {
    return signInUser(context, email, password)
  }
}
