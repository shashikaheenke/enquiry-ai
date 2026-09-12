import { Search, SlidersHorizontal } from 'lucide-react';

function EnquiryFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
      <div className="relative">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search customer, service, category or postcode..."
          className="w-full rounded-xl border border-white/10 bg-slate-900/70 py-3.5 pl-12 pr-4 text-base text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/10"
        />
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-4">
        <SlidersHorizontal size={17} className="shrink-0 text-slate-500" />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full bg-transparent py-3.5 text-base text-slate-200 outline-none lg:w-auto"
        >
          <option value="All">All statuses</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3.5 text-base text-slate-200 outline-none focus:border-cyan-400/40"
      >
        <option value="All">All priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
}

export default EnquiryFilters;
