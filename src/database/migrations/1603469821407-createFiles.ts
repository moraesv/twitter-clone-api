import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createFiles1603469821407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'files',

        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true },

          { name: 'userId', type: 'int', isNullable: false },

          { name: 'name', type: 'varchar', isNullable: false },

          { name: 'mimeType', type: 'varchar', isNullable: false },

          { name: 'size', type: 'int', isNullable: false },

          { name: 'temporary', type: 'boolean', isNullable: false, default: true },

          { name: 'createdAt', type: 'timestamp', default: 'now()' },

          { name: 'updatedAt', type: 'timestamp', default: 'now()' },

          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
    )

    await queryRunner.createForeignKey(
      'files',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user')
  }
}
