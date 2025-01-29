/*
  Warnings:

  - You are about to drop the column `studentId` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `student_id` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoices` DROP COLUMN `studentId`,
    ADD COLUMN `student_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
