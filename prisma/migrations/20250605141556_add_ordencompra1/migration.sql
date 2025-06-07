-- DropForeignKey
ALTER TABLE `detalleordencompras` DROP FOREIGN KEY `detalleordencompras_NroOrdenC_fkey`;

-- DropIndex
DROP INDEX `detalleordencompras_NroOrdenC_fkey` ON `detalleordencompras`;

-- AddForeignKey
ALTER TABLE `detalleordencompras` ADD CONSTRAINT `detalleordencompras_NroOrdenC_fkey` FOREIGN KEY (`NroOrdenC`) REFERENCES `ordencompras`(`NroOrdenC`) ON DELETE CASCADE ON UPDATE CASCADE;
