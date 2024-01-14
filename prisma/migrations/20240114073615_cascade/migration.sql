-- DropForeignKey
ALTER TABLE `LaporanFoto` DROP FOREIGN KEY `LaporanFoto_laporanId_fkey`;

-- AddForeignKey
ALTER TABLE `LaporanFoto` ADD CONSTRAINT `LaporanFoto_laporanId_fkey` FOREIGN KEY (`laporanId`) REFERENCES `Laporan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
