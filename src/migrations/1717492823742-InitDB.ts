import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1717492823742 implements MigrationInterface {
    name = 'InitDB1717492823742'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`INSERT INTO department (name) VALUES
        ('HR'),
        ('PS'),
        ('admin');`);

        await queryRunner.query(`INSERT INTO employee (name, salary, "departmentId") VALUES
        ('Timber', '926', 2),
        ('Phantom', '1833', 1),
        ('Iva', '4926', 2),
        ('Lucind', '2970', 1),
        ('Jonatha', '3311', 1),
        ('Kevi', '6729', 1),
        ('Mar', '6699', 2),
        ('Zachar', '5057', 1),
        ('Olivi', '5570', 1),
        ('Rick', '5364', 2),
        ('Deli', '2043', 1),
        ('Susa', '4600', 1),
        ('Christophe', '6625', 2),
        ('Michae', '4573', 1),
        ('Scot', '4885', 1),
        ('Stell', '6262', 2),
        ('Pete', '4635', 1),
        ('Id', '6562', 1),
        ('Ja', '5643', 2),
        ('Lil', '125', 1),
        ('Hetti', '7238', 3);`);

        await queryRunner.query(`INSERT INTO "user" (username, password, "employeeId") VALUES
        ('test', '$2a$10$tIrV7ICuic0t4aIl446VWOQPpXlIVRKGUT0Zw9RLmSMTRrcloMCWS', 13),
        ('E2E', '$2a$10$NpzP41TdQGC5oYzapJiiu.4ZJvIKJZ2H36sW0hdzzrS7dx6/my/Pa', 21),
        ('HROnly', '$2a$10$aUWMPgzH1E8r6i6GN/25xu2PlmrJOl5qfWpOgWPjSTGGRjMqTjpla', 2);`);

        // test : abc123
        // E2E : cypress
        // HROnly : abcdef123

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user"`);
        await queryRunner.query(`DELETE FROM "employee"`);
        await queryRunner.query(`DELETE FROM "department"`);
    }

}
