'use client'

import { useState } from 'react'
import { 
  Layers, 
  Shield, 
  Users, 
  Globe, 
  Database,
  ChevronRight
} from 'lucide-react'
import CategorySettings from '@/components/settings/CategorySettings'
import PermissionSettings from '@/components/settings/PermissionSettings'
import AccountSettings from '@/components/settings/AccountSettings'
import IPSettings from '@/components/settings/IPSettings'
import MasterSettings from '@/components/settings/MasterSettings'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('categories')

  const tabs = [
    { id: 'categories', label: 'カテゴリ・項目', icon: Layers },
    { id: 'permissions', label: '権限管理', icon: Shield },
    { id: 'accounts', label: 'アカウント管理', icon: Users },
    { id: 'ip', label: 'IP制限設定', icon: Globe },
    { id: 'masters', label: 'マスタ管理', icon: Database },
  ]

  return (
    <div className="flex h-full">
      {/* サブメニュー */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800">設定</h1>
        </div>
        <nav className="px-4 pb-6">
          <ul className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors
                      ${activeTab === tab.id 
                        ? 'bg-blue-50 text-primary' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <Icon className="w-4 h-4 mr-3" />
                      {tab.label}
                    </div>
                    {activeTab === tab.id && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'categories' && <CategorySettings />}
        {activeTab === 'permissions' && <PermissionSettings />}
        {activeTab === 'accounts' && <AccountSettings />}
        {activeTab === 'ip' && <IPSettings />}
        {activeTab === 'masters' && <MasterSettings />}
      </div>
    </div>
  )
}