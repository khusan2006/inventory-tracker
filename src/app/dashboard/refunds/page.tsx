'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DollarSignIcon, CalendarIcon, FilterIcon, PlusIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useRefunds, useRefundSummary, useDeleteRefund } from '@/hooks/useRefunds';
import { 
  Refund, 
  RefundFilters, 
  RefundType, 
  RefundReason, 
  ItemCondition,
  REFUND_TYPE_LABELS,
  REFUND_REASON_LABELS,
  ITEM_CONDITION_LABELS
} from '@/types/refund';

export default function RefundsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<RefundFilters>({});
  const [selectedRefund, setSelectedRefund] = useState<Refund | null>(null);

  const { data: refundsData, isLoading: refundsLoading } = useRefunds(currentPage, 50, filters);
  const { data: summary, isLoading: summaryLoading } = useRefundSummary(filters);
  const deleteRefund = useDeleteRefund();

  const handleFilterChange = (key: keyof RefundFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined
    }));
    setCurrentPage(1);
  };

  const handleDeleteRefund = async (id: string) => {
    if (confirm('Are you sure you want to delete this refund? This action cannot be undone.')) {
      await deleteRefund.mutateAsync(id);
    }
  };

  if (refundsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Refund Management</h1>
          <p className="text-gray-600">Track and manage product refunds</p>
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Process Refund
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Refunds</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : summary?.totalRefunds || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {summaryLoading ? '...' : `$${summary?.totalRefundAmount.toFixed(2) || '0.00'} total amount`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : summary?.thisMonthRefunds || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {summaryLoading ? '...' : `$${summary?.thisMonthRefundAmount.toFixed(2) || '0.00'} refunded`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Refunds</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : summary?.refundsByType.CASH || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Direct cash refunds
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Store Credit</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summaryLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : summary?.refundsByType.STORE_CREDIT || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Store credit issued
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FilterIcon className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Start Date</label>
              <Input
                type="date"
                value={filters.startDate || ''}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">End Date</label>
              <Input
                type="date"
                value={filters.endDate || ''}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simple Refunds List */}
      <Card>
        <CardHeader>
          <CardTitle>Refunds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {refundsData?.refunds.map((refund) => (
              <div key={refund.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-blue-600">{refund.refundNumber}</span>
                      <Badge variant={
                        refund.refundType === RefundType.CASH ? 'default' :
                        refund.refundType === RefundType.STORE_CREDIT ? 'secondary' : 'outline'
                      }>
                        {REFUND_TYPE_LABELS[refund.refundType]}
                      </Badge>
                    </div>
                    <div>
                      <div className="font-medium">{refund.product.name}</div>
                      <div className="text-sm text-gray-500">{refund.product.sku}</div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Qty: {refund.quantity}</span>
                      <span>Amount: ${refund.totalRefundAmount.toFixed(2)}</span>
                      <span>Date: {format(new Date(refund.refundDate), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={
                        refund.reason === RefundReason.DEFECTIVE ? 'border-red-200 text-red-700' :
                        refund.reason === RefundReason.WRONG_ITEM ? 'border-orange-200 text-orange-700' :
                        'border-gray-200 text-gray-700'
                      }>
                        {REFUND_REASON_LABELS[refund.reason]}
                      </Badge>
                      <Badge variant="outline" className={
                        refund.itemCondition === ItemCondition.NEW ? 'border-green-200 text-green-700' :
                        refund.itemCondition === ItemCondition.OPENED ? 'border-blue-200 text-blue-700' :
                        refund.itemCondition === ItemCondition.DAMAGED ? 'border-orange-200 text-orange-700' :
                        'border-red-200 text-red-700'
                      }>
                        {ITEM_CONDITION_LABELS[refund.itemCondition]}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedRefund(refund)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteRefund(refund.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )) || (
              <div className="text-center py-8 text-gray-500">
                No refunds found
              </div>
            )}
          </div>

          {/* Simple Pagination */}
          {refundsData && refundsData.pagination.totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {refundsData.pagination.totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(refundsData.pagination.totalPages, prev + 1))}
                disabled={currentPage === refundsData.pagination.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Refund Details */}
      {selectedRefund && (
        <Card>
          <CardHeader>
            <CardTitle>Refund Details - {selectedRefund.refundNumber}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Product Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Name:</span> {selectedRefund.product.name}</div>
                  <div><span className="font-medium">SKU:</span> {selectedRefund.product.sku}</div>
                  <div><span className="font-medium">Quantity:</span> {selectedRefund.quantity}</div>
                  <div><span className="font-medium">Unit Price:</span> ${selectedRefund.unitPrice.toFixed(2)}</div>
                  <div><span className="font-medium">Total Amount:</span> ${selectedRefund.totalRefundAmount.toFixed(2)}</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Refund Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Type:</span> {REFUND_TYPE_LABELS[selectedRefund.refundType]}</div>
                  <div><span className="font-medium">Reason:</span> {REFUND_REASON_LABELS[selectedRefund.reason]}</div>
                  <div><span className="font-medium">Condition:</span> {ITEM_CONDITION_LABELS[selectedRefund.itemCondition]}</div>
                  <div><span className="font-medium">Date:</span> {format(new Date(selectedRefund.refundDate), 'MMM dd, yyyy HH:mm')}</div>
                  <div><span className="font-medium">Processed By:</span> {selectedRefund.processedByUser.name || selectedRefund.processedByUser.email}</div>
                  {selectedRefund.customReason && (
                    <div><span className="font-medium">Notes:</span> {selectedRefund.customReason}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" onClick={() => setSelectedRefund(null)}>
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 