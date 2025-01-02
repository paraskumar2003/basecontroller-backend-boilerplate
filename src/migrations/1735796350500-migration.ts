import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735796350500 implements MigrationInterface {
    name = 'Migration1735796350500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`age\` varchar(3) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`age\``);
    }

}
