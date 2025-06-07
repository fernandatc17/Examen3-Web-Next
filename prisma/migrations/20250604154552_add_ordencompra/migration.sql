/*
  Warnings:

  - You are about to drop the `detalleordencompra` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medicamento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `detalleordencompra` DROP FOREIGN KEY `DetalleOrdenCompra_CodMedicamento_fkey`;

-- DropTable
DROP TABLE `detalleordencompra`;

-- DropTable
DROP TABLE `medicamento`;

-- CreateTable
CREATE TABLE `medicamentos` (
    `CodMedicamento` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcionMed` VARCHAR(191) NOT NULL,
    `fechaFabricacion` DATETIME(3) NOT NULL,
    `fechaVencimiento` DATETIME(3) NOT NULL,
    `presentacion` VARCHAR(191) NOT NULL,
    `stock` INTEGER NOT NULL,
    `precioVentaUni` DOUBLE NOT NULL,
    `precioVentaPres` DOUBLE NOT NULL,
    `marca` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`CodMedicamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalleordencompras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio` DOUBLE NOT NULL,
    `montoUni` DOUBLE NOT NULL,
    `CodMedicamento` INTEGER NOT NULL,
    `NroOrdenC` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ordencompras` (
    `NroOrdenC` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaEmision` DATETIME(3) NOT NULL,
    `situacion` VARCHAR(191) NOT NULL,
    `total` DOUBLE NOT NULL,
    `nrofacturaProv` VARCHAR(191) NOT NULL,
    `CodLab` INTEGER NOT NULL,

    PRIMARY KEY (`NroOrdenC`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `laboratorios` (
    `CodLab` INTEGER NOT NULL AUTO_INCREMENT,
    `razonSocial` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contacto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`CodLab`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detalleordencompras` ADD CONSTRAINT `detalleordencompras_CodMedicamento_fkey` FOREIGN KEY (`CodMedicamento`) REFERENCES `medicamentos`(`CodMedicamento`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleordencompras` ADD CONSTRAINT `detalleordencompras_NroOrdenC_fkey` FOREIGN KEY (`NroOrdenC`) REFERENCES `ordencompras`(`NroOrdenC`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordencompras` ADD CONSTRAINT `ordencompras_CodLab_fkey` FOREIGN KEY (`CodLab`) REFERENCES `laboratorios`(`CodLab`) ON DELETE RESTRICT ON UPDATE CASCADE;
