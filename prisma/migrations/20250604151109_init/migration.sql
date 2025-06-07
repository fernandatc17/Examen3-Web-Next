-- CreateTable
CREATE TABLE `Medicamento` (
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
CREATE TABLE `DetalleOrdenCompra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio` DOUBLE NOT NULL,
    `montoUni` DOUBLE NOT NULL,
    `CodMedicamento` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DetalleOrdenCompra` ADD CONSTRAINT `DetalleOrdenCompra_CodMedicamento_fkey` FOREIGN KEY (`CodMedicamento`) REFERENCES `Medicamento`(`CodMedicamento`) ON DELETE RESTRICT ON UPDATE CASCADE;
