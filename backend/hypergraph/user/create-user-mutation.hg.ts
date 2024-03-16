import { hashPassword } from '@mocoito/auth'

class CreateUserInput {
  name!: string
  email!: string
  password!: string
}

async function createUser(input: CreateUserInput): Promise<User> {
  const { userRepository } = context.repositories
  const { name, email, password } = input
  return userRepository.insert({
    name,
    email,
    password: await hashPassword(password),
    status: UserStatus.CREATED,
  })
}
export default createMutation(createUser, { authorized: false })
