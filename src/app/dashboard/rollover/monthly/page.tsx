"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
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
import { Loader2, AlertTriangle, Download, ChevronLeft, ChevronRight } from "lucide-react";

export default function MonthlyRolloverPage() {
  const { t } = useTranslation();
  const [reportData, setReportData] = useState<MonthlyReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRolloverLoading, setIsRolloverLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRolloverDialog, setShowRolloverDialog] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Add state for selected month/year navigation
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedMonth, setSelectedMonth] = useState<number>();

  // Use useMemo to get current date values
  const { currentYear: todayYear, currentMonth: todayMonth } = useMemo(() => {
    const date = new Date();
    return {
      currentYear: date.getFullYear(),
      currentMonth: date.getMonth() + 1,
    };
  }, []);

  // Initialize selected date to current date
  useEffect(() => {
    if (!selectedYear && !selectedMonth) {
      setSelectedYear(todayYear);
      setSelectedMonth(todayMonth);
    }
  }, [todayYear, todayMonth, selectedYear, selectedMonth]);

  // Create display values
  const displayYear = selectedYear || todayYear;
  const displayMonth = selectedMonth || todayMonth;
  const currentMonthYear = `${displayYear}-${String(displayMonth).padStart(2, "0")}`;
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
  const isCurrentMonth = displayYear === todayYear && displayMonth === todayMonth;

  const fetchMonthlyReport = useCallback(async () => {
    if (!selectedYear || !selectedMonth) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchMonthlyReportData(selectedYear, selectedMonth);
      setReportData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      fetchMonthlyReport();
    }
  }, [fetchMonthlyReport, selectedYear, selectedMonth]);

  const handleRollover = async () => {
    if (!selectedYear || !selectedMonth) return;
    
    setIsRolloverLoading(true);

    try {
      await initiateMonthlyRollover(selectedYear, selectedMonth);

      toast.success(t("monthlyRollover.rolloverSuccessMessage"));
      setShowRolloverDialog(false);
      await fetchMonthlyReport();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : t("monthlyRollover.rolloverErrorMessage")
      );
    } finally {
      setIsRolloverLoading(false);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (!selectedYear || !selectedMonth) return;
    
    let newMonth = selectedMonth;
    let newYear = selectedYear;
    
    if (direction === 'prev') {
      newMonth -= 1;
      if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
      }
    } else {
      newMonth += 1;
      if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      }
    }
    
    setSelectedYear(newYear);
    setSelectedMonth(newMonth);
  };

  const handleExcelDownload = async () => {
    if (!reportData) return;
    
    setIsDownloading(true);
    
    try {
      const response = await fetch(
        `/api/reports/monthly/export?year=${reportData.year}&month=${reportData.month}`,
        {
          method: 'GET',
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to download Excel report');
      }
      
      // Get the blob from response
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from response headers or create default
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `Monthly_Rollover_Report_${reportData.year}_${reportData.month}.xlsx`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success(t("monthlyRollover.excelDownloadSuccess"));
    } catch (error) {
      console.error('Error downloading Excel report:', error);
      toast.error(t("monthlyRollover.excelDownloadError"));
    } finally {
      setIsDownloading(false);
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
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {t("monthlyRollover.title")}
              </h1>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-3 py-1 text-sm font-medium min-w-[140px] text-center">
                  {monthNames[displayMonth - 1]} {displayYear}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              {!isCurrentMonth && (
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                  Historical
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t("monthlyRollover.description")}
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            {reportData?.isRolledOver && (
              <Button
                onClick={handleExcelDownload}
                disabled={isDownloading}
                className="bg-green-600 hover:bg-green-700 text-white"
                variant="outline"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("monthlyRollover.downloadingExcel")}
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    {t("monthlyRollover.downloadExcel")}
                  </>
                )}
              </Button>
            )}
            {/* Only show rollover button for current month */}
            {isCurrentMonth && (
              <Button
                onClick={() => setShowRolloverDialog(true)}
                disabled={isRolloverLoading || reportData?.isRolledOver}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {reportData?.isRolledOver
                  ? t("monthlyRollover.alreadyRolledOver")
                  : t("monthlyRollover.initiateRollover")}
              </Button>
            )}
          </div>
        </div>
        {reportData?.isRolledOver && (
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
                  {reportData.productsData && reportData.productsData.length > 0 ? (
                    reportData.productsData.map((item: ProductMonthlyData) => (
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No product data available for this period.
                      </TableCell>
                    </TableRow>
                  )}
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("monthlyRollover.understanding.title")}</h2>
          </div>
          
          <div className="text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              {t("monthlyRollover.understanding.description")}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t("monthlyRollover.understanding.dataFinalization.title")}</h3>
                <p className="text-sm">
                  {t("monthlyRollover.understanding.dataFinalization.description")}
                </p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t("monthlyRollover.understanding.inventoryCarryOver.title")}</h3>
                <p className="text-sm">
                  {t("monthlyRollover.understanding.inventoryCarryOver.description")}
                </p>
              </div>
            </div>
            <p className="text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-md">
              <strong>{t("monthlyRollover.understanding.important")}</strong> {t("monthlyRollover.understanding.importantNote")} <strong>{t("monthlyRollover.understanding.before")}</strong> {t("monthlyRollover.understanding.cannotUndo")}
            </p>
          </div>
        </div>
    </div>
  );
} 