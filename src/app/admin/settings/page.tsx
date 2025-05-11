"use client";

import React, { useState } from 'react';
import Header from '@/components/admin/Header';
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

export default function SettingsPage() {
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
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 overflow-y-auto pb-10">
        <div className="p-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Manage your account and application preferences
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
                Profile
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
                Appearance
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
                Notifications
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
                Account Security
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">User Profile</h2>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400">
                      A
                    </div>
                    <div>
                      <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        Change Photo
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
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
                        Email Address
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
                        Job Title
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
                        Phone Number
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
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Appearance</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Switch between light and dark mode
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
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">Language</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Select your preferred language
                        </p>
                      </div>
                      <div className="relative">
                        <select className="block appearance-none bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">Time Zone</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Set your local time zone
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
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">Enable Notifications</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive alerts for important updates
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
                        <h3 className="text-md font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications via email
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
                    
                    <h3 className="text-md font-medium text-gray-900 dark:text-white mt-6">Notification Categories</h3>
                    
                    <div className="space-y-4 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        <input
                          id="notify-inventory"
                          type="checkbox"
                          defaultChecked={true}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="notify-inventory" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Inventory alerts (low stock, out of stock)
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="notify-orders"
                          type="checkbox"
                          defaultChecked={true}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="notify-orders" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          New orders and sales
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="notify-system"
                          type="checkbox"
                          defaultChecked={true}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="notify-system" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          System updates and maintenance
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="notify-reports"
                          type="checkbox"
                          defaultChecked={false}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="notify-reports" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Reports and analytics
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Account Security</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Change Password</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Current Password
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
                            New Password
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
                            Confirm New Password
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
                    
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Security Settings</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            id="two-factor"
                            type="checkbox"
                            defaultChecked={false}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="two-factor" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Enable two-factor authentication
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="login-notification"
                            type="checkbox"
                            defaultChecked={true}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="login-notification" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Email me when there's a new login to my account
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer with save button */}
            <div className="p-6 border-t border-gray-200 dark:border-slate-700 flex justify-end">
              <button
                onClick={handleSaveChanges}
                disabled={savingChanges}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {savingChanges ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 