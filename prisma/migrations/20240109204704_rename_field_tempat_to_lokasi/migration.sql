/*
  Warnings:

  - You are about to drop the column `tempat` on the `Laporan` table. All the data in the column will be lost.
  - Added the required column `lokasi` to the `Laporan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Laporan` DROP COLUMN `tempat`,
    ADD COLUMN `lokasi` VARCHAR(191) NOT NULL;
