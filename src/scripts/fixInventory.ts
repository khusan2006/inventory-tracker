import prisma from '@/lib/prismadb';

async function fixInventoryData() {
  console.log('Starting inventory data fix...');

  // 1. Fix Batches: Set negative currentQuantity to 0 and update status
  const batchesToFix = await prisma.batch.findMany({
    where: {
      currentQuantity: {
        lt: 0,
      },
    },
  });

  if (batchesToFix.length > 0) {
    console.log(`Found ${batchesToFix.length} batches with negative currentQuantity.`);
    for (const batch of batchesToFix) {
      await prisma.batch.update({
        where: { id: batch.id },
        data: {
          currentQuantity: 0,
          status: 'depleted', // Ensure status is depleted if quantity is zeroed
        },
      });
      console.log(`Fixed batch ${batch.id}: currentQuantity set to 0, status to depleted.`);
    }
  } else {
    console.log('No batches found with negative currentQuantity.');
  }

  // 2. Recalculate Product totalStock
  console.log('\nRecalculating totalStock for all products...');
  const products = await prisma.product.findMany({
    include: {
      batches: {
        where: {
          status: 'active', // Only consider active batches for total stock
        },
      },
    },
  });

  let productsUpdated = 0;
  for (const product of products) {
    // Ensure all currentQuantities in active batches are non-negative before summing
    const newTotalStock = product.batches.reduce((sum, batch) => sum + Math.max(0, batch.currentQuantity), 0);

    if (product.totalStock !== newTotalStock) {
      await prisma.product.update({
        where: { id: product.id },
        data: { totalStock: newTotalStock },
      });
      console.log(`Updated product ${product.id} (${product.name}): totalStock changed from ${product.totalStock} to ${newTotalStock}.`);
      productsUpdated++;
    }
  }

  if (productsUpdated > 0) {
    console.log(`\nFinished recalculating totalStock. ${productsUpdated} products were updated.`);
  } else {
    console.log('\nNo products required totalStock recalculation.');
  }

  console.log('\nInventory data fix process completed.');
}

fixInventoryData()
  .catch((e) => {
    console.error('Error during inventory data fix:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 