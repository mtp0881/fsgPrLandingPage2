'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminPanel() {
  const [message] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600 mt-2">Website Content Management</p>
            </div>
            <Link 
              href="/" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>

          {message && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Content Management</h2>
              <p className="text-gray-600 text-sm">Edit the website content and translations</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Media Management</h2>
              <p className="text-gray-600 text-sm">Upload and manage images and documents</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Settings</h2>
              <p className="text-gray-600 text-sm">Configure website settings and preferences</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h2>
              <p className="text-gray-600 text-sm">View website traffic and analytics</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Getting Started</h3>
            <ul className="text-yellow-800 space-y-2 text-sm">
              <li>• Edit content in <code className="bg-white px-2 py-1 rounded">/data/content.json</code></li>
              <li>• Customize text in <code className="bg-white px-2 py-1 rounded">/app/contexts/LanguageContext.tsx</code></li>
              <li>• Modify components in the <code className="bg-white px-2 py-1 rounded">/app/components</code> directory</li>
              <li>• Update styles in <code className="bg-white px-2 py-1 rounded">/app/globals.css</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
