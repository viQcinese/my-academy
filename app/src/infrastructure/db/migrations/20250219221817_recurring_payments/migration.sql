-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `recurring_payment_assignment_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `recurring_payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(256) NOT NULL,
    `frequency` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `currency` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recurring_payment_assignments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `recurring_payment_id` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,
    `charged_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `next_charge_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `recurring_payment_assignments_student_id_key`(`student_id`),
    UNIQUE INDEX `recurring_payment_assignments_student_id_recurring_payment_i_key`(`student_id`, `recurring_payment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_recurring_payment_assignment_id_fkey` FOREIGN KEY (`recurring_payment_assignment_id`) REFERENCES `recurring_payment_assignments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recurring_payment_assignments` ADD CONSTRAINT `recurring_payment_assignments_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
