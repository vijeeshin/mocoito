import { PaginationInput } from '@hgraph/graphql'
import { Repository } from '@hgraph/storage'

export declare global {
  export declare interface User {
    status?: UserStatus
    name?: string
    email?: string
    password?: string
    id: string
  }

  export declare enum UserStatus {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
    CREATED = 'CREATED',
  }

  export declare interface Repositories {
    userRepository: Repository<User>
  }

  export declare interface ResolverOptions {
    authorized?: boolean | string
  }

  export declare function createQuery(
    callback: (...any: any[]) => Promise<any>,
    options?: ResolverOptions,
  )

  export declare function createMutation(
    callback: (...any: any[]) => Promise<any>,
    options?: ResolverOptions,
  )

  export declare function By(foreignKey: string): PropertyDecorator

  export declare function CompositeId(foreignKey?: string): PropertyDecorator

  export declare function Float(): PropertyDecorator

  export declare interface HGContext {
    repositories: Repositories
    userId?: string
    pagination?: PaginationInput
    withPagination: (pagination?: PaginationInput) => HGContext
  }

  export declare const context: HGContext

  export declare interface Paginated<T> {
    next?: string | null
    items: T[]
  }
}
