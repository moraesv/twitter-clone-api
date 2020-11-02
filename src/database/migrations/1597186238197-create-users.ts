import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createUsers1597185323053 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
          { name: 'name', type: 'varchar' },
          { name: 'username', type: 'varchar' },
          { name: 'email', type: 'varchar' },
          { name: 'passwordHash', type: 'varchar' },
          { name: 'birthDate', type: 'timestamp' },
          { name: 'bio', type: 'varchar', isNullable: true },
          { name: 'location', type: 'varchar', isNullable: true },
          { name: 'website', type: 'varchar', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user')
  }
}
