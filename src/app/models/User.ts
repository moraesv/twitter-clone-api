import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity('user')
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  passwordHash: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
