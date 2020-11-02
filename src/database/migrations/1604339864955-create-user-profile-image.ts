import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class createUserProfileImage1604339864955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({ name: 'profileImgId', type: 'int', isNullable: true }))

    await queryRunner.createForeignKey(
      'users',

      new TableForeignKey({
        columnNames: ['profileImgId'],

        referencedTableName: 'files',

        referencedColumnNames: ['id'],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'profileImgId')

    await queryRunner.dropColumn('users', 'profileImgId')
  }
}
