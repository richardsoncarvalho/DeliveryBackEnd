-- DropForeignKey
ALTER TABLE `deliveries` DROP FOREIGN KEY `deliveries_id_deliveryman_fkey`;

-- AlterTable
ALTER TABLE `deliveries` MODIFY `id_deliveryman` VARCHAR(191) NULL,
    MODIFY `end_at` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `deliveries` ADD CONSTRAINT `deliveries_id_deliveryman_fkey` FOREIGN KEY (`id_deliveryman`) REFERENCES `deliveryman`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
