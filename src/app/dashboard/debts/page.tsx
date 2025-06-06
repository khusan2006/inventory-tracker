"use client";

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  FileText, 
  Check, 
  Clock, 
  DollarSign, 
  Package, 
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDebts, useUpdateDebt } from '@/hooks/useDebts';
import type { Debt } from '@/types/debt';

type DebtStatusFilter = 'all' | 'pending' | 'paid';

export default function DebtsPage() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<DebtStatusFilter>('all');
  
  const { 
    data, 
    isLoading, 
    error, 
    refetch 
  } = useDebts(
    currentPage, 
    50, 
    statusFilter === 'all' ? undefined : statusFilter
  );

  const updateDebtMutation = useUpdateDebt();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleStatusUpdate = (debt: Debt, newStatus: 'paid' | 'pending') => {
    updateDebtMutation.mutate({
      id: debt.id,
      status: newStatus,
      paidDate: newStatus === 'paid' ? new Date().toISOString() : undefined
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Check className="w-3 h-3 mr-1" />
            {t('debt.paid')}
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="text-orange-600 border-orange-600">
            <Clock className="w-3 h-3 mr-1" />
            {t('debt.pending')}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  const getDaysOverdue = (debtDate: string) => {
    const daysSince = Math.floor((Date.now() - new Date(debtDate).getTime()) / (1000 * 60 * 60 * 24));
    return daysSince;
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('common.error')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('debt.failedToLoadDebts')}
              </p>
              <Button onClick={() => refetch()}>
                {t('common.retry')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { debts = [], summary, pagination } = data || {};

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('admin.debtsManagement')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('debt.trackAndManageDebts')}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            {t('common.export')}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('debt.totalDebts')}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {summary.totalDebts}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('debt.totalAmount')}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(summary.totalAmount)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('debt.pendingDebts')}
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {summary.pendingDebts}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(summary.pendingAmount)}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('debt.paidDebts')}
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {summary.paidDebts}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(summary.paidAmount)}
                  </p>
                </div>
                <Check className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('common.status')}:
              </span>
              <div className="flex space-x-1">
                {(['all', 'pending', 'paid'] as DebtStatusFilter[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                      statusFilter === status
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {t(`debt.${status}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Debts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2" />
            {t('debt.debtRecords')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {debts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('debt.noDebtsFound')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {statusFilter === 'all' 
                  ? t('debt.noDebtsYet') 
                  : t('debt.noDebtsWithStatus', { status: t(`debt.${statusFilter}`) })
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('common.product')}</TableHead>
                    <TableHead>{t('debt.customer')}</TableHead>
                    <TableHead>{t('common.quantity')}</TableHead>
                    <TableHead>{t('debt.unitPrice')}</TableHead>
                    <TableHead>{t('debt.totalAmount')}</TableHead>
                    <TableHead>{t('debt.debtDate')}</TableHead>
                    <TableHead>{t('debt.daysOverdue')}</TableHead>
                    <TableHead>{t('common.status')}</TableHead>
                    <TableHead>{t('common.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {debts.map((debt) => {
                    const daysOverdue = getDaysOverdue(debt.debtDate);
                    const isOverdue = debt.status === 'pending' && daysOverdue > 30;
                    
                    return (
                      <TableRow key={debt.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {debt.product?.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              SKU: {debt.product?.sku}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {debt.customerName || t('debt.unknownCustomer')}
                            </div>
                            {debt.notes && (
                              <div className="text-sm text-gray-500 max-w-32 truncate">
                                {debt.notes}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">
                          {debt.quantity}
                        </TableCell>
                        <TableCell className="font-mono">
                          {formatCurrency(debt.unitPrice)}
                        </TableCell>
                        <TableCell className="font-mono font-medium">
                          {formatCurrency(debt.totalAmount)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            {formatDate(debt.debtDate)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`text-sm ${
                            isOverdue 
                              ? 'text-red-600 dark:text-red-400 font-medium' 
                              : debt.status === 'pending'
                                ? 'text-orange-600 dark:text-orange-400'
                                : 'text-gray-500'
                          }`}>
                            {debt.status === 'paid' 
                              ? t('debt.paid')
                              : `${daysOverdue} ${t('debt.days')}`
                            }
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(debt.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {debt.status === 'pending' ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(debt, 'paid')}
                                disabled={updateDebtMutation.isPending}
                                className="text-green-600 border-green-600 hover:bg-green-50"
                              >
                                <Check className="w-3 h-3 mr-1" />
                                {t('debt.markPaid')}
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(debt, 'pending')}
                                disabled={updateDebtMutation.isPending}
                                className="text-orange-600 border-orange-600 hover:bg-orange-50"
                              >
                                <Clock className="w-3 h-3 mr-1" />
                                {t('debt.markPending')}
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('common.showingResults', {
                  start: (pagination.page - 1) * pagination.limit + 1,
                  end: Math.min(pagination.page * pagination.limit, pagination.total),
                  total: pagination.total
                })}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage <= 1}
                >
                  {t('common.previous')}
                </Button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentPage} / {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
                  disabled={currentPage >= pagination.totalPages}
                >
                  {t('common.next')}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 