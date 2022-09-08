import { MigrationInterface, QueryRunner } from "typeorm";

export class alter1662649843941 implements MigrationInterface {
    name = 'alter1662649843941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_skills" ALTER COLUMN "excel" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_skills" ALTER COLUMN "javascript" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_skills" ALTER COLUMN "react" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_skills" ALTER COLUMN "css" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_skills" ALTER COLUMN "html" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_skills" ALTER COLUMN "express" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_skills" ALTER COLUMN "docker" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_skills" ALTER COLUMN "docker" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_skills" ALTER COLUMN "express" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_skills" ALTER COLUMN "html" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_skills" ALTER COLUMN "css" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_skills" ALTER COLUMN "react" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_skills" ALTER COLUMN "javascript" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_skills" ALTER COLUMN "excel" DROP DEFAULT`);
    }

}
