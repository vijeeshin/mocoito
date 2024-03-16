import { Field, ObjectType } from 'type-graphql'
import { User } from '../../schema/user/user-schema'

@ObjectType()
export class SignInUserResponse {
  @Field()
  accessToken!: string

  @Field()
  refreshToken!: string

  @Field(() => User)
  user?: User
}
