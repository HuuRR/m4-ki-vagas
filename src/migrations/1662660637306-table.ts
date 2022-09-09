import { MigrationInterface, QueryRunner } from "typeorm";

export class table1662660637306 implements MigrationInterface {
    name = 'table1662660637306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "cpf" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_230b925048540454c8b4c481e1c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
    }

}
