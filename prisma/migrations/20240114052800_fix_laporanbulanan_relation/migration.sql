/*
  Warnings:

  - You are about to drop the column `statusLaporanBulananId` on the `LaporanBulanan` table. All the data in the column will be lost.
  - Added the required column `laporanBulananId` to the `StatusLaporanBulanan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `LaporanBulanan` DROP FOREIGN KEY `LaporanBulanan_statusLaporanBulananId_fkey`;

-- AlterTable
ALTER TABLE `LaporanBulanan` DROP COLUMN `statusLaporanBulananId`;

-- AlterTable
ALTER TABLE `StatusLaporanBulanan` ADD COLUMN `laporanBulananId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `StatusLaporanBulanan` ADD CONSTRAINT `StatusLaporanBulanan_laporanBulananId_fkey` FOREIGN KEY (`laporanBulananId`) REFERENCES `LaporanBulanan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
