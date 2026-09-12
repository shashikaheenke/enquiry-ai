import { Sparkles, WandSparkles, RotateCcw } from 'lucide-react';

function EnquiryForm({ enquiry, setEnquiry, onExtract, loading, error }) {
  const sampleEnquiry =
    'Hi, I am Sarah Green. I need someone to repair my leaking kitchen tap on Friday afternoon. I live at EX8 1AA and my number is 07700123456.';

  const canExtract = enquiry.trim().length > 0 && !loading;

  return (
    <div className="flex min-h-110 flex-col rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-base font-semibold text-cyan-300">
            <Sparkles size={19} />
            AI workspace
          </div>

          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Analyse an enquiry
          </h2>

          <p className="mt-2 max-w-xl text-base leading-7 text-slate-400">
            Paste any customer message below. The AI will extract and organise
            the useful business information.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setEnquiry(sampleEnquiry)}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
        >
          <RotateCcw size={16} />
          Use sample
        </button>
      </div>

      <textarea
        value={enquiry}
        onChange={(e) => setEnquiry(e.target.value)}
        placeholder="Example: Hi, I'm Mark Taylor. My boiler has stopped working and we have no heating. Please call me urgently..."
        className="min-h-64 flex-1 resize-y rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-base leading-8 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/10 sm:p-6 sm:text-lg"
      />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-500">
          {enquiry.length} characters
        </div>

        <button
          onClick={onExtract}
          disabled={!canExtract}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-300 to-blue-500 px-6 py-3.5 text-base font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          <WandSparkles size={19} />

          {loading ? 'Analysing enquiry...' : 'Extract with AI'}
        </button>
      </div>

      {error && (
        <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-4 text-base text-red-300">
          {error}
        </div>
      )}
    </div>
  );
}

export default EnquiryForm;
