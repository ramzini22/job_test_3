import { MigrationInterface, QueryRunner } from "typeorm";

export class init1703972237432 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE table auth_user
      (
          id                 serial primary key,
          login              TEXT     NOT NULL,
          fingerprint        TEXT     NOT NULL,
          ip_address         INT     NOT NULL,
          created_at         timestamp default timezone('UTC', NOW()) not null,
          updated_at         timestamp
      );

      CREATE INDEX auth_user_loginx ON auth_user (login);

      CREATE UNIQUE INDEX auth_user_unique_idx ON auth_user (login, fingerprint, ip_address);

        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP table auth_user
        `);
  }
}
