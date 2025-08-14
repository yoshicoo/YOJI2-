import { createClient } from '@/lib/supabase/server'
import ForecastTable from '@/components/forecast/ForecastTable'
import ForecastFilters from '@/components/forecast/ForecastFilters'
import ForecastActions from '@/components/forecast/ForecastActions'

export default async function ForecastPage() {
  const supabase = await createClient()
  
  // 従業員データを取得
  const { data: employees } = await supabase
    .from('employees')
    .select(`
      *,
      recruiter:recruiter_id(name)
    `)
    .order('created_at', { ascending: false })
    .limit(25)

  // 部署・職種マスタを取得
  const { data: departments } = await supabase
    .from('departments')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  const { data: roles } = await supabase
    .from('roles')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  // カテゴリと項目を取得
  const { data: categories } = await supabase
    .from('categories')
    .select(`
      *,
      fields (*)
    `)
    .eq('is_active', true)
    .order('display_order')

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">予実管理</h1>
        <p className="text-gray-600 mt-1">入社者情報の管理と編集</p>
      </div>

      <div className="space-y-4">
        {/* フィルタエリア */}
        <ForecastFilters 
          departments={departments || []}
          roles={roles || []}
        />

        {/* アクションエリア */}
        <ForecastActions />

        {/* テーブルエリア */}
        <ForecastTable 
          employees={employees || []}
          categories={categories || []}
        />
      </div>
    </div>
  )
}