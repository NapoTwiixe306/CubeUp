/*
  Warnings:

  - The values [Pro,Business] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DevisFacture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TacheProjet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `elo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Client` DROP FOREIGN KEY `Client_utilisateurId_fkey`;

-- DropForeignKey
ALTER TABLE `DevisFacture` DROP FOREIGN KEY `DevisFacture_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `DevisFacture` DROP FOREIGN KEY `DevisFacture_utilisateurId_fkey`;

-- DropForeignKey
ALTER TABLE `TacheProjet` DROP FOREIGN KEY `TacheProjet_utilisateurId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `elo` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('Admin', 'Free') NOT NULL;

-- DropTable
DROP TABLE `Client`;

-- DropTable
DROP TABLE `DevisFacture`;

-- DropTable
DROP TABLE `TacheProjet`;
