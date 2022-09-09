import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1662659077849 implements MigrationInterface {
    name = 'createTables1662659077849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "excel" boolean DEFAULT false, "javascript" boolean DEFAULT false, "react" boolean DEFAULT false, "css" boolean DEFAULT false, "html" boolean DEFAULT false, "express" boolean DEFAULT false, "docker" boolean DEFAULT false, CONSTRAINT "PK_4d0a72117fbf387752dbc8506af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vacancies_skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "excel" boolean NOT NULL, "javascript" boolean NOT NULL, "react" boolean NOT NULL, "css" boolean NOT NULL, "html" boolean NOT NULL, "express" boolean NOT NULL, "docker" boolean NOT NULL, CONSTRAINT "PK_0bcf9ef74452e597cb338c037f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_230b925048540454c8b4c481e1c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "CPF" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_954a4b53f7bc859b195a27e1a77" UNIQUE ("CPF")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userSkillsId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_f70331c3a8d42f89ca66f1157ad" UNIQUE ("userSkillsId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f70331c3a8d42f89ca66f1157ad" FOREIGN KEY ("userSkillsId") REFERENCES "user_skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f70331c3a8d42f89ca66f1157ad"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_f70331c3a8d42f89ca66f1157ad"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userSkillsId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_954a4b53f7bc859b195a27e1a77"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "CPF"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cpf" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf")`);
        await queryRunner.query(`DROP TABLE "vacancies_skills"`);
        await queryRunner.query(`DROP TABLE "user_skills"`);
    }

}
