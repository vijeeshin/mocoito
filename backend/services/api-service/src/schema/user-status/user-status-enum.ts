import { registerEnumType } from 'type-graphql'

export enum UserStatus {
  CREATED = 'CREATED',
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}
registerEnumType(UserStatus, { name: 'UserStatus' })
