import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createUserFollowing1604288381085 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usersFollowers',

        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true },

          { name: 'userId', type: 'int', isNullable: false },

          { name: 'followerId', type: 'int', isNullable: false },

          { name: 'createdAt', type: 'timestamp', default: 'now()' },

          { name: 'updatedAt', type: 'timestamp', default: 'now()' },

          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
    )

    await queryRunner.createForeignKey(
      'usersFollowers',

      new TableForeignKey({
        columnNames: ['userId'],

        referencedTableName: 'users',

        referencedColumnNames: ['id'],
      }),
    )

    await queryRunner.createForeignKey(
      'usersFollowers',

      new TableForeignKey({
        columnNames: ['followerId'],

        referencedTableName: 'users',

        referencedColumnNames: ['id'],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usersFollowers')
  }
}
