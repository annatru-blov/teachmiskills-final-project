import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1769892167520 implements MigrationInterface {
    name = 'CreateUser1769892167520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "eventId" uuid, CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_820afc8f2f05a0bb2aa9d4494d" ON "subscriptions" ("userId", "eventId") `);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'DRAFT', "authorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_2dab1a1c63ff25f08fff8149c5d" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_96ce126fb3f1b5368f8e3c02989" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_96ce126fb3f1b5368f8e3c02989"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_2dab1a1c63ff25f08fff8149c5d"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_820afc8f2f05a0bb2aa9d4494d"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
    }

}
