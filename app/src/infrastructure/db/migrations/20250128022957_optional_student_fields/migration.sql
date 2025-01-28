-- AlterTable
ALTER TABLE `students` MODIFY `last_name` VARCHAR(191) NULL,
    MODIFY `birth_date` DATETIME(3) NULL,
    MODIFY `document` VARCHAR(191) NULL,
    MODIFY `cellphone` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;
