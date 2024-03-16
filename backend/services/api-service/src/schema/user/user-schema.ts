import { BaseEntity } from '@hgraph/storage'
import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { UserStatus } from '../user-status/user-status-enum'

@ObjectType('User')
@Entity('user')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id!: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  password?: string

  @Field(() => UserStatus, { nullable: true })
  @Column({ nullable: true, type: 'enum', enum: UserStatus })
  status?: UserStatus
}
