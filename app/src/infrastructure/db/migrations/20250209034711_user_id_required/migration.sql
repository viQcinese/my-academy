/*
  Warnings:

  - Made the column `user_id` on table `classes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `enrollments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `invoices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `classes` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `enrollments` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `invoices` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `students` MODIFY `user_id` VARCHAR(191) NOT NULL;
