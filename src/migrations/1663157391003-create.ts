import { MigrationInterface, QueryRunner } from "typeorm";

export class create1663157391003 implements MigrationInterface {
    name = 'create1663157391003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "CNPJ" character varying NOT NULL, "cidade_estado" character varying NOT NULL, "qtde_funcionarios" character varying NOT NULL, "email" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6940517754783385e01836d2508" UNIQUE ("CNPJ"), CONSTRAINT "UQ_d0af6f5866201d5cb424767744a" UNIQUE ("email"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vacancies_skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "excel" boolean DEFAULT false, "javascript" boolean DEFAULT false, "react" boolean DEFAULT false, "css" boolean DEFAULT false, "html" boolean DEFAULT false, "express" boolean DEFAULT false, "docker" boolean DEFAULT false, CONSTRAINT "PK_0bcf9ef74452e597cb338c037f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vacancies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "salary" numeric NOT NULL, "description" character varying NOT NULL, "companyId" uuid, "vacancySkillsId" uuid, CONSTRAINT "REL_025a2dc5adf4f5cc0b3cf8e0e2" UNIQUE ("vacancySkillsId"), CONSTRAINT "PK_3b45154a366568190cc15be2906" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "interviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "hour" TIME NOT NULL, "isOver" boolean NOT NULL DEFAULT false, "feedback" character varying, "userId" uuid, "vacancyId" uuid, CONSTRAINT "PK_fd41af1f96d698fa33c2f070f47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "excel" boolean DEFAULT false, "javascript" boolean DEFAULT false, "react" boolean DEFAULT false, "css" boolean DEFAULT false, "html" boolean DEFAULT false, "express" boolean DEFAULT false, "docker" boolean DEFAULT false, CONSTRAINT "PK_4d0a72117fbf387752dbc8506af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "CPF" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userSkillsId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_954a4b53f7bc859b195a27e1a77" UNIQUE ("CPF"), CONSTRAINT "REL_f70331c3a8d42f89ca66f1157a" UNIQUE ("userSkillsId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean, "valid" date, "userId" uuid, "vacancyId" uuid, CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD CONSTRAINT "FK_2dd0d503a15a202a738deaeb22a" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD CONSTRAINT "FK_025a2dc5adf4f5cc0b3cf8e0e2a" FOREIGN KEY ("vacancySkillsId") REFERENCES "vacancies_skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interviews" ADD CONSTRAINT "FK_7dc8fd9874e2aff21ef778ad5ab" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interviews" ADD CONSTRAINT "FK_4396770832be1e75b039bfb27d9" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f70331c3a8d42f89ca66f1157ad" FOREIGN KEY ("userSkillsId") REFERENCES "user_skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_90ad8bec24861de0180f638b9cc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_5707a4abd8063c6494064d22d05" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_5707a4abd8063c6494064d22d05"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_90ad8bec24861de0180f638b9cc"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f70331c3a8d42f89ca66f1157ad"`);
        await queryRunner.query(`ALTER TABLE "interviews" DROP CONSTRAINT "FK_4396770832be1e75b039bfb27d9"`);
        await queryRunner.query(`ALTER TABLE "interviews" DROP CONSTRAINT "FK_7dc8fd9874e2aff21ef778ad5ab"`);
        await queryRunner.query(`ALTER TABLE "vacancies" DROP CONSTRAINT "FK_025a2dc5adf4f5cc0b3cf8e0e2a"`);
        await queryRunner.query(`ALTER TABLE "vacancies" DROP CONSTRAINT "FK_2dd0d503a15a202a738deaeb22a"`);
        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_skills"`);
        await queryRunner.query(`DROP TABLE "interviews"`);
        await queryRunner.query(`DROP TABLE "vacancies"`);
        await queryRunner.query(`DROP TABLE "vacancies_skills"`);
        await queryRunner.query(`DROP TABLE "companies"`);
    }

}
