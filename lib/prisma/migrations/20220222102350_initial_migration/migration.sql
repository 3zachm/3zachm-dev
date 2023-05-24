-- CreateTable
CREATE TABLE `history` (
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `yep` INTEGER NULL,
    `cock` INTEGER NULL,

    UNIQUE INDEX `time`(`time`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logs` (
    `time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id` INTEGER NULL,
    `user` VARCHAR(32) NULL,
    `message` VARCHAR(512) NULL,
    `msg_id` MEDIUMINT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`msg_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(32) NULL,
    `yep` INTEGER NULL,
    `cock` INTEGER NULL,
    `uid` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
