import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { readStore, writeStore, makeId } from '../utils/storage'

const WalletContext = createContext(null)
const USERS_KEY = 'moneta_users'
const SESSION_KEY = 'moneta_session'
const seedTransactions = [
  { id:'TX24080101', title:'Coffee House', category:'Shopping', type:'debit', amount:280, date:new Date(Date.now()-86400000).toISOString(), status:'Completed', note:'Cafe purchase' },
  { id:'TX24080102', title:'Salary credit', category:'Income', type:'credit', amount:42000, date:new Date(Date.now()-2*86400000).toISOString(), status:'Completed', note:'Monthly income' },
  { id:'TX24080103', title:'Electricity bill', category:'Bills', type:'debit', amount:1450, date:new Date(Date.now()-4*86400000).toISOString(), status:'Completed', note:'Electricity payment' }
]
export function WalletProvider({ children }) {
  const [users, setUsers] = useState(() => readStore(USERS_KEY, []))
  const [user, setUser] = useState(() => readStore(SESSION_KEY, null))
  const [transactions, setTransactions] = useState(() => user ? readStore(`moneta_tx_${user.email}`, seedTransactions) : [])
  const [balance, setBalance] = useState(() => user ? readStore(`moneta_balance_${user.email}`, 24850) : 0)
  const [theme, setTheme] = useState(() => readStore('moneta_theme', 'light'))
  const [toast, setToast] = useState(null)

  useEffect(() => writeStore(USERS_KEY, users), [users])
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); writeStore('moneta_theme', theme) }, [theme])
  useEffect(() => {
    if (user) {
      writeStore(SESSION_KEY, user)
      writeStore(`moneta_tx_${user.email}`, transactions)
      writeStore(`moneta_balance_${user.email}`, balance)
    } else localStorage.removeItem(SESSION_KEY)
  }, [user, transactions, balance])

  const notify = (message, type='success') => { setToast({ message, type }); setTimeout(() => setToast(null), 2800) }
  const register = ({ name, email, password }) => {
    email = email.trim().toLowerCase()
    if (users.some(u => u.email === email)) return { ok:false, message:'An account with this email already exists.' }
    const next = [...users, { name, email, password }]
    setUsers(next)
    const profile = { name, email }
    setUser(profile); setBalance(24850); setTransactions(seedTransactions)
    writeStore(`moneta_balance_${email}`, 24850); writeStore(`moneta_tx_${email}`, seedTransactions)
    return { ok:true }
  }
  const login = ({ email, password }) => {
    const found = users.find(u => u.email === email.trim().toLowerCase() && u.password === password)
    if (!found) return { ok:false, message:'Email or password is incorrect.' }
    const profile = { name:found.name, email:found.email }
    setUser(profile); setBalance(readStore(`moneta_balance_${found.email}`, 24850))
    setTransactions(readStore(`moneta_tx_${found.email}`, seedTransactions))
    return { ok:true }
  }
  const logout = () => { setUser(null); setTransactions([]); setBalance(0) }
  const updateProfile = (data) => {
    const nextUser = { ...user, name:data.name.trim() }
    setUsers(users.map(u => u.email === user.email ? { ...u, name:nextUser.name } : u))
    setUser(nextUser); notify('Profile updated successfully')
  }
  const addTransaction = ({ title, category, type, amount, note='' }) => {
    const value = Number(amount)
    if (!Number.isFinite(value) || value <= 0) return { ok:false, message:'Enter an amount greater than zero.' }
    if (type === 'debit' && value > balance) return { ok:false, message:'Insufficient wallet balance.' }
    setBalance(b => Number((b + (type === 'credit' ? value : -value)).toFixed(2)))
    setTransactions(prev => [{ id:makeId(), title, category, type, amount:value, date:new Date().toISOString(), status:'Completed', note }, ...prev])
    return { ok:true }
  }
  const value = useMemo(() => ({ user, users, transactions, balance, theme, setTheme, toast, notify, register, login, logout, updateProfile, addTransaction }), [user, users, transactions, balance, theme, toast])
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}
export const useWallet = () => useContext(WalletContext)
