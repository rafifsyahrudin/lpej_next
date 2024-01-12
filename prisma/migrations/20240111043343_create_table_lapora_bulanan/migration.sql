-- CreateTable
CREATE TABLE `LaporanBulanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bulan` DATETIME(3) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `pegawaiId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LaporanBulanan` ADD CONSTRAINT `LaporanBulanan_pegawaiId_fkey` FOREIGN KEY (`pegawaiId`) REFERENCES `Pegawai`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
