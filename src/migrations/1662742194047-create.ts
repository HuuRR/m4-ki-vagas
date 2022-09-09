import { MigrationInterface, QueryRunner } from "typeorm";

export class create1662742194047 implements MigrationInterface {
    name = 'create1662742194047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_954a4b53f7bc859b195a27e1a77"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "CPF"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "CPF" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_954a4b53f7bc859b195a27e1a77" UNIQUE ("CPF")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_954a4b53f7bc859b195a27e1a77"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "CPF"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "CPF" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_954a4b53f7bc859b195a27e1a77" UNIQUE ("CPF")`);
    }

}
