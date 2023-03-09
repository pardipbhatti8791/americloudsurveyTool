-- AlterTable
ALTER TABLE `layers` ADD COLUMN `heightType` VARCHAR(191) NULL,
    ADD COLUMN `thicknessType` VARCHAR(191) NULL,
    ADD COLUMN `widthType` VARCHAR(191) NULL,
    MODIFY `thickness` INTEGER NULL;
