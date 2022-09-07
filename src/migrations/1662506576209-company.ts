import { MigrationInterface, QueryRunner } from "typeorm";

export class company1662506576209 implements MigrationInterface {
    name = 'company1662506576209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD "isActive" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "isActive"`);
    }

}
