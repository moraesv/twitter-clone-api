import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import FileModel from '../File/FileModel'
import TweetModel from '../Tweet/TweetModel'

@Entity('users')
export default class UserModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  username: string

  @Column()
  email: string

  password: string

  passwordConfirm: string

  @Column()
  passwordHash: string

  @Column()
  bio: string

  @Column()
  location: string

  @Column()
  website: string

  @Column()
  birthDate: Date

  @OneToMany(() => FileModel, (file) => file.user)
  files: FileModel[]

  @OneToMany(() => TweetModel, (tweet) => tweet.user)
  tweets: TweetModel[]

  @ManyToMany(() => UserModel, (user) => user.following)
  @JoinTable({ name: 'usersFollowers', joinColumn: { name: 'userId' }, inverseJoinColumn: { name: 'followerId' } })
  followers: UserModel[]

  @ManyToMany(() => UserModel, (user) => user.followers)
  following: UserModel[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
