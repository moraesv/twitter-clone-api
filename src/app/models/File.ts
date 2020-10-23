import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm'
import User from './User'

@Entity('files')
export default class File {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.files)
  user: User

  @Column()
  name: string

  @Column()
  mimeType: string

  @Column()
  size: number

  @Column()
  temporary: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
