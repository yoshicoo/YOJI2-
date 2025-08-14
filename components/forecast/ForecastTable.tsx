'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown, MoreVertical, Edit2, MessageSquare, Clock } from 'lucide-react'
import EmployeeDetailModal from './EmployeeDetailModal'

interface ForecastTableProps {
  employees: any[]
  categories: any[]
}

export default function ForecastTable({ employees, categories }: ForecastTableProps) {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [editingCell, setEditingCell] = useState<{ row: number; col: string } | null>(null)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleCellClick = (rowIndex: number, field: string) => {
    setEditingCell({ row: rowIndex, col: field })
  }

  const handleCellBlur = () => {
    // TODO: 保存処理
    setEditingCell(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '完了':
        return 'bg-green-100 text-green-800'
      case '進行中':
        return 'bg-blue-100 text-blue-800'
      case '未着手':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const recruitmentTypeLabels: { [key: string]: string } = {
    new_graduate: '新卒',
    mid_career: '中途',
    contract: '契約',
    part_time: 'パート',
    intern: 'インターン'
  }

  const employmentTypeLabels: { [key: string]: string } = {
    full_time: '正社員',
    contract: '契約社員',
    part_time: 'パート',
    temporary: '派遣',
    intern: 'インターン'
  }

  return (
    <>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <div 
                    className="flex items-center cursor-pointer text-xs font-medium text-gray-600 uppercase tracking-wider"
                    onClick={() => handleSort('id')}
                  >
                    No.
                    {sortField === 'id' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div 
                    className="flex items-center cursor-pointer text-xs font-medium text-gray-600 uppercase tracking-wider"
                    onClick={() => handleSort('name')}
                  >
                    氏名
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                    部署
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div 
                    className="flex items-center cursor-pointer text-xs font-medium text-gray-600 uppercase tracking-wider"
                    onClick={() => handleSort('join_date')}
                  >
                    入社日
                    {sortField === 'join_date' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                    採用区分
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                    雇用形態
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                    採用人事ST
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                    情シスST
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                    労務ST
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                    操作
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee, index) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <button 
                      className="text-primary hover:underline font-medium"
                      onClick={() => setSelectedEmployee(employee)}
                    >
                      {String(index + 1).padStart(3, '0')}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    {editingCell?.row === index && editingCell?.col === 'name' ? (
                      <input
                        type="text"
                        defaultValue={employee.name}
                        className="input-field w-full"
                        onBlur={handleCellBlur}
                        autoFocus
                      />
                    ) : (
                      <div 
                        className="cursor-pointer hover:bg-gray-100 px-2 py-1 -mx-2 -my-1 rounded"
                        onClick={() => handleCellClick(index, 'name')}
                      >
                        {employee.name}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingCell?.row === index && editingCell?.col === 'department' ? (
                      <input
                        type="text"
                        defaultValue={employee.department}
                        className="input-field w-full"
                        onBlur={handleCellBlur}
                        autoFocus
                      />
                    ) : (
                      <div 
                        className="cursor-pointer hover:bg-gray-100 px-2 py-1 -mx-2 -my-1 rounded"
                        onClick={() => handleCellClick(index, 'department')}
                      >
                        {employee.department || '-'}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {employee.join_date ? new Date(employee.join_date).toLocaleDateString('ja-JP') : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {recruitmentTypeLabels[employee.recruitment_type] || '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                      {employmentTypeLabels[employee.employment_type] || '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(employee.hr_status || '未着手')}`}>
                      {employee.hr_status || '未着手'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(employee.it_status || '未着手')}`}>
                      {employee.it_status || '未着手'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(employee.hr_admin_status || '未着手')}`}>
                      {employee.hr_admin_status || '未着手'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="text-gray-400 hover:text-gray-600"
                        title="編集"
                        onClick={() => setSelectedEmployee(employee)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-gray-600"
                        title="コメント"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-gray-600"
                        title="履歴"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ページネーション */}
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              {employees.length}件中 1-{Math.min(25, employees.length)}件を表示
            </div>
            <div className="flex items-center space-x-2">
              <button className="btn-secondary px-3 py-1 text-sm" disabled>
                &lt;&lt;
              </button>
              <button className="btn-secondary px-3 py-1 text-sm" disabled>
                &lt;
              </button>
              <button className="btn-primary px-3 py-1 text-sm">
                1
              </button>
              <button className="btn-secondary px-3 py-1 text-sm">
                2
              </button>
              <button className="btn-secondary px-3 py-1 text-sm">
                3
              </button>
              <button className="btn-secondary px-3 py-1 text-sm">
                &gt;
              </button>
              <button className="btn-secondary px-3 py-1 text-sm">
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 詳細モーダル */}
      {selectedEmployee && (
        <EmployeeDetailModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </>
  )
}