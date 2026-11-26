import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Wallet, ArrowLeftRight, QrCode, ReceiptText, History, UserRound, LogOut, Sun, Moon, Menu, X, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '../context/WalletContext'
import Toast from './Toast'
const links = [
  ['Dashboard','/dashboard',LayoutDashboard],['My Wallet','/wallet',Wallet],['Transfer','/transfer',ArrowLeftRight],
  ['QR Payments','/qr-payment',QrCode],['Bill Payments','/bills',ReceiptText],['Transactions','/transactions',History],['Profile','/profile',UserRound]
]
export default function Layout() {
  const { user, logout, theme, setTheme } = useWallet()
  const [open,setOpen] = useState(false)
  const navigate = useNavigate()
  const exit = () => { logout(); navigate('/login') }
  return <div className="app-shell flex">
    {open && <div className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={()=>setOpen(false)} />}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[255px] flex-col border-r border-slate-100 bg-white px-5 py-6 transition-transform dark:border-slate-800 dark:bg-[#172235] lg:static lg:translate-x-0 ${open?'translate-x-0':'-translate-x-full'}`}>
      <div className="mb-10 flex items-center justify-between px-2"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#6258df] text-white"><Sparkles size={21}/></div><div className="text-xl font-extrabold tracking-tight dark:text-white">moneta<span className="text-[#6258df]">.</span><div className="text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">Digital wallet</div></div></div><button className="lg:hidden" onClick={()=>setOpen(false)}><X/></button></div>
      <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Workspace</div>
      <nav className="space-y-1">{links.map(([label,path,Icon])=><NavLink key={path} to={path} onClick={()=>setOpen(false)} className={({isActive})=>`nav-item ${isActive?'active':''}`}><Icon size={18}/>{label}</NavLink>)}</nav>
      <div className="mt-auto rounded-2xl bg-[#f4f2ff] p-4 dark:bg-[#29284d]"><div className="mb-2 text-xs font-bold text-[#6258df]">MONETA PLUS</div><p className="mb-3 text-xs leading-5 text-slate-500 dark:text-slate-300">Your money, organized in one place.</p><div className="h-1.5 overflow-hidden rounded-full bg-white/80"><div className="h-full w-3/4 rounded-full bg-[#6258df]"/></div></div>
      <button onClick={exit} className="mt-5 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-500 hover:bg-rose-50 hover:text-rose-600"><LogOut size={18}/>Log out</button>
    </aside>
    <main className="min-w-0 flex-1">
      <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-100 bg-white/90 px-5 backdrop-blur dark:border-slate-800 dark:bg-[#172235]/90 md:px-9">
        <div className="flex items-center gap-3"><button onClick={()=>setOpen(true)} className="rounded-lg p-2 text-slate-500 lg:hidden"><Menu/></button><div><div className="text-sm font-bold dark:text-white">Good day, {user?.name?.split(' ')[0]} 👋</div><div className="text-xs text-slate-400">Here’s your financial overview</div></div></div>
        <div className="flex items-center gap-3"><button onClick={()=>setTheme(theme==='dark'?'light':'dark')} className="rounded-xl border border-slate-200 p-2.5 text-slate-500 dark:border-slate-700 dark:text-slate-200">{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button><button onClick={()=>navigate('/profile')} className="flex items-center gap-2 rounded-full bg-[#efedff] p-1 pr-3 dark:bg-[#302e5c]"><div className="grid h-9 w-9 place-items-center rounded-full bg-[#6258df] text-sm font-bold text-white">{user?.name?.[0]?.toUpperCase()}</div><span className="hidden text-xs font-bold text-slate-600 dark:text-slate-200 sm:block">{user?.name}</span></button></div>
      </header>
      <div className="mx-auto max-w-[1450px] p-5 md:p-9"><Outlet/></div>
    </main><Toast/>
  </div>
}
