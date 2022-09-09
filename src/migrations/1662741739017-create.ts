import { MigrationInterface, QueryRunner } from "typeorm";

export class create1662741739017 implements MigrationInterface {
    name = 'create1662741739017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "interviews" DROP CONSTRAINT "FK_ba8ac08d4251a51327e24214aec"`);
        await queryRunner.query(`ALTER TABLE "interviews" RENAME COLUMN "vancancyId" TO "vacancyId"`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "excel" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "excel" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "javascript" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "javascript" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "react" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "react" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "css" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "css" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "html" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "html" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "express" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "express" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "docker" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "docker" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "interviews" ADD CONSTRAINT "FK_4396770832be1e75b039bfb27d9" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "interviews" DROP CONSTRAINT "FK_4396770832be1e75b039bfb27d9"`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "docker" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "docker" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "express" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "express" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "html" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "html" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "css" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "css" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "react" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "react" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "javascript" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "javascript" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "excel" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vacancies_skills" ALTER COLUMN "excel" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "interviews" RENAME COLUMN "vacancyId" TO "vancancyId"`);
        await queryRunner.query(`ALTER TABLE "interviews" ADD CONSTRAINT "FK_ba8ac08d4251a51327e24214aec" FOREIGN KEY ("vancancyId") REFERENCES "vacancies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
