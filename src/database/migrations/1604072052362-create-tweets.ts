import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createTweets1604072052362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tweets',

        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true },

          { name: 'userId', type: 'int', isNullable: false },

          { name: 'text', type: 'varchar', isNullable: false, length: '280' },

          { name: 'createdAt', type: 'timestamp', default: 'now()' },

          { name: 'updatedAt', type: 'timestamp', default: 'now()' },

          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
    )

    await queryRunner.createForeignKey(
      'tweets',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tweets')
  }
}
