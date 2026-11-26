export const readStore = (key, fallback) => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback }
  catch { return fallback }
}
export const writeStore = (key, value) => localStorage.setItem(key, JSON.stringify(value))
export const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(Number(value || 0))
export const makeId = () => `TX${Date.now().toString().slice(-8)}${Math.floor(Math.random()*90+10)}`
