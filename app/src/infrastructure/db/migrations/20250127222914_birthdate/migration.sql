/*
  Warnings:

  - You are about to alter the column `birth_date` on the `students` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `students` MODIFY `birth_date` DATETIME(3) NOT NULL;
