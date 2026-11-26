import { Navigate, Outlet } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
export default function ProtectedRoute() {
  const { user } = useWallet()
  return user ? <Outlet /> : <Navigate to="/login" replace />
}
