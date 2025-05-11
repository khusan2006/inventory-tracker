import { Product, Batch, ProductWithBatches } from "@/types/inventory";
import { v4 as uuidv4 } from 'uuid';

// Helper function to create a date string n days ago
const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

// Mock products
export const mockProducts: Product[] = [
  {
    id: "p1",
    sku: "BP-F2245",
    name: "Brake Pads (Front)",
    category: "Brakes",
    description: "High-quality front brake pads for Toyota, Honda, and Nissan models",
    sellingPrice: 49.99,
    totalStock: 32,
    fitment: "Toyota, Honda, Nissan",
    minStockLevel: 10,
    location: "A1-03",
    imageUrl: "/images/brake-pads.jpg"
  },
  {
    id: "p2",
    sku: "OF-1010",
    name: "Oil Filter",
    category: "Filters",
    description: "Universal oil filter compatible with multiple vehicle makes and models",
    sellingPrice: 12.99,
    totalStock: 45,
    fitment: "Multiple vehicles",
    minStockLevel: 15,
    location: "A2-05",
    imageUrl: "/images/oil-filter.jpg"
  },
  {
    id: "p3",
    sku: "SS-3342",
    name: "Suspension Strut",
    category: "Suspension",
    description: "Heavy-duty suspension strut for Ford F-150 trucks",
    sellingPrice: 159.99,
    totalStock: 8,
    fitment: "Ford F-150 2018-2023",
    minStockLevel: 5,
    location: "B3-12",
    imageUrl: "/images/suspension-strut.jpg"
  },
  {
    id: "p4",
    sku: "ALT-5567",
    name: "Alternator",
    category: "Electrical",
    description: "Replacement alternator for Chevrolet and GMC vehicles",
    sellingPrice: 189.99,
    totalStock: 12,
    fitment: "Chevrolet, GMC",
    minStockLevel: 4,
    location: "C1-07",
    imageUrl: "/images/alternator.jpg"
  },
  {
    id: "p5",
    sku: "SP-4424",
    name: "Spark Plugs (Set of 4)",
    category: "Engine",
    description: "High-performance spark plugs for improved fuel efficiency",
    sellingPrice: 24.99,
    totalStock: 23,
    fitment: "Multiple vehicles",
    minStockLevel: 8,
    location: "A3-09",
    imageUrl: "/images/spark-plugs.jpg"
  }
];

// Mock batches for each product
export const mockBatches: Batch[] = [
  // Brake Pads (3 batches)
  {
    id: "b1",
    productId: "p1",
    purchaseDate: daysAgo(90),
    purchasePrice: 32.50,
    initialQuantity: 20,
    currentQuantity: 0, // Depleted
    status: "depleted",
    supplier: "BrakeMaster Inc.",
    invoiceNumber: "BM-2024-1205",
    notes: "Initial stock purchase"
  },
  {
    id: "b2",
    productId: "p1",
    purchaseDate: daysAgo(45),
    purchasePrice: 35.75,
    initialQuantity: 25,
    currentQuantity: 13,
    status: "active",
    supplier: "BrakeMaster Inc.",
    invoiceNumber: "BM-2024-1892"
  },
  {
    id: "b3",
    productId: "p1",
    purchaseDate: daysAgo(10),
    purchasePrice: 34.25,
    initialQuantity: 20,
    currentQuantity: 19,
    status: "active",
    supplier: "AutoParts Wholesale",
    invoiceNumber: "APW-2024-0342"
  },
  
  // Oil Filters (2 batches)
  {
    id: "b4",
    productId: "p2",
    purchaseDate: daysAgo(60),
    purchasePrice: 6.75,
    initialQuantity: 50,
    currentQuantity: 15,
    status: "active",
    supplier: "FilterPro Supply",
    invoiceNumber: "FPS-2024-0721"
  },
  {
    id: "b5",
    productId: "p2",
    purchaseDate: daysAgo(15),
    purchasePrice: 7.25,
    initialQuantity: 30,
    currentQuantity: 30,
    status: "active",
    supplier: "FilterPro Supply",
    invoiceNumber: "FPS-2024-1103"
  },
  
  // Suspension Strut (1 batch)
  {
    id: "b6",
    productId: "p3",
    purchaseDate: daysAgo(30),
    purchasePrice: 98.50,
    initialQuantity: 8,
    currentQuantity: 8,
    status: "active",
    supplier: "Suspension Systems Ltd.",
    invoiceNumber: "SSL-2024-0493"
  },
  
  // Alternator (2 batches)
  {
    id: "b7",
    productId: "p4",
    purchaseDate: daysAgo(75),
    purchasePrice: 125.00,
    initialQuantity: 10,
    currentQuantity: 2,
    status: "active",
    supplier: "ElectroParts Inc.",
    invoiceNumber: "EP-2024-0283"
  },
  {
    id: "b8",
    productId: "p4",
    purchaseDate: daysAgo(7),
    purchasePrice: 130.50,
    initialQuantity: 10,
    currentQuantity: 10,
    status: "active",
    supplier: "ElectroParts Inc.",
    invoiceNumber: "EP-2024-1127"
  },
  
  // Spark Plugs (2 batches)
  {
    id: "b9",
    productId: "p5",
    purchaseDate: daysAgo(50),
    purchasePrice: 15.25,
    initialQuantity: 15,
    currentQuantity: 8,
    status: "active",
    supplier: "IgnitionTech",
    invoiceNumber: "IT-2024-0593"
  },
  {
    id: "b10",
    productId: "p5",
    purchaseDate: daysAgo(20),
    purchasePrice: 16.00,
    initialQuantity: 15,
    currentQuantity: 15,
    status: "active",
    supplier: "IgnitionTech",
    invoiceNumber: "IT-2024-0892"
  }
];

// Combine products with their batches
export const getProductsWithBatches = (): ProductWithBatches[] => {
  return mockProducts.map(product => {
    const productBatches = mockBatches.filter(batch => batch.productId === product.id);
    return {
      ...product,
      batches: productBatches
    };
  });
};

// Generate a mock sale with FIFO batch logic
export const createMockSale = (
  productId: string, 
  quantity: number
): { success: boolean; message?: string; saleData?: any } => {
  // Find the product
  const product = mockProducts.find(p => p.id === productId);
  if (!product) {
    return { success: false, message: "Product not found" };
  }
  
  // Get all batches for this product
  const productBatches = mockBatches.filter(b => b.productId === productId);
  
  // Filter and sort active batches by date (oldest first) - FIFO
  const sortedActiveBatches = [...productBatches]
    .filter(batch => batch.status === 'active' && batch.currentQuantity > 0)
    .sort((a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime());
  
  // Check if we have enough inventory
  const totalAvailable = sortedActiveBatches.reduce((sum, batch) => sum + batch.currentQuantity, 0);
  if (totalAvailable < quantity) {
    return { success: false, message: `Not enough inventory. Only ${totalAvailable} available.` };
  }
  
  // Calculate sale using FIFO
  let remainingToSell = quantity;
  const batchSales = [];
  let totalCost = 0;
  let totalRevenue = 0;
  
  for (const batch of sortedActiveBatches) {
    if (remainingToSell <= 0) break;
    
    // How many can we sell from this batch
    const qtyFromBatch = Math.min(batch.currentQuantity, remainingToSell);
    
    // Calculate costs and revenue
    const batchCost = batch.purchasePrice * qtyFromBatch;
    const batchRevenue = product.sellingPrice * qtyFromBatch;
    
    batchSales.push({
      batchId: batch.id,
      quantity: qtyFromBatch,
      purchasePrice: batch.purchasePrice,
      salePrice: product.sellingPrice,
      cost: batchCost,
      revenue: batchRevenue,
      profit: batchRevenue - batchCost,
      profitMargin: ((batchRevenue - batchCost) / batchCost * 100).toFixed(2) + '%'
    });
    
    totalCost += batchCost;
    totalRevenue += batchRevenue;
    remainingToSell -= qtyFromBatch;
  }
  
  const totalProfit = totalRevenue - totalCost;
  const totalProfitMargin = ((totalProfit / totalCost) * 100).toFixed(2) + '%';
  
  return {
    success: true,
    saleData: {
      id: uuidv4(),
      productId,
      productName: product.name,
      productSku: product.sku,
      quantity,
      batchSales,
      totalCost,
      totalRevenue,
      totalProfit,
      totalProfitMargin,
      saleDate: new Date().toISOString()
    }
  };
}; 