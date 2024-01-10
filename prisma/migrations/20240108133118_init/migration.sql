-- CreateTable
CREATE TABLE `User` (
    `pegawaiId` INTEGER NOT NULL AUTO_INCREMENT,
    `status` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pegawaiId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pegawai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nip` VARCHAR(191) NOT NULL,
    `unitKerja` VARCHAR(191) NOT NULL,
    `jabatan` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `atasanId` INTEGER NULL,

    UNIQUE INDEX `Pegawai_nip_key`(`nip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Laporan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nip` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `kegiatan` VARCHAR(191) NOT NULL,
    `rincianKegiatan` VARCHAR(191) NULL,
    `tempat` VARCHAR(191) NOT NULL,
    `pegawaiId` INTEGER NOT NULL,

    UNIQUE INDEX `Laporan_nip_key`(`nip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LaporanFoto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `laporanId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pegawai` ADD CONSTRAINT `Pegawai_atasanId_fkey` FOREIGN KEY (`atasanId`) REFERENCES `Pegawai`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pegawai` ADD CONSTRAINT `Pegawai_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`pegawaiId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Laporan` ADD CONSTRAINT `Laporan_pegawaiId_fkey` FOREIGN KEY (`pegawaiId`) REFERENCES `Pegawai`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LaporanFoto` ADD CONSTRAINT `LaporanFoto_laporanId_fkey` FOREIGN KEY (`laporanId`) REFERENCES `Laporan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
