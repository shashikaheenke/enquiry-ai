import {
  CalendarDays,
  Clock3,
  FileText,
  MapPin,
  Phone,
  Tag,
  User,
  Zap,
  CheckCircle2,
} from 'lucide-react';

function DetailCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 p-4 sm:p-5">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
        <Icon size={16} />
        {label}
      </div>

      <div className="break-break-words text-base font-semibold leading-6 text-slate-100 sm:text-lg">
        {value || 'Not provided'}
      </div>
    </div>
  );
}

function ExtractionResult({ result }) {
  if (!result) {
    return (
      <div className="flex min-h-110 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/3 p-8 sm:p-10">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/10 text-cyan-300">
            <FileText size={30} />
          </div>

          <h3 className="text-xl font-bold text-white sm:text-2xl">
            Your AI analysis will appear here
          </h3>

          <p className="mt-3 text-base leading-7 text-slate-500">
            Paste a customer enquiry on the left and the assistant will convert
            it into structured business data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-linear-to-b from-cyan-400/8 to-white/4 p-5 shadow-2xl shadow-cyan-950/20 sm:p-7 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-base font-semibold text-cyan-300">
            <CheckCircle2 size={18} />
            AI analysis complete
          </div>

          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Extracted details
          </h2>
        </div>

        <span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
          {result.status || 'New'}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <DetailCard icon={User} label="Customer" value={result.customerName} />

        <DetailCard icon={Tag} label="Service" value={result.service} />

        <DetailCard icon={MapPin} label="Postcode" value={result.postcode} />

        <DetailCard icon={Phone} label="Phone" value={result.phone} />

        <DetailCard
          icon={CalendarDays}
          label="Preferred date"
          value={result.preferredDate}
        />

        <DetailCard
          icon={Clock3}
          label="Preferred time"
          value={result.preferredTime}
        />

        <DetailCard icon={Tag} label="Category" value={result.category} />

        <DetailCard icon={Zap} label="Priority" value={result.priority} />
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
          <FileText size={16} />
          AI Summary
        </div>

        <p className="text-base leading-7 text-slate-300 sm:text-lg">
          {result.summary || 'No summary generated'}
        </p>
      </div>
    </div>
  );
}

export default ExtractionResult;
