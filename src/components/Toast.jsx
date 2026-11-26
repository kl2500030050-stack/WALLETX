import { CheckCircle2, AlertCircle, X } from 'lucide-react'
import { useWallet } from '../context/WalletContext'
export default function Toast() {
  const { toast } = useWallet()
  if (!toast) return null
  const Icon = toast.type === 'error' ? AlertCircle : CheckCircle2
  return <div className="fixed top-5 right-5 z-[100] flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl"><Icon size={18} className={toast.type==='error'?'text-rose-400':'text-emerald-400'}/>{toast.message}<X size={15}/></div>
}
