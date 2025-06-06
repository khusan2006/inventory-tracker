export interface Debt {
  id: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  purchasePrice: number;
  debtDate: string;
  customerName?: string;
  notes?: string;
  status: 'pending' | 'paid';
  paidDate?: string;
  createdAt: string;
  updatedAt: string;
  productId: string;
  product?: {
    id: string;
    name: string;
    sku: string;
  };
  batchId: string;
  batch?: {
    id: string;
    purchaseDate: string;
    purchasePrice: number;
  };
  companyId: string;
}

export interface CreateDebtInput {
  productId: string;
  quantity: number;
  unitPrice: number;
  customerName?: string;
  notes?: string;
  batchData: {
    batchId: string;
    quantity: number;
  }[];
}

export interface DebtSummary {
  totalDebts: number;
  totalAmount: number;
  pendingDebts: number;
  pendingAmount: number;
  paidDebts: number;
  paidAmount: number;
} 