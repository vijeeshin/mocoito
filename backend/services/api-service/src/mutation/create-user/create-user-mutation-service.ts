import { UserStatus } from '../../schema/user-status/user-status-enum'
import { hashPassword } from '@mocoito/auth'

class CreateUserInput {
  name!: string
  email!: string
  password!: string
}

export default async function createUser(
  context: HGContext,
  input: CreateUserInput,
): Promise<User> {
  const { userRepository } = context.repositories
  const { name, email, password } = input
  return userRepository.insert({
    name,
    email,
    password: await hashPassword(password),
    status: UserStatus.CREATED,
  })
}
