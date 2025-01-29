/*
  Warnings:

  - You are about to drop the column `classId` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `enrollments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[student_id,class_id]` on the table `enrollments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class_id` to the `enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `enrollments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `enrollments` DROP FOREIGN KEY `enrollments_classId_fkey`;

-- DropForeignKey
ALTER TABLE `enrollments` DROP FOREIGN KEY `enrollments_studentId_fkey`;

-- DropIndex
DROP INDEX `enrollments_classId_fkey` ON `enrollments`;

-- DropIndex
DROP INDEX `enrollments_studentId_classId_key` ON `enrollments`;

-- AlterTable
ALTER TABLE `enrollments` DROP COLUMN `classId`,
    DROP COLUMN `studentId`,
    ADD COLUMN `class_id` INTEGER NOT NULL,
    ADD COLUMN `student_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `invoices` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `is_paid` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `enrollments_student_id_class_id_key` ON `enrollments`(`student_id`, `class_id`);

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
