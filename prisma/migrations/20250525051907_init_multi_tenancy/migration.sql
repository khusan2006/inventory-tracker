/*
  Warnings:

  - A unique constraint covering the columns `[name,companyId]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[year,month,companyId]` on the table `monthly_reports` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku,companyId]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `batches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `monthly_reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "categories_name_key";

-- DropIndex
DROP INDEX "monthly_reports_year_month_key";

-- DropIndex
DROP INDEX "products_sku_key";

-- AlterTable
ALTER TABLE "batches" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "monthly_reports" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "companyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_companyId_key" ON "categories"("name", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "monthly_reports_year_month_companyId_key" ON "monthly_reports"("year", "month", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_companyId_key" ON "products"("sku", "companyId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batches" ADD CONSTRAINT "batches_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_reports" ADD CONSTRAINT "monthly_reports_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
