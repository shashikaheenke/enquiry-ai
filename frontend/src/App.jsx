import { useEffect, useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';

import EnquiryForm from './components/EnquiryForm';
import ExtractionResult from './components/ExtractionResult';
import EnquiryDashboard from './components/EnquiryDashboard';
import EnquiryFilters from './components/EnquiryFilters';
import DashboardStats from './components/DashboardStats';

import {
  getEnquiries,
  extractEnquiry,
  updateEnquiryStatus,
} from './services/enquiryApi';

function App() {
  const [enquiry, setEnquiry] = useState('');
  const [result, setResult] = useState(null);
  const [enquiries, setEnquiries] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const loadEnquiries = async () => {
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleExtract = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const extracted = await extractEnquiry(enquiry);

      setResult(extracted);
      setEnquiry('');

      await loadEnquiries();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateEnquiryStatus(id, status);
      await loadEnquiries();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus =
      statusFilter === 'All' || item.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'All' || item.priority === priorityFilter;

    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !search ||
      item.customerName?.toLowerCase().includes(search) ||
      item.service?.toLowerCase().includes(search) ||
      item.postcode?.toLowerCase().includes(search) ||
      item.category?.toLowerCase().includes(search);

    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-130 w-130 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute -right-45 top-45 h-125 w-125 rounded-full bg-blue-600/10 blur-[130px]" />

        <div className="absolute bottom-[-55] left-1/3 h-125 w-125 rounded-full bg-violet-600/5 blur-[140px]" />
      </div>

      <header className="relative border-b border-white/6 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-375 items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-300 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20">
              <Bot size={23} />
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight text-white">
                EnquiryAI
              </div>

              <div className="hidden text-sm text-slate-500 sm:block">
                Intelligent enquiry automation
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/6 px-3 py-2 text-sm font-medium text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-sm shadow-emerald-300" />

            <span className="hidden sm:inline">AI service online</span>

            <span className="sm:hidden">Online</span>
          </div>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-375 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <section className="mb-8 sm:mb-10 lg:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/6 px-3 py-2 text-sm font-semibold text-cyan-300">
            <Sparkles size={16} />
            AI-powered enquiry operations
          </div>

          <h1 className="max-w-5xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Turn customer messages into
            <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-400 bg-clip-text text-transparent">
              {' '}
              organised business data.
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl">
            Automatically extract customer details, identify urgency, categorise
            requests and organise incoming enquiries using AI.
          </p>
        </section>

        <section className="mb-8">
          <DashboardStats enquiries={enquiries} />
        </section>

        <section className="grid gap-6 2xl:grid-cols-2">
          <EnquiryForm
            enquiry={enquiry}
            setEnquiry={setEnquiry}
            onExtract={handleExtract}
            loading={loading}
            error={error}
          />

          <ExtractionResult result={result} />
        </section>

        <section className="mt-10 sm:mt-12">
          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
              Workspace
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Enquiry management
            </h2>

            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-400">
              Search, prioritise and manage all AI-processed enquiries from one
              workspace.
            </p>
          </div>

          <div className="mb-5">
            <EnquiryFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
            />
          </div>

          <EnquiryDashboard
            enquiries={filteredEnquiries}
            onStatusChange={handleStatusChange}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
