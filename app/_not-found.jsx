import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold text-blue-600 mb-6">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Subscription Not Found</h2>
        <p className="text-lg text-slate-600 mb-8">But you can kill one here.</p>
        <Link 
          href="/solutions" 
          className="inline-block bg-blue-600 text-white px-8 py-3 font-medium rounded-md hover:bg-blue-700 transition-all"
        >
          Browse All Alternatives
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
