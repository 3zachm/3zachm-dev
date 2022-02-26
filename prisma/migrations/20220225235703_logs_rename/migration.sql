-- AlterTable
ALTER TABLE `logs` RENAME COLUMN `mod` to `isMod`,
    RENAME COLUMN `sub` TO `isSub`,
    RENAME COLUMN `turbo` TO `isTurbo`,
    ADD COLUMN `color` VARCHAR(9) NULL DEFAULT '#000000'
