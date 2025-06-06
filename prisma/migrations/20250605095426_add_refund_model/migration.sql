-- CreateEnum
CREATE TYPE "RefundType" AS ENUM ('CASH', 'STORE_CREDIT', 'EXCHANGE');

-- CreateEnum
CREATE TYPE "RefundReason" AS ENUM ('DEFECTIVE', 'WRONG_ITEM', 'CUSTOMER_CHANGE_MIND', 'DUPLICATE_ORDER', 'NOT_AS_DESCRIBED', 'OTHER');

-- CreateEnum
CREATE TYPE "ItemCondition" AS ENUM ('NEW', 'OPENED', 'DAMAGED', 'DEFECTIVE');

-- CreateTable
CREATE TABLE "refunds" (
    "id" TEXT NOT NULL,
    "refundNumber" TEXT NOT NULL,
    "originalSaleId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "totalRefundAmount" DECIMAL(10,2) NOT NULL,
    "refundType" "RefundType" NOT NULL DEFAULT 'CASH',
    "reason" "RefundReason" NOT NULL DEFAULT 'OTHER',
    "customReason" TEXT,
    "refundDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedBy" TEXT NOT NULL,
    "itemCondition" "ItemCondition" NOT NULL DEFAULT 'NEW',
    "returnToInventory" BOOLEAN NOT NULL DEFAULT true,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refunds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refunds_refundNumber_key" ON "refunds"("refundNumber");

-- CreateIndex
CREATE INDEX "refunds_companyId_idx" ON "refunds"("companyId");

-- CreateIndex
CREATE INDEX "refunds_originalSaleId_idx" ON "refunds"("originalSaleId");

-- CreateIndex
CREATE INDEX "refunds_refundDate_idx" ON "refunds"("refundDate");

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_originalSaleId_fkey" FOREIGN KEY ("originalSaleId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_processedBy_fkey" FOREIGN KEY ("processedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
