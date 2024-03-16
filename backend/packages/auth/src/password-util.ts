import bcrypt from 'bcrypt'

export async function hashPassword(password: string) {
  return bcrypt.hash(password, parseInt(process.env.PASSWORD_SLAT_ROUNDS ?? '10'))
}

export async function compareHashedPassword(password: string, hash: string | undefined) {
  if (!hash) return false
  return bcrypt.compare(password, hash)
}
