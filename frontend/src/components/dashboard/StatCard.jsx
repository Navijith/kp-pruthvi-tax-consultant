function StatCard({ title, value, icon: Icon, color = 'navy', subtitle }) {
  const colorStyles = {
    navy: 'bg-[#122438] text-white',
    gold: 'bg-[#f2e8cf] text-[#a77d2f]',
    green: 'bg-[#e8efeb] text-[#2c5a4d]',
    amber: 'bg-[#fef3c7] text-[#b45309]',
  }

  return (
    <div className="rounded-2xl border border-[#dedbd3] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-[#687385]">{title}</p>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorStyles[color] || colorStyles.navy}`}>
          {Icon && <Icon size={20} />}
        </div>
      </div>
      <p className="font-display mt-3 text-3xl font-bold text-[#122438]">{value}</p>
      {subtitle && <p className="mt-1 text-xs text-[#8a94a2]">{subtitle}</p>}
    </div>
  )
}

export default StatCard
