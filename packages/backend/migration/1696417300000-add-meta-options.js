/*
 * SPDX-FileCopyrightText: syuilo and misskey-project & Nekoboshi_Suiren&Popmix Group and Acuaskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class AddMetaOptions1696417300000 {
    name = 'AddMetaOptions1696417300000'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ADD "skipVersion" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "meta" ADD "skipAcuaskeyVersion" character varying(32)`, undefined);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "skipVersion"`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "skipAcuaskeyVersion"`);
    }
}
