import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'
import FileModel from '../File/FileModel'

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
  birthDate: Date

  @OneToMany(() => FileModel, (file) => file.user)
  files: FileModel[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
