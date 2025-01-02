import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1735796714790 implements MigrationInterface {
    name = 'UserEntity1735796714790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`hasVehicle\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`hasVehicle\``);
    }

}