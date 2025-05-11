const { PrismaClient } = require('../generated/prisma');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

// Define auto parts categories with realistic names
const autoPartsCategories = [
  { name: 'Brakes', color: '#f87171' },
  { name: 'Engine', color: '#60a5fa' },
  { name: 'Suspension', color: '#34d399' },
  { name: 'Electrical', color: '#fbbf24' },
  { name: 'Filters', color: '#a78bfa' },
  { name: 'Exhaust', color: '#f472b6' },
  { name: 'Transmission', color: '#4ade80' },
  { name: 'Lighting', color: '#facc15' },
  { name: 'Cooling', color: '#93c5fd' },
  { name: 'Steering', color: '#c084fc' }
];

// Auto parts prefixes and suffixes for more realistic names
const partPrefixes = [
  'Premium', 'Heavy Duty', 'OEM', 'Performance', 'Ultra', 'Pro', 'Max', 'Elite',
  'Genuine', 'Advanced', 'Durable', 'High-Flow', 'Standard', 'Racing', 'Precision'
];

const partTypes = {
  'Brakes': ['Brake Pad Set', 'Brake Rotor', 'Brake Caliper', 'Brake Fluid', 'Brake Hose', 'Brake Line Kit', 'Master Cylinder'],
  'Engine': ['Oil Filter', 'Air Filter', 'Spark Plug', 'Timing Belt', 'Fuel Pump', 'Oxygen Sensor', 'Piston Ring Set', 'Engine Mount'],
  'Suspension': ['Shock Absorber', 'Strut Assembly', 'Coil Spring', 'Control Arm', 'Ball Joint', 'Sway Bar Link', 'Tie Rod End'],
  'Electrical': ['Battery', 'Alternator', 'Starter Motor', 'Ignition Coil', 'Fuse Box', 'Relay Switch', 'Wiring Harness'],
  'Filters': ['Air Filter', 'Oil Filter', 'Fuel Filter', 'Cabin Air Filter', 'Transmission Filter Kit', 'PCV Filter'],
  'Exhaust': ['Muffler', 'Catalytic Converter', 'Exhaust Pipe', 'Resonator', 'Exhaust Gasket', 'Exhaust Tip', 'Header'],
  'Transmission': ['Transmission Fluid', 'Clutch Kit', 'Flywheel', 'Torque Converter', 'Shift Cable', 'Transfer Case'],
  'Lighting': ['Headlight Assembly', 'Tail Light', 'Fog Light Kit', 'Turn Signal', 'Light Bulb', 'LED Conversion Kit'],
  'Cooling': ['Radiator', 'Water Pump', 'Thermostat', 'Cooling Fan', 'Radiator Hose', 'Coolant Reservoir', 'Fan Clutch'],
  'Steering': ['Power Steering Pump', 'Steering Rack', 'Tie Rod', 'Steering Wheel', 'Pitman Arm', 'Steering Column']
};

const carBrands = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz',
  'Audi', 'Volkswagen', 'Subaru', 'Hyundai', 'Kia', 'Lexus', 'Mazda', 'Jeep'
];

const carModels = {
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius', 'Tacoma', 'Tundra'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'Ridgeline'],
  'Ford': ['F-150', 'Mustang', 'Explorer', 'Escape', 'Fusion', 'Focus', 'Edge'],
  'Chevrolet': ['Silverado', 'Equinox', 'Malibu', 'Traverse', 'Tahoe', 'Camaro', 'Colorado'],
  'Nissan': ['Altima', 'Rogue', 'Sentra', 'Murano', 'Pathfinder', 'Titan', 'Frontier'],
  'BMW': ['3 Series', '5 Series', 'X3', 'X5', '7 Series', 'X1', '4 Series'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class', 'CLA', 'GLA'],
  'Audi': ['A4', 'Q5', 'A3', 'Q7', 'A6', 'Q3', 'A5'],
  'Volkswagen': ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf', 'GTI', 'Arteon'],
  'Subaru': ['Outback', 'Forester', 'Crosstrek', 'Impreza', 'Legacy', 'Ascent', 'WRX'],
  'Hyundai': ['Elantra', 'Tucson', 'Santa Fe', 'Sonata', 'Kona', 'Palisade', 'Venue'],
  'Kia': ['Optima', 'Sorento', 'Sportage', 'Forte', 'Soul', 'Telluride', 'Stinger'],
  'Lexus': ['RX', 'ES', 'NX', 'IS', 'GX', 'UX', 'LS'],
  'Mazda': ['CX-5', 'Mazda3', 'CX-9', 'Mazda6', 'CX-30', 'MX-5 Miata', 'CX-3'],
  'Jeep': ['Grand Cherokee', 'Wrangler', 'Cherokee', 'Compass', 'Renegade', 'Gladiator', 'Wagoneer']
};

const suppliers = [
  'AutoZone Parts Inc.',
  'NAPA Auto Supply',
  'Advance Auto Parts',
  'O\'Reilly Auto Parts',
  'CarQuest Auto Parts',
  'Genuine Parts Company',
  'PartsPlus Distribution',
  'ACDelco Official Store',
  'Mopar Parts Direct',
  'RockAuto LLC'
];

const locations = [
  'Warehouse A, Shelf B3',
  'Warehouse A, Shelf C5',
  'Warehouse B, Rack D7',
  'Warehouse B, Rack E2',
  'Warehouse C, Zone F9',
  'Main Storage, Aisle 4',
  'Main Storage, Aisle 7',
  'Overflow Storage, Section 3',
  'Returns Area, Bin 12',
  'New Arrivals, Rack 5'
];

// Generate a random year range for vehicle fitment
function generateYearRange() {
  const startYear = faker.number.int({ min: 2000, max: 2020 });
  const endYear = faker.number.int({ min: startYear, max: 2023 });
  return `${startYear}-${endYear}`;
}

// Generate a realistic SKU
function generateSKU(categoryName, index) {
  const prefix = categoryName.substring(0, 2).toUpperCase();
  const randomNum = String(index).padStart(4, '0');
  return `${prefix}-${randomNum}`;
}

// Generate fitment information
function generateFitment() {
  const brand = faker.helpers.arrayElement(carBrands);
  const model = faker.helpers.arrayElement(carModels[brand]);
  const yearRange = generateYearRange();
  return `${brand} ${model} ${yearRange}`;
}

// Main seeding function
async function seedProducts(count = 50) {
  try {
    console.log('Starting to seed database...');
    
    // First, let's create or ensure our categories exist
    const categoryPromises = autoPartsCategories.map(async (cat) => {
      return prisma.category.upsert({
        where: { name: cat.name },
        update: { color: cat.color },
        create: {
          name: cat.name,
          description: `${cat.name} parts and components`,
          color: cat.color
        }
      });
    });
    
    const categories = await Promise.all(categoryPromises);
    console.log(`Created/verified ${categories.length} categories`);
    
    // Now let's create the products
    const products = [];
    
    for (let i = 0; i < count; i++) {
      // Pick a random category
      const category = faker.helpers.arrayElement(categories);
      const categoryName = category.name;
      
      // Generate part name based on category
      const prefix = faker.helpers.arrayElement(partPrefixes);
      const partType = faker.helpers.arrayElement(partTypes[categoryName]);
      const name = `${prefix} ${partType}`;
      
      // Create product
      const product = {
        name,
        sku: generateSKU(categoryName, i + 1),
        categoryId: category.id,
        description: faker.lorem.paragraph(),
        sellingPrice: parseFloat(faker.commerce.price({ min: 9.99, max: 599.99 })),
        totalStock: faker.number.int({ min: 0, max: 100 }),
        minStockLevel: faker.number.int({ min: 5, max: 20 }),
        fitment: generateFitment(),
        location: faker.helpers.arrayElement(locations),
        supplier: faker.helpers.arrayElement(suppliers),
        imageUrl: `https://source.unsplash.com/300x300/?auto,parts,${categoryName.toLowerCase()}`,
      };
      
      products.push(product);
    }
    
    // Insert all products in batches
    const batchSize = 50;
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      await prisma.product.createMany({
        data: batch,
        skipDuplicates: true,
      });
      console.log(`Created batch ${i/batchSize + 1} of products`);
    }
    
    // Now let's create some batches for each product
    console.log('Creating inventory batches...');
    
    const allProducts = await prisma.product.findMany();
    
    for (const product of allProducts) {
      // Create 1-4 batches per product
      const batchCount = faker.number.int({ min: 1, max: 4 });
      
      for (let i = 0; i < batchCount; i++) {
        const initialQuantity = faker.number.int({ min: 10, max: 50 });
        const currentQuantity = faker.number.int({ min: 0, max: initialQuantity });
        const purchasePrice = parseFloat((product.sellingPrice * 0.6).toFixed(2)); // 60% of selling price
        
        await prisma.batch.create({
          data: {
            productId: product.id,
            purchaseDate: faker.date.past(),
            purchasePrice,
            initialQuantity,
            currentQuantity,
            status: currentQuantity > 0 ? 'active' : 'depleted',
            supplier: product.supplier,
            invoiceNumber: `INV-${faker.string.alphanumeric(8).toUpperCase()}`
          }
        });
      }
    }
    
    console.log('Updating total stock...');
    
    // Update total stock for each product based on batch quantities
    const productsWithBatches = await prisma.product.findMany({
      include: {
        batches: true
      }
    });
    
    for (const product of productsWithBatches) {
      const totalStock = product.batches.reduce((sum, batch) => sum + batch.currentQuantity, 0);
      
      await prisma.product.update({
        where: { id: product.id },
        data: { totalStock }
      });
    }
    
    // Create some sales records
    console.log('Creating sales records...');
    
    for (const product of productsWithBatches.slice(0, 30)) { // Only create sales for some products
      if (product.batches.length === 0) continue;
      
      const salesCount = faker.number.int({ min: 1, max: 5 });
      
      for (let i = 0; i < salesCount; i++) {
        const batch = faker.helpers.arrayElement(product.batches);
        const quantity = faker.number.int({ min: 1, max: 5 });
        const salePrice = product.sellingPrice;
        const purchasePrice = batch.purchasePrice;
        const profit = (salePrice - purchasePrice) * quantity;
        const profitMargin = ((profit / (purchasePrice * quantity)) * 100).toFixed(2);
        
        await prisma.sale.create({
          data: {
            productId: product.id,
            batchId: batch.id,
            quantity,
            salePrice,
            purchasePrice,
            profit,
            profitMargin: parseFloat(profitMargin),
            saleDate: faker.date.recent(),
          }
        });
      }
    }
    
    console.log('Seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run with a parameter for number of products to generate
const numProducts = process.argv[2] ? parseInt(process.argv[2]) : 100;
seedProducts(numProducts); 