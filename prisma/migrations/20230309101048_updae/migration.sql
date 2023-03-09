/*
  Warnings:

  - You are about to alter the column `height` on the `layers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `thickness` on the `layers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `width` on the `layers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `layers` MODIFY `height` INTEGER NULL,
    MODIFY `thickness` INTEGER NULL,
    MODIFY `width` INTEGER NULL;
