"use client";

import React from 'react';
import Header from '@/components/admin/Header';
import { Calendar, RefreshCw, ArrowRight, Clock, FileCheck, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function RolloverPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Month Rollover</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Finalize your monthly reports and prepare for the next accounting period
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link 
              href="/admin/rollover/monthly"
              className="block p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4">
                  <Calendar size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Monthly Reports</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">View, export, and finalize your monthly inventory and sales reports</p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400">
                    <span className="text-sm font-medium">View monthly reports</span>
                    <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            </Link>
            
            <div className="block p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-4">
                  <Clock size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Quarterly Reports</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">View and export quarterly summaries of your business performance</p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <span className="text-sm font-medium">Coming soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Month Rollover Guide</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 flex h-6 items-center">
                    <div className="h-full w-0.5 bg-indigo-600 dark:bg-indigo-500"></div>
                  </div>
                  <div className="flex items-start ml-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                        1
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Review current month data</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Make sure all sales, purchases, and inventory adjustments are properly recorded for the current month before proceeding with rollover.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex h-6 items-center">
                    <div className="h-full w-0.5 bg-indigo-600 dark:bg-indigo-500"></div>
                  </div>
                  <div className="flex items-start ml-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                        2
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Export monthly report</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Export your monthly report to CSV for your records and accounting purposes.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex h-6 items-center">
                    <div className="h-full w-0.5 bg-indigo-600 dark:bg-indigo-500"></div>
                  </div>
                  <div className="flex items-start ml-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                        3
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Finalize the month</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Click on "Rollover to Next Month" button to close the current accounting period and prepare for the next month.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex h-6 items-center">
                    <div className="h-full w-0.5 bg-transparent"></div>
                  </div>
                  <div className="flex items-start ml-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                        4
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Verify rollover success</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Ensure the system has properly transitioned to the new month and that beginning inventory balances are correct.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">Important Note</h3>
                <div className="mt-2 text-sm text-amber-700 dark:text-amber-400">
                  <p>
                    Monthly rollover is a critical accounting procedure. Once a month is finalized, you cannot edit its data.
                    Make sure all transactions are properly recorded before proceeding with the month-end rollover.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 