import { DashboardListPage } from '@/domain/dashboard/DashboardListPage'
import ProtectedRoute from '@/domain/ProtectedRoute'

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <DashboardListPage />
    </ProtectedRoute>
  )
}

export default Dashboard
