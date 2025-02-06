/*
  Warnings:

  - You are about to drop the column `due_date` on the `invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `invoices` DROP COLUMN `due_date`,
    ADD COLUMN `due_at` DATETIME(3) NULL;
