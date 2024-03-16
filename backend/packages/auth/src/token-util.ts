import { hkdf } from '@panva/hkdf'
import { EncryptJWT, jwtDecrypt, JWTPayload } from 'jose'
import { v4 as uuid } from 'uuid'
const DEFAULT_SECRET = 'MaMTawNA5CsMcl4ddVCQGGZg0bZ9ravzQdE7AltuCuFUNxhtLi'

export async function generateKey(secret?: string) {
  return await hkdf('sha256', secret ?? DEFAULT_SECRET, '', 'AUTH_TOKEN_ENCRYPTION', 32)
}

export interface EncodeAuthTokenOptions {
  token: Record<string, string | string[]>
  secret?: string
  maxAgeInSeconds?: number
}

export async function encodeAuthToken({
  token,
  secret = process.env.TOKEN_SECRET,
  maxAgeInSeconds = expirationToSeconds(),
}: EncodeAuthTokenOptions) {
  const now = () => (Date.now() / 1000) | 0
  return await new EncryptJWT(token)
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt()
    .setExpirationTime(now() + maxAgeInSeconds)
    .setJti(uuid())
    .encrypt(await generateKey(secret))
}

export interface DecodeAuthTokenOptions {
  token: string
  secret?: string
}

export async function decodeAuthToken<T extends JWTPayload>({
  token,
  secret = process.env.TOKEN_SECRET,
}: DecodeAuthTokenOptions): Promise<T | null> {
  if (!token) return null
  const encryptionSecret = await generateKey(secret)
  const { payload } = await jwtDecrypt(token, encryptionSecret, {
    clockTolerance: 15,
  })
  return payload as T
}

export function expirationToSeconds(expiry = '1h') {
  let seconds = 0
  const timeRegex = /^(\d+)([d|h|m|s])$/
  const matches = expiry.match(timeRegex)
  if (matches && matches.length === 3) {
    const value = parseInt(matches[1], 10)
    const unit = matches[2]
    switch (unit) {
      case 'd':
        seconds = value * 24 * 60 * 60
        break
      case 'h':
        seconds = value * 60 * 60
        break
      case 'm':
        seconds = value * 60
        break
      case 's':
        seconds = value
        break
      default:
        seconds = 0
    }
  } else {
    throw new Error('Invalid expiration time')
  }
  return seconds
}
