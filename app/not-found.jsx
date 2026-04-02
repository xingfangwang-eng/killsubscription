import Link from 'next/link'
import keywords from '../data/keywords.json'

export default function NotFound() {
  // Get top 6 popular tools (first 6 from the list)
  const popularTools = keywords.slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background grid effect */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Code */}
        <h1 className="text-8xl font-black text-slate-900 mb-4 tracking-tighter">
          404
        </h1>
        
        {/* Death Message */}
        <p className="text-2xl font-bold text-slate-800 mb-2">
          That SaaS is already dead.
        </p>
        <p className="text-lg text-slate-600 mb-8">
          Pick another victim below:
        </p>

        {/* Popular Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {popularTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="block p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left"
            >
              <h3 className="font-semibold text-slate-900 mb-1">{tool.title}</h3>
              <p className="text-sm text-slate-600 line-clamp-2">{tool.problem_description}</p>
            </Link>
          ))}
        </div>

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to KillSubscription
        </Link>
      </div>

      {/* Schema.org Structured Data for 404 Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            'name': 'Page Not Found - KillSubscription',
            'description': 'That SaaS is already dead. Pick another victim from our list of subscription alternatives.',
            'url': 'https://killsubscription.com/404',
            'isPartOf': {
              '@type': 'WebSite',
              'name': 'KillSubscription',
              'url': 'https://killsubscription.com'
            }
          })
        }}
      />
    </div>
  )
}
