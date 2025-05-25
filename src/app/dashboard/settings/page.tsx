"use client";

import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Moon, 
  Sun, 
  Save, 
  ChevronDown, 
  Shield, 
  Globe,
  Briefcase
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function SettingsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [savingChanges, setSavingChanges] = useState(false);
  
  const handleSaveChanges = async () => {
    setSavingChanges(true);
    // Simulate saving to the server
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSavingChanges(false);
  };
  
  return (
    <div>
      <div className="flex-grow bg-gray-50 dark:bg-slate-900 overflow-y-auto pb-10">
        <div className="p-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{t('settings.generalSettings')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('settings.manageAccount')}
          </p>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-slate-700">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-3 text-sm font-medium flex items-center ${
                  activeTab === 'profile'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <User size={16} className="mr-2" />
                {t('settings.profile')}
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`px-4 py-3 text-sm font-medium flex items-center ${
                  activeTab === 'appearance'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Sun size={16} className="mr-2" />
                {t('settings.appearance')}
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`px-4 py-3 text-sm font-medium flex items-center ${
                  activeTab === 'notifications'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Bell size={16} className="mr-2" />
                {t('settings.notifications')}
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`px-4 py-3 text-sm font-medium flex items-center ${
                  activeTab === 'account'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Shield size={16} className="mr-2" />
                {t('settings.accountSecurity')}
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">{t('settings.userProfile')}</h2>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400">
                      A
                    </div>
                    <div>
                      <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        {t('settings.changePhoto')}
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('settings.fullName')}
                      </label>
                      <input
                        type="text"
                        defaultValue="Admin User"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm
                          text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700
                          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('settings.emailAddress')}
                      </label>
                      <input
                        type="email"
                        defaultValue="admin@example.com"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm
                          text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700
                          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('settings.jobTitle')}
                      </label>
                      <input
                        type="text"
                        defaultValue="Store Manager"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm
                          text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700
                          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('settings.phoneNumber')}
                      </label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm
                          text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700
                          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">{t('settings.appearance')}</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">{t('settings.darkMode')}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t('settings.switchDarkMode')}
                        </p>
                      </div>
                      <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                          </span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">{t('settings.language')}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t('settings.selectLanguage')}
                        </p>
                      </div>
                      <div className="relative">
                        <select className="block appearance-none bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>{t('common.english')}</option>
                          <option>{t('common.russian')}</option>
                          <option>{t('common.uzbek')}</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">{t('settings.timeZone')}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t('settings.setTimeZone')}
                        </p>
                      </div>
                      <div className="relative">
                        <select className="block appearance-none bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>UTC (GMT+0)</option>
                          <option>Eastern Time (GMT-5)</option>
                          <option>Central Time (GMT-6)</option>
                          <option>Pacific Time (GMT-8)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">{t('settings.notifications')}</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">{t('settings.enableNotifications')}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t('settings.receiveAlerts')}
                        </p>
                      </div>
                      <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationsEnabled}
                            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">{t('settings.emailNotifications')}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t('settings.receiveEmailAlerts')}
                        </p>
                      </div>
                      <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">{t('settings.accountSecurity')}</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">{t('settings.changePassword')}</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('settings.currentPassword')}
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm
                              text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700
                              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('settings.newPassword')}
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm
                              text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700
                              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('settings.confirmPassword')}
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm
                              text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700
                              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSaveChanges}
                  disabled={savingChanges}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {savingChanges ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {t('common.loading')}
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      {t('settings.saveChanges')}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 