import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm'

import UserModel from '../User/UserModel'

@Entity('tweets')
export default class TweetModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @ManyToOne(() => UserModel, (user) => user.files)
  user: UserModel

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
