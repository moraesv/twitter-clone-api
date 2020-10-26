import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  AfterLoad,
} from 'typeorm'

import appConfig from '../config/appConfig'

import UserModel from './UserModel'

@Entity('files')
export default class FileModel {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserModel, (user) => user.files)
  user: UserModel

  @Column()
  filename: string

  @Column()
  mimetype: string

  @Column()
  size: number

  @Column()
  temporary: boolean

  public url: string

  @AfterLoad()
  getUrl() {
    this.url = `${appConfig.fullUrl}/uploads/${this.filename}`
  }

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
