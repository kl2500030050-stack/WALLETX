export default function SectionHeader({ title, subtitle, action }) {
  return <div className="mb-7 flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-[28px]">{title}</h1><p className="mt-1 text-sm text-slate-400">{subtitle}</p></div>{action}</div>
}
