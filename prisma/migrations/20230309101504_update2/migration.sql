/*
  Warnings:

  - Made the column `thickness` on table `layers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `layers` MODIFY `thickness` INTEGER NOT NULL;
