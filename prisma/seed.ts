import { PrismaClient } from '../src/generated/prisma';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding database...');
  
  // Clear existing data
  await prisma.sale.deleteMany();
  await prisma.batch.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.monthlyReport.deleteMany();
  
  console.log('Cleared existing data');
  
  // Seed categories
  const categories = [
    {
      id: 'cat1',
      name: 'Brakes',
      description: 'Brake components and accessories',
      color: '#EF4444', // Tailwind red-500
    },
    {
      id: 'cat2',
      name: 'Engine',
      description: 'Engine parts and components',
      color: '#3B82F6', // Tailwind blue-500
    },
    {
      id: 'cat3',
      name: 'Filters',
      description: 'Oil, air, and cabin filters',
      color: '#10B981', // Tailwind green-500
    },
    {
      id: 'cat4',
      name: 'Electrical',
      description: 'Electrical components and wiring',
      color: '#F59E0B', // Tailwind amber-500
    },
    {
      id: 'cat5',
      name: 'Suspension',
      description: 'Suspension and steering parts',
      color: '#8B5CF6', // Tailwind violet-500
    }
  ];
  
  const createdCategories = await Promise.all(
    categories.map(category => 
      prisma.category.create({
        data: category
      })
    )
  );
  
  console.log(`Seeded ${createdCategories.length} categories`);
  
  // Seed products
  const products = [
    {
      id: 'p1',
      sku: 'BP-2023-001',
      name: 'Performance Brake Pads',
      description: 'High-performance ceramic brake pads for improved stopping power',
      categoryId: 'cat1', // Brakes
      sellingPrice: 79.99,
      totalStock: 45,
      minStockLevel: 10,
      location: 'Aisle A, Shelf 1',
      imageUrl: '/images/brake-pads.jpg',
      fitment: 'Multiple models, 2018-2023',
      supplier: 'BrakeTech Inc.'
    },
    {
      id: 'p2',
      sku: 'OIL-2023-001',
      name: 'Premium Synthetic Motor Oil',
      description: 'Full synthetic 5W-30 motor oil for maximum engine protection',
      categoryId: 'cat2', // Engine
      sellingPrice: 34.99,
      totalStock: 100,
      minStockLevel: 20,
      location: 'Aisle B, Shelf 3',
      imageUrl: '/images/motor-oil.jpg',
      fitment: 'Universal',
      supplier: 'LubeTech'
    },
    {
      id: 'p3',
      sku: 'FIL-2023-001',
      name: 'Oil Filter',
      description: 'Standard replacement oil filter',
      categoryId: 'cat3', // Filters
      sellingPrice: 12.99,
      totalStock: 85,
      minStockLevel: 15,
      location: 'Aisle B, Shelf 2',
      imageUrl: '/images/oil-filter.jpg',
      fitment: 'Most domestic vehicles, 2015-2023',
      supplier: 'FilterPro'
    }
  ];
  
  const createdProducts = await Promise.all(
    products.map(product => 
      prisma.product.create({
        data: product
      })
    )
  );
  
  console.log(`Seeded ${createdProducts.length} products`);
  
  // Seed batches
  const batches = [
    // Product 1 (Brake Pads)
    {
      id: 'b12345',
      productId: 'p1',
      purchaseDate: new Date('2023-02-15T08:00:00Z'),
      purchasePrice: 42.50,
      initialQuantity: 20,
      currentQuantity: 5,
      status: 'active',
      supplier: 'ABC Auto Parts',
      invoiceNumber: 'INV-2023-0215',
      notes: 'First batch of the year'
    },
    {
      id: 'b23456',
      productId: 'p1',
      purchaseDate: new Date('2023-05-22T10:30:00Z'),
      purchasePrice: 40.75,
      initialQuantity: 25,
      currentQuantity: 20,
      status: 'active',
      supplier: 'ABC Auto Parts',
      invoiceNumber: 'INV-2023-0522'
    },
    {
      id: 'b34567',
      productId: 'p1',
      purchaseDate: new Date('2023-09-10T14:15:00Z'),
      purchasePrice: 39.99,
      initialQuantity: 20,
      currentQuantity: 20,
      status: 'active',
      supplier: 'XYZ Suppliers',
      invoiceNumber: 'INV-2023-0910'
    },
    
    // Product 2 (Motor Oil)
    {
      id: 'b45678',
      productId: 'p2',
      purchaseDate: new Date('2023-03-10T09:20:00Z'),
      purchasePrice: 22.50,
      initialQuantity: 50,
      currentQuantity: 30,
      status: 'active',
      supplier: 'Lubricants Inc.',
      invoiceNumber: 'INV-2023-0310'
    },
    {
      id: 'b56789',
      productId: 'p2',
      purchaseDate: new Date('2023-08-15T14:45:00Z'),
      purchasePrice: 23.75,
      initialQuantity: 70,
      currentQuantity: 70,
      status: 'active',
      supplier: 'Lubricants Inc.',
      invoiceNumber: 'INV-2023-0815'
    },
    
    // Product 3 (Oil Filter)
    {
      id: 'b67890',
      productId: 'p3',
      purchaseDate: new Date('2023-04-05T11:30:00Z'),
      purchasePrice: 8.25,
      initialQuantity: 100,
      currentQuantity: 85,
      status: 'active',
      supplier: 'Filter King',
      invoiceNumber: 'INV-2023-0405'
    }
  ];
  
  const createdBatches = await Promise.all(
    batches.map(batch => 
      prisma.batch.create({
        data: batch
      })
    )
  );
  
  console.log(`Seeded ${createdBatches.length} batches`);
  
  // Seed sales
  const sales = [
    // March 2023 sales
    {
      id: 'sale-123456',
      productId: 'p1',
      batchId: 'b12345',
      quantity: 8,
      salePrice: 79.99,
      purchasePrice: 42.50,
      profit: 300.00,
      profitMargin: 88.5,
      saleDate: new Date('2023-03-10T14:30:00Z'),
      customerId: 'cust001',
      invoiceNumber: 'INV-S-0001'
    },
    {
      id: 'sale-234567',
      productId: 'p2',
      batchId: 'b45678',
      quantity: 10,
      salePrice: 45.99,
      purchasePrice: 22.50,
      profit: 234.90,
      profitMargin: 104.40,
      saleDate: new Date('2023-09-05T11:15:00Z'),
      customerId: 'cust002',
      invoiceNumber: 'INV-S-0002'
    }
  ];
  
  const createdSales = await Promise.all(
    sales.map(sale => 
      prisma.sale.create({
        data: sale
      })
    )
  );
  
  console.log(`Seeded ${createdSales.length} sales`);
  
  // Seed monthly reports
  const monthlyReports = [
    {
      id: uuidv4(),
      year: 2023,
      month: 2, // March (0-indexed)
      totalSales: 639.92,
      totalProfit: 300.00,
      averageProfitMargin: 88.5,
      isFinalized: true,
      reportData: {
        productReports: [
          {
            productId: 'p1',
            productName: 'Performance Brake Pads',
            quantitySold: 8,
            totalSales: 639.92,
            totalCost: 340.00,
            profit: 300.00,
            profitMargin: 88.5
          }
        ],
        totalItems: 8,
        monthStartDate: '2023-03-01T00:00:00.000Z',
        monthEndDate: '2023-03-31T23:59:59.999Z'
      }
    }
  ];
  
  const createdReports = await Promise.all(
    monthlyReports.map(report => 
      prisma.monthlyReport.create({
        data: report
      })
    )
  );
  
  console.log(`Seeded ${createdReports.length} monthly reports`);
  console.log('Database seeding completed successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }); 