import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// This endpoint will handle migrating supplier string data to the new Supplier model
export async function GET(request: NextRequest) {
  try {
    // Step 1: Get unique supplier names from products and batches
    const products = await prisma.product.findMany({
      where: {
        supplier: {
          not: null
        }
      },
      select: {
        id: true,
        supplier: true
      }
    });

    const batches = await prisma.batch.findMany({
      where: {
        supplier: {
          not: null
        }
      },
      select: {
        id: true,
        supplier: true
      }
    });

    // Step 2: Create unique supplier list
    const uniqueSuppliers = new Set<string>();
    
    products.forEach(product => {
      if (product.supplier) {
        uniqueSuppliers.add(product.supplier);
      }
    });

    batches.forEach(batch => {
      if (batch.supplier) {
        uniqueSuppliers.add(batch.supplier);
      }
    });

    // Step 3: Create supplier records
    const supplierMap = new Map<string, string>();

    for (const supplierName of uniqueSuppliers) {
      const supplierId = uuidv4();
      
      await prisma.supplier.create({
        data: {
          id: supplierId,
          name: supplierName,
          contactPerson: 'Unknown', // Default values
          email: 'unknown@example.com',
          phone: 'Unknown',
          address: 'Unknown',
          notes: `Automatically migrated from supplier name: ${supplierName}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      });
      
      supplierMap.set(supplierName, supplierId);
    }

    // Step 4: Update product records with new supplier IDs
    for (const product of products) {
      if (product.supplier && supplierMap.has(product.supplier)) {
        await prisma.product.update({
          where: { id: product.id },
          data: {
            supplierId: supplierMap.get(product.supplier)
          }
        });
      }
    }

    // Step 5: Update batch records with new supplier IDs
    for (const batch of batches) {
      if (batch.supplier && supplierMap.has(batch.supplier)) {
        await prisma.batch.update({
          where: { id: batch.id },
          data: {
            supplierId: supplierMap.get(batch.supplier)
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      migrated: uniqueSuppliers.size,
      message: 'Supplier migration completed successfully'
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Migration failed', details: error },
      { status: 500 }
    );
  }
} 