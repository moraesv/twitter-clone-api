import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import UserModel from '../User/UserModel'
import FileModel from '../File/FileModel'

@Entity('tweets')
export default class TweetModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @ManyToOne(() => UserModel, (user) => user.files)
  user: UserModel

  @ManyToMany(() => FileModel)
  @JoinTable({ name: 'tweetsFiles', joinColumn: { name: 'tweetId' }, inverseJoinColumn: { name: 'fileId' } })
  files: FileModel[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
