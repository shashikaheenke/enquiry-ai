function PriorityBadge({ priority }) {
  const styles = {
    High: 'border-red-400/20 bg-red-400/10 text-red-300',
    Medium: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
    Low: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-sm font-semibold ${
        styles[priority] || 'border-white/10 bg-white/5 text-slate-400'
      }`}
    >
      {priority || '-'}
    </span>
  );
}

function MobileEnquiryCard({ item, onStatusChange }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-bold text-white">
            {item.customerName || 'Unknown customer'}
          </div>

          <div className="mt-1 text-sm text-slate-500">
            {item.phone || 'No phone number'}
          </div>
        </div>

        <PriorityBadge priority={item.priority} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Service
          </div>

          <div className="mt-1 text-sm leading-6 text-slate-300">
            {item.service || '-'}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Category
          </div>

          <div className="mt-1 text-sm text-slate-300">
            {item.category || '-'}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Postcode
          </div>

          <div className="mt-1 text-sm font-semibold text-slate-300">
            {item.postcode || '-'}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Created
          </div>

          <div className="mt-1 text-sm text-slate-400">
            {new Date(item.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-white/6 pt-4">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600">
          Status
        </label>

        <select
          value={item.status}
          onChange={(e) => onStatusChange(item.id, e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-base text-slate-200 outline-none focus:border-cyan-400/40"
        >
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
}

function EnquiryDashboard({ enquiries, onStatusChange }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/15">
      <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            Processed enquiries
          </h3>

          <p className="mt-1 text-base text-slate-500">
            Review and update incoming customer work.
          </p>
        </div>

        <span className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-400">
          {enquiries.length} results
        </span>
      </div>

      {enquiries.length === 0 ? (
        <div className="px-6 py-20 text-center">
          <div className="text-lg font-semibold text-slate-300">
            No enquiries found
          </div>

          <div className="mt-2 text-base text-slate-500">
            Try changing your search or filters.
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 p-4 md:hidden">
            {enquiries.map((item) => (
              <MobileEnquiryCard
                key={item.id}
                item={item}
                onStatusChange={onStatusChange}
              />
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-225 text-left">
              <thead>
                <tr className="border-b border-white/10 text-sm uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-5 font-semibold">Customer</th>

                  <th className="px-4 py-5 font-semibold">Service</th>

                  <th className="px-4 py-5 font-semibold">Category</th>

                  <th className="px-4 py-5 font-semibold">Postcode</th>

                  <th className="px-4 py-5 font-semibold">Priority</th>

                  <th className="px-4 py-5 font-semibold">Status</th>

                  <th className="px-6 py-5 font-semibold">Created</th>
                </tr>
              </thead>

              <tbody>
                {enquiries.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/6 transition last:border-0 hover:bg-white/3"
                  >
                    <td className="px-6 py-5">
                      <div className="text-base font-semibold text-slate-100">
                        {item.customerName || 'Unknown'}
                      </div>

                      <div className="mt-1 text-sm text-slate-500">
                        {item.phone || 'No phone'}
                      </div>
                    </td>

                    <td className="max-w-55 px-4 py-5 text-base leading-6 text-slate-400">
                      {item.service || '-'}
                    </td>

                    <td className="px-4 py-5 text-base text-slate-400">
                      {item.category || '-'}
                    </td>

                    <td className="px-4 py-5 text-base font-semibold text-slate-300">
                      {item.postcode || '-'}
                    </td>

                    <td className="px-4 py-5">
                      <PriorityBadge priority={item.priority} />
                    </td>

                    <td className="px-4 py-5">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          onStatusChange(item.id, e.target.value)
                        }
                        className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-sm font-semibold text-slate-200 outline-none focus:border-cyan-400/40"
                      >
                        <option value="New">New</option>

                        <option value="In Progress">In Progress</option>

                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    <td className="px-6 py-5 text-sm leading-6 text-slate-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default EnquiryDashboard;
