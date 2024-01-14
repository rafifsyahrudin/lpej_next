/*
  Warnings:

  - You are about to drop the column `status` on the `LaporanBulanan` table. All the data in the column will be lost.
  - Added the required column `statusLaporanBulananId` to the `LaporanBulanan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `LaporanBulanan` DROP COLUMN `status`,
    ADD COLUMN `statusLaporanBulananId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `StatusLaporanBulanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal` DATETIME(3) NOT NULL,
    `status` ENUM('MENUNGGU', 'DITERIMA', 'DITOLAK') NOT NULL,
    `pesan` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LaporanBulanan` ADD CONSTRAINT `LaporanBulanan_statusLaporanBulananId_fkey` FOREIGN KEY (`statusLaporanBulananId`) REFERENCES `StatusLaporanBulanan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
