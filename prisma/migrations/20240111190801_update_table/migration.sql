/*
  Warnings:

  - You are about to drop the column `pegawaiId` on the `LaporanBulanan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `LaporanBulanan` DROP FOREIGN KEY `LaporanBulanan_pegawaiId_fkey`;

-- AlterTable
ALTER TABLE `Laporan` ADD COLUMN `laporanBulananId` INTEGER NULL;

-- AlterTable
ALTER TABLE `LaporanBulanan` DROP COLUMN `pegawaiId`;

-- AddForeignKey
ALTER TABLE `Laporan` ADD CONSTRAINT `Laporan_laporanBulananId_fkey` FOREIGN KEY (`laporanBulananId`) REFERENCES `LaporanBulanan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
