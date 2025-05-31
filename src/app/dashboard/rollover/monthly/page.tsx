"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  fetchMonthlyReportData,
  initiateMonthlyRollover,
  ProductMonthlyData,
  MonthlyReportData,
} from "@/app/api/reports/monthly";
import { Loader2, AlertTriangle } from "lucide-react";

export default function MonthlyRolloverPage() {
  const { t } = useTranslation();
  const [reportData, setReportData] = useState<MonthlyReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRolloverLoading, setIsRolloverLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRolloverDialog, setShowRolloverDialog] = useState(false);
  const [currentMonthYear, setCurrentMonthYear] = useState("");

  const fetchMonthlyReport = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      setCurrentMonthYear(
        `${year}-${month.toString().padStart(2, "0")}`
      );

      const data = await fetchMonthlyReportData(year, month);
      setReportData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t("monthlyRollover.fetchError")
      );
      toast.error(t("monthlyRollover.fetchErrorToast"));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchMonthlyReport();
  }, [fetchMonthlyReport]);

  const handleRollover = async () => {
    setIsRolloverLoading(true);
    setShowRolloverDialog(false);

    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      await initiateMonthlyRollover(year, month);
      toast.success(t("monthlyRollover.rolloverSuccessToast"));
      fetchMonthlyReport();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : t("monthlyRollover.rolloverErrorToast")
      );
    } finally {
      setIsRolloverLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">
          {t("monthlyRollover.loadingReport")}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-red-600 mb-2">
          {t("monthlyRollover.errorTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
        <Button onClick={fetchMonthlyReport}>
          {t("monthlyRollover.retry")}
        </Button>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
          {t("monthlyRollover.noDataTitle")}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {t("monthlyRollover.noDataText")}
        </p>
        <Button onClick={fetchMonthlyReport}>
          {t("monthlyRollover.refresh")}
        </Button>
      </div>
    );
  }

  const summaryCards = [
    {
      title: t("monthlyRollover.totalRevenue"),
      value: `$${reportData.summary.totalRevenue.toFixed(2)}`,
    },
    {
      title: t("monthlyRollover.totalCOGS"),
      value: `$${reportData.summary.totalCostOfGoodsSold.toFixed(2)}`,
    },
    {
      title: t("monthlyRollover.totalProfit"),
      value: `$${(
        reportData.summary.totalRevenue -
        reportData.summary.totalCostOfGoodsSold
      ).toFixed(2)}`,
    },
    {
      title: t("monthlyRollover.productsReported"),
      value: reportData.productsData.length.toString(),
    },
  ];

  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {t("monthlyRollover.title")} - {currentMonthYear}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t("monthlyRollover.description")}
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button
              onClick={() => setShowRolloverDialog(true)}
              disabled={isRolloverLoading || reportData.isRolledOver}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {reportData.isRolledOver
                ? t("monthlyRollover.alreadyRolledOver")
                : t("monthlyRollover.initiateRollover")}
            </Button>
          </div>
        </div>
        {reportData.isRolledOver && (
          <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-md">
            <p className="text-sm text-green-700 dark:text-green-300">
              {t("monthlyRollover.rolloverCompleteMessage", {
                month: reportData.month,
                year: reportData.year,
              })}
            </p>
          </div>
        )}
      </header>

      {isRolloverLoading && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t("monthlyRollover.rolloverProgress")}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t("monthlyRollover.rolloverInProgressMessage")}
          </p>
        </div>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {summaryCards.map((card, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
              {t("monthlyRollover.detailedReportTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("monthlyRollover.table.product")}</TableHead>
                    <TableHead className="text-right">
                      {t("monthlyRollover.table.startingInventory")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("monthlyRollover.table.purchases")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("monthlyRollover.table.sales")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("monthlyRollover.table.endingInventory")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("monthlyRollover.table.cogs")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("monthlyRollover.table.revenue")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("monthlyRollover.table.profit")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.productsData.map((item: ProductMonthlyData) => (
                    <TableRow key={item.productId}>
                      <TableCell className="font-medium">
                        {item.productName}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.startingInventory}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.purchases}
                      </TableCell>
                      <TableCell className="text-right">{item.sales}</TableCell>
                      <TableCell className="text-right">
                        {item.endingInventory}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.costOfGoodsSold.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.revenue.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.profit.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      <AlertDialog open={showRolloverDialog} onOpenChange={setShowRolloverDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("monthlyRollover.confirmRolloverTitle")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("monthlyRollover.confirmRolloverDescriptionP1")}
              <br />
              <br />
              <strong>
                {t("monthlyRollover.confirmRolloverDescriptionP2")}
              </strong>{" "}
              {t("monthlyRollover.confirmRolloverDescriptionP3", {
                month: currentMonthYear.split("-")[1],
                year: currentMonthYear.split("-")[0],
              })}
              <br /> <br />
              {t("monthlyRollover.confirmRolloverDescriptionP4")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("monthlyRollover.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRollover}
              className={`bg-blue-600 hover:bg-blue-700 ${isRolloverLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isRolloverLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  {t("monthlyRollover.processing")}
                </>
              ) : (
                t("monthlyRollover.confirmAndProceed")
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="mt-12 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Understanding Your Rollover</h2>
          </div>
          
          <div className="text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              The <strong>Monthly Rollover</strong> process is crucial for accurate accounting and inventory management. It finalizes the current month&apos;s data and prepares the system for the next operational period.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data Finalization</h3>
                <p className="text-sm">
                  Once a rollover is initiated, all transactions for the current month are locked. This ensures data integrity for reporting.
                </p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Inventory Carry-Over</h3>
                <p className="text-sm">
                  Ending inventory counts from the current month automatically become the starting inventory for the next month.
                </p>
              </div>
            </div>
            <p className="text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-md">
              <strong>Important:</strong> Please ensure all sales, purchases, and adjustments for the month are accurately recorded <strong>before</strong> initiating the rollover. This action cannot be undone.
            </p>
          </div>
        </div>
    </div>
  );
} 