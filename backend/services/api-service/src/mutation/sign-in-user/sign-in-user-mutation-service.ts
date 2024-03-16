import { UserStatus } from '../../schema/user-status/user-status-enum'
import { compareHashedPassword, encodeAuthToken, expirationToSeconds } from '@mocoito/auth'

class SignInUserResponse {
  accessToken!: string
  refreshToken!: string
  user!: User
}

export default async function signInUser(
  context: HGContext,
  email: string,
  password: string,
): Promise<SignInUserResponse> {
  const { userRepository } = context.repositories
  const user = await userRepository.findOne(query => query.whereEqualTo('email', email))
  if (!user || !(await compareHashedPassword(password, user.password))) {
    throw new Error(
      'Unable to verify the user. The provided email or password is invalid. Please double-check your credentials and try again.  ',
    )
  }
  const tokenPayload = { userId: user.id, userRoles: ['User'] }
  const accessToken = await encodeAuthToken({
    token: tokenPayload,
    secret: process.env.TOKEN_SECRET,
    maxAgeInSeconds: expirationToSeconds(process.env.TOKEN_EXPIRY),
  })
  const refreshToken = await encodeAuthToken({
    token: tokenPayload,
    secret: process.env.REFRESH_TOKEN_SECRET,
    maxAgeInSeconds: expirationToSeconds(process.env.REFRESH_TOKEN_EXPIRY),
  })
  await userRepository.update({
    id: user.id,
    status: UserStatus.ACTIVE,
  })
  return { accessToken, refreshToken, user }
}
