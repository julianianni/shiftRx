import ProtectedRoute from '@/domain/ProtectedRoute'

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div>Dashboard Content</div>
    </ProtectedRoute>
  )
}

export default Dashboard
