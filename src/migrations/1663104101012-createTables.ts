import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1663104101012 implements MigrationInterface {
    name = 'createTables1663104101012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "valid"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "valid" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "valid"`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD "valid" character varying NOT NULL`);
    }

}
