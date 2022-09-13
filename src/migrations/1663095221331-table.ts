import { MigrationInterface, QueryRunner } from "typeorm";

export class table1663095221331 implements MigrationInterface {
    name = 'table1663095221331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "validDate"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "valid" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "applications" ALTER COLUMN "isActive" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" ALTER COLUMN "isActive" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ALTER COLUMN "isActive" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "applications" ALTER COLUMN "isActive" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "valid"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "validDate" TIMESTAMP NOT NULL`);
    }

}
