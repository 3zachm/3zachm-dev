-- AlterTable
ALTER TABLE `logs` ADD COLUMN `badges` VARCHAR(128) NULL,
    ADD COLUMN `mod` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `sub` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `turbo` BOOLEAN NOT NULL DEFAULT false;
