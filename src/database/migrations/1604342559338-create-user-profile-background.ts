import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class createUserProfileBackground1604342559338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({ name: 'profileBackgroundId', type: 'int', isNullable: true }),
    )

    await queryRunner.createForeignKey(
      'users',

      new TableForeignKey({
        columnNames: ['profileBackgroundId'],

        referencedTableName: 'files',

        referencedColumnNames: ['id'],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'profileBackgroundId')

    await queryRunner.dropColumn('users', 'profileBackgroundId')
  }
}
