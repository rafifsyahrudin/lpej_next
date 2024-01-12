-- AlterTable
ALTER TABLE `LaporanBulanan` ADD COLUMN `status` ENUM('MENUNGGU', 'DITERIMA', 'DITOLAK') NULL;
