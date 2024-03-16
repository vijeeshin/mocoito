export default async function me(context: HGContext): Promise<User | null> {
  const { userId } = context
  const { userRepository } = context.repositories
  if (!userId) return null
  return await userRepository.findById(userId)
}
