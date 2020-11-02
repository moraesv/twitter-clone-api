import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createTweetsFiles1604175332958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tweetsFiles',

        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true },

          { name: 'tweetId', type: 'int', isNullable: false },

          { name: 'fileId', type: 'int', isNullable: false },

          { name: 'createdAt', type: 'timestamp', default: 'now()' },

          { name: 'updatedAt', type: 'timestamp', default: 'now()' },

          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
    )

    await queryRunner.createForeignKey(
      'tweetsFiles',

      new TableForeignKey({
        columnNames: ['tweetId'],

        referencedTableName: 'tweets',

        referencedColumnNames: ['id'],
      }),
    )

    await queryRunner.createForeignKey(
      'tweetsFiles',

      new TableForeignKey({
        columnNames: ['fileId'],

        referencedTableName: 'files',

        referencedColumnNames: ['id'],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tweetsFiles')
  }
}
