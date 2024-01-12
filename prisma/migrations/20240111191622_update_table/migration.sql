/*
  Warnings:

  - Added the required column `pegawaiId` to the `LaporanBulanan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `LaporanBulanan` ADD COLUMN `pegawaiId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `LaporanBulanan` ADD CONSTRAINT `LaporanBulanan_pegawaiId_fkey` FOREIGN KEY (`pegawaiId`) REFERENCES `Pegawai`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
