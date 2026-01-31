import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1769894955424 implements MigrationInterface {
    name = 'CreateUser1769894955424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, "userId" character varying NOT NULL, "eventId" character varying NOT NULL, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notifications"`);
    }

}
