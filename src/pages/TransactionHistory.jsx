import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { useWallet } from '../context/WalletContext'
import TransactionList from '../components/TransactionList'
import TransactionModal from '../components/TransactionModal'
export default function TransactionHistory(){
 const {transactions}=useWallet();const [search,setSearch]=useState(''),[category,setCategory]=useState('All'),[sort,setSort]=useState('newest'),[selected,setSelected]=useState(null)
 const categories=['All',...new Set(transactions.map(t=>t.category))]
 const items=useMemo(()=>transactions.filter(t=>(category==='All'||t.category===category)&&`${t.title} ${t.id} ${t.category}`.toLowerCase().includes(search.toLowerCase())).sort((a,b)=>sort==='newest'?new Date(b.date)-new Date(a.date):new Date(a.date)-new Date(b.date)),[transactions,category,search,sort])
 return <><SectionHeader title="Transactions" subtitle="Search, filter and review all your wallet activity."/><div className="panel p-5 md:p-6"><div className="mb-5 grid gap-3 md:grid-cols-[1fr_190px_160px]"><div className="relative"><Search className="absolute left-3 top-3 text-slate-400" size={17}/><input className="field pl-10" placeholder="Search transactions..." value={search} onChange={e=>setSearch(e.target.value)}/></div><select className="field" value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select><select className="field" value={sort} onChange={e=>setSort(e.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></div><div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-400"><SlidersHorizontal size={14}/>{items.length} transaction{items.length===1?'':'s'} found</div><TransactionList items={items} onSelect={setSelected}/></div><TransactionModal tx={selected} onClose={()=>setSelected(null)}/></>
}
