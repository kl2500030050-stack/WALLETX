import { useState } from 'react'
import { UserRound, Mail, ShieldCheck } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { useWallet } from '../context/WalletContext'
export default function Profile(){
 const {user,updateProfile,notify}=useWallet();const [name,setName]=useState(user?.name||'')
 const submit=e=>{e.preventDefault();if(!name.trim()){notify('Name cannot be empty','error');return}updateProfile({name})}
 return <><SectionHeader title="Profile" subtitle="Manage your personal account information."/><div className="panel max-w-2xl p-6 md:p-8"><div className="mb-7 flex items-center gap-4"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#6258df] text-2xl font-extrabold text-white">{user?.name?.[0]?.toUpperCase()}</div><div><div className="text-lg font-extrabold dark:text-white">{user?.name}</div><div className="text-sm text-slate-400">Moneta wallet member</div></div></div><form onSubmit={submit} className="space-y-5"><label className="block text-sm font-bold dark:text-slate-200">Full name<input className="field mt-2" value={name} onChange={e=>setName(e.target.value)}/></label><label className="block text-sm font-bold dark:text-slate-200">Email address<div className="relative mt-2"><Mail className="absolute left-3 top-3 text-slate-400" size={17}/><input disabled className="field bg-slate-50 pl-10 opacity-70 dark:bg-slate-800" value={user?.email||''}/></div></label><div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"><ShieldCheck className="mr-2 inline" size={17}/>Your demo profile is stored locally in this browser.</div><button className="btn-primary">Save changes</button></form></div></>
}
