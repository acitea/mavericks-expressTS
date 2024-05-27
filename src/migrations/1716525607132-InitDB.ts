import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1716525607132 implements MigrationInterface {
    name = 'InitDB1716525607132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "employeeId" integer, CONSTRAINT "REL_ab4a80281f1e8d524714e00f38" UNIQUE ("employeeId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ab4a80281f1e8d524714e00f38f" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ab4a80281f1e8d524714e00f38f"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
