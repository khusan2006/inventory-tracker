"use client";
import React from 'react';
import { Calendar, FileText, Info, TrendingUp, HelpCircle, Edit3, Settings } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function RolloverPage() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Calendar size={38} className="text-blue-500 dark:text-blue-400" />,
      title: t('rolloverPage.monthlyRollover.title'),
      description: t('rolloverPage.monthlyRollover.description'),
      link: "/dashboard/rollover/monthly",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "hover:border-blue-300 dark:hover:border-blue-600",
      shadowColor: "hover:shadow-blue-500/10",
      textColor: "text-blue-600 dark:text-blue-300",
    },
    {
      icon: <FileText size={38} className="text-green-500 dark:text-green-400" />,
      title: t('rolloverPage.rolloverHistory.title'),
      description: t('rolloverPage.rolloverHistory.description'),
      link: "#", // Placeholder link
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "hover:border-green-300 dark:hover:border-green-600",
      shadowColor: "hover:shadow-green-500/10",
      textColor: "text-green-600 dark:text-green-300",
      disabled: true,
    },
    {
      icon: <TrendingUp size={38} className="text-purple-500 dark:text-purple-400" />,
      title: t('rolloverPage.trendAnalysis.title'),
      description: t('rolloverPage.trendAnalysis.description'),
      link: "#", // Placeholder link
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "hover:border-purple-300 dark:hover:border-purple-600",
      shadowColor: "hover:shadow-purple-500/10",
      textColor: "text-purple-600 dark:text-purple-300",
      disabled: true,
    },
    {
      icon: <Edit3 size={38} className="text-yellow-500 dark:text-yellow-400" />,
      title: t('rolloverPage.adjustments.title'),
      description: t('rolloverPage.adjustments.description'),
      link: "#", // Placeholder link
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "hover:border-yellow-300 dark:hover:border-yellow-600",
      shadowColor: "hover:shadow-yellow-500/10",
      textColor: "text-yellow-600 dark:text-yellow-300",
      disabled: true,
    },
    {
      icon: <HelpCircle size={38} className="text-red-500 dark:text-red-400" />,
      title: t('rolloverPage.support.title'),
      description: t('rolloverPage.support.description'),
      link: "#", // Placeholder link
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "hover:border-red-300 dark:hover:border-red-600",
      shadowColor: "hover:shadow-red-500/10",
      textColor: "text-red-600 dark:text-red-300",
      disabled: true,
    },
     {
      icon: <Settings size={38} className="text-indigo-500 dark:text-indigo-400" />,
      title: t('rolloverPage.settings.title'),
      description: t('rolloverPage.settings.description'),
      link: "#", // Placeholder link
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      borderColor: "hover:border-indigo-300 dark:hover:border-indigo-600",
      shadowColor: "hover:shadow-indigo-500/10",
      textColor: "text-indigo-600 dark:text-indigo-300",
      disabled: true,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {t('rolloverPage.headerTitle')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('rolloverPage.headerSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Link key={index} href={feature.disabled ? "#" : feature.link} passHref>
            <div
              className={`p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out 
                        ${feature.bgColor} 
                        ${feature.borderColor} 
                        ${feature.shadowColor} 
                        ${feature.disabled ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              <div className="mb-4">{feature.icon}</div>
              <h2 className={`text-xl font-semibold mb-2 ${feature.textColor.replace("text-", "text-")}`}>
                {feature.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {feature.description}
              </p>
              <div className={`text-sm font-medium ${feature.textColor}`}>
                {feature.disabled ? t('comingSoon') : t('rolloverPage.viewFeature')}
                 {!feature.disabled && <span className="ml-1">→</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Info size={24} className="text-blue-600 dark:text-blue-400 mr-3" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('rolloverPage.importantNotes.title')}
          </h2>
        </div>
        <div className="text-gray-700 dark:text-gray-300 space-y-3">
          <p>
            {t('rolloverPage.importantNotes.p1')}
          </p>
          <p>
            {t('rolloverPage.importantNotes.p2')}
          </p>
           <p className="text-sm text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-md">
            <strong>{t('rolloverPage.importantNotes.warningTitle')}</strong> {t('rolloverPage.importantNotes.warningText')}
          </p>
        </div>
      </div>
    </div>
  );
} 