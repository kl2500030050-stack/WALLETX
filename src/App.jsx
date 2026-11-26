import { Navigate, Route, Routes } from 'react-router-dom'
import { useWallet } from './context/WalletContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import { Login, Register } from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Wallet from './pages/Wallet'
import Transfer from './pages/Transfer'
import QRPayment from './pages/QRPayment'
import BillPayment from './pages/BillPayment'
import TransactionHistory from './pages/TransactionHistory'
import Profile from './pages/Profile'
export default function App() {
 const { user } = useWallet()
 return <Routes>
  <Route path="/" element={<Navigate to={user?'/dashboard':'/login'} replace/>}/>
  <Route path="/login" element={user?<Navigate to="/dashboard" replace/>:<Login/>}/>
  <Route path="/register" element={user?<Navigate to="/dashboard" replace/>:<Register/>}/>
  <Route element={<ProtectedRoute/>}><Route element={<Layout/>}>
   <Route path="/dashboard" element={<Dashboard/>}/>
   <Route path="/wallet" element={<Wallet/>}/>
   <Route path="/transfer" element={<Transfer/>}/>
   <Route path="/qr-payment" element={<QRPayment/>}/>
   <Route path="/bills" element={<BillPayment/>}/>
   <Route path="/transactions" element={<TransactionHistory/>}/>
   <Route path="/profile" element={<Profile/>}/>
  </Route></Route>
  <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes>
}
