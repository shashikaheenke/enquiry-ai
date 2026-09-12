import { CircleCheckBig, Inbox, Siren, Sparkles } from 'lucide-react';

function DashboardStats({ enquiries }) {
  const total = enquiries.length;

  const newCount = enquiries.filter((item) => item.status === 'New').length;

  const highPriority = enquiries.filter(
    (item) => item.priority === 'High',
  ).length;

  const completed = enquiries.filter(
    (item) => item.status === 'Completed',
  ).length;

  const stats = [
    {
      label: 'Total enquiries',
      value: total,
      icon: Inbox,
    },
    {
      label: 'New enquiries',
      value: newCount,
      icon: Sparkles,
    },
    {
      label: 'High priority',
      value: highPriority,
      icon: Siren,
    },
    {
      label: 'Completed',
      value: completed,
      icon: CircleCheckBig,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/7 sm:p-6"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
              <Icon size={21} />
            </div>

            <div className="text-4xl font-bold tracking-tight text-white">
              {stat.value}
            </div>

            <div className="mt-2 text-base text-slate-400">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardStats;
