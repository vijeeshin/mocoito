async function me(): Promise<User | null> {
  const { userId } = context
  const { userRepository } = context.repositories
  if (!userId) return null
  return await userRepository.findById(userId)
}
export default createQuery(me, { authorized: false })
