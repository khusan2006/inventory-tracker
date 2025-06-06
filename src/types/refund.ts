// Define enums locally since they may not be available in Prisma client yet
export enum RefundType {
  CASH = 'CASH',
  STORE_CREDIT = 'STORE_CREDIT',
  EXCHANGE = 'EXCHANGE'
}

export enum RefundReason {
  DEFECTIVE = 'DEFECTIVE',
  WRONG_ITEM = 'WRONG_ITEM',
  CUSTOMER_CHANGE_MIND = 'CUSTOMER_CHANGE_MIND',
  DUPLICATE_ORDER = 'DUPLICATE_ORDER',
  NOT_AS_DESCRIBED = 'NOT_AS_DESCRIBED',
  OTHER = 'OTHER'
}

export enum ItemCondition {
  NEW = 'NEW',
  OPENED = 'OPENED',
  DAMAGED = 'DAMAGED',
  DEFECTIVE = 'DEFECTIVE'
}

export interface Refund {
  id: string;
  refundNumber: string;
  originalSaleId: string;
  productId: string;
  batchId: string;
  quantity: number;
  unitPrice: number;
  totalRefundAmount: number;
  refundType: RefundType;
  reason: RefundReason;
  customReason?: string;
  refundDate: Date;
  processedBy: string;
  itemCondition: ItemCondition;
  returnToInventory: boolean;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  originalSale: {
    id: string;
    saleDate: Date;
    customerId?: string;
    invoiceNumber?: string;
    quantity: number;
    salePrice: number;
  };
  product: {
    id: string;
    name: string;
    sku: string;
    sellingPrice: number;
  };
  batch: {
    id: string;
    purchasePrice: number;
    supplier?: string;
  };
  processedByUser: {
    id: string;
    name?: string;
    email: string;
  };
}

export interface CreateRefundInput {
  originalSaleId: string;
  productId: string;
  batchId: string;
  quantity: number;
  unitPrice: number;
  refundType: RefundType;
  reason: RefundReason;
  customReason?: string;
  itemCondition: ItemCondition;
  returnToInventory: boolean;
}

export interface RefundSummary {
  totalRefunds: number;
  totalRefundAmount: number;
  refundsByType: Record<RefundType, number>;
  refundsByReason: Record<RefundReason, number>;
  refundsByCondition: Record<ItemCondition, number>;
  thisMonthRefunds: number;
  thisMonthRefundAmount: number;
}

export interface RefundFilters {
  startDate?: string;
  endDate?: string;
  refundType?: RefundType;
  reason?: RefundReason;
  itemCondition?: ItemCondition;
  productId?: string;
  processedBy?: string;
}

export interface RefundWithCalculations extends Omit<Refund, 'unitPrice' | 'totalRefundAmount'> {
  unitPrice: number;
  totalRefundAmount: number;
  profitLoss: number; // Calculated: (refund amount - original cost)
  originalCost: number; // Original batch purchase price * quantity
}

export const REFUND_TYPE_LABELS: Record<RefundType, string> = {
  CASH: 'Cash Refund',
  STORE_CREDIT: 'Store Credit',
  EXCHANGE: 'Exchange'
};

export const REFUND_REASON_LABELS: Record<RefundReason, string> = {
  DEFECTIVE: 'Defective Item',
  WRONG_ITEM: 'Wrong Item',
  CUSTOMER_CHANGE_MIND: 'Customer Changed Mind',
  DUPLICATE_ORDER: 'Duplicate Order',
  NOT_AS_DESCRIBED: 'Not As Described',
  OTHER: 'Other'
};

export const ITEM_CONDITION_LABELS: Record<ItemCondition, string> = {
  NEW: 'New/Unopened',
  OPENED: 'Opened',
  DAMAGED: 'Damaged',
  DEFECTIVE: 'Defective'
}; 