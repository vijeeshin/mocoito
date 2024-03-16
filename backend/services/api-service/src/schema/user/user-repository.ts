import { FirestoreRepository } from '@hgraph/storage'
import { User } from './user-schema'

export class UserRepository extends FirestoreRepository<User> {
  constructor() {
    super(User)
  }
}
