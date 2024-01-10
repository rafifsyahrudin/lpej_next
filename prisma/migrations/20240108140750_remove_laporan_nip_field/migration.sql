/*
  Warnings:

  - You are about to drop the column `nip` on the `Laporan` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Laporan_nip_key` ON `Laporan`;

-- AlterTable
ALTER TABLE `Laporan` DROP COLUMN `nip`;
