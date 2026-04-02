'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

import keywords from '../../data/keywords.json';
import Footer from './Footer';

const CATEGORY_CONFIG = {
  'Development Tools': {
    description: 'Stop paying for overpriced IDEs and code editors. These 20+ self-hosted development tools give you full control over your workflow. No more subscription fees for basic features that should be free.',
    icon: 'code',
    keywords: ['tool', 'api', 'code', 'javascript', 'react', 'frontend', 'backend', 'node', 'python', 'git', 'debug', 'test']
  },
  'Performance Optimization': {
    description: 'Why pay $200/mo for performance monitoring? These 15+ open-source tools deliver the same insights without the monthly tax. Monitor, analyze, and optimize your applications for free.',
    icon: 'zap',
    keywords: ['performance', 'optimize', 'speed', 'load', 'fast', 'cache', 'lazy', 'bundle', 'memory']
  },
  'Security Solutions': {
    description: 'Security should not be a subscription. These 12+ self-hosted security tools protect your applications without recurring fees. Own your security infrastructure. No more renting peace of mind.',
    icon: 'shield',
    keywords: ['security', 'secure', 'api key', 'authentication', 'auth', 'encrypt', 'ssl', 'firewall', 'vulnerability']
  },
  'UI/UX Design': {
    description: 'Design tools should empower, not enslave. These 18+ free alternatives to Figma and Adobe XD give you professional design capabilities. Stop paying monthly rent for your own creativity.',
    icon: 'layout',
    keywords: ['design', 'ui', 'ux', 'responsive', 'layout', 'css', 'animation', 'component', 'theme']
  },
  'Data Management': {
    description: 'Your data belongs to you. These 25+ self-hosted database and analytics tools eliminate the SaaS middleman. No more per-query fees. No more vendor lock-in. Your data, your rules.',
    icon: 'database',
    keywords: ['data', 'database', 'analytics', 'storage', 'backup', 'migration', 'query', 'api', 'export']
  }
};

function categorizeKeywords(keywords) {
  const categories = {
    'Development Tools': [],
    'Performance Optimization': [],
    'Security Solutions': [],
    'UI/UX Design': [],
    'Data Management': []
  };

  keywords.forEach(item => {
    const title = item.title.toLowerCase();
    const description = item.problem_description.toLowerCase();
    const combined = `${title} ${description}`;
    
    let bestMatch = 'Data Management';
    let maxMatches = 0;
    
    Object.entries(CATEGORY_CONFIG).forEach(([category, config]) => {
      const matches = config.keywords.filter(kw => combined.includes(kw)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = category;
      }
    });
    
    categories[bestMatch].push(item);
  });

  return categories;
}

export default function SolutionsClient() {
  const categories = categorizeKeywords(keywords);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedCategories, setExpandedCategories] = useState(
    Object.keys(categories).reduce((acc, cat) => ({ ...acc, [cat]: true }), {})
  );

  const [subscriptionsTerminated, setSubscriptionsTerminated] = useState(15200);
  const [capitalReclaimed, setCapitalReclaimed] = useState(1240500);
  const [feedItems, setFeedItems] = useState([
    { id: 1, city: 'New York', saasName: 'Salesforce', toolName: 'Odoo', savings: 1200 },
    { id: 2, city: 'London', saasName: 'Slack', toolName: 'Rocket.Chat', savings: 840 },
    { id: 3, city: 'Tokyo', saasName: 'Zoom', toolName: 'Jitsi', savings: 960 },
    { id: 4, city: 'Berlin', saasName: 'Atlassian', toolName: 'Taiga', savings: 1500 },
    { id: 5, city: 'Toronto', saasName: 'Mailchimp', toolName: 'Listmonk', savings: 720 }
  ]);
  const feedRef = useRef(null);

  const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Berlin', 'Toronto', 'Singapore', 'Dubai', 'Mumbai', 'Hong Kong', 'Chicago', 'Barcelona', 'Amsterdam', 'Seoul'];
  const saasNames = ['Salesforce', 'Slack', 'Zoom', 'Atlassian', 'Mailchimp', 'HubSpot', 'Asana', 'Trello', 'Intercom', 'Drift', 'Figma', 'Adobe Creative Cloud', 'Shopify', 'WooCommerce', 'Monday.com', 'Notion', 'Airtable', 'Calendly', 'Zendesk', 'Freshdesk'];
  const toolNames = ['Odoo', 'Rocket.Chat', 'Jitsi', 'Taiga', 'Listmonk', 'Mautic', 'Planka', 'WeKan', 'Mattermost', 'Chatwoot', 'Penpot', 'GIMP', 'Magento', 'PrestaShop', 'Leantime', 'Joplin', 'NocoDB', 'Cal.com', 'Zammad', 'Osticket'];

  useEffect(() => {
    const counterInterval = setInterval(() => {
      setSubscriptionsTerminated(prev => prev + Math.floor(Math.random() * 3) + 1);
      setCapitalReclaimed(prev => prev + Math.floor(Math.random() * 150) + 50);
    }, 3000);

    const feedInterval = setInterval(() => {
      const newFeedItem = {
        id: Date.now(),
        city: cities[Math.floor(Math.random() * cities.length)],
        saasName: saasNames[Math.floor(Math.random() * saasNames.length)],
        toolName: toolNames[Math.floor(Math.random() * toolNames.length)],
        savings: Math.floor(Math.random() * 2000) + 500
      };
      setFeedItems(prev => [...prev, newFeedItem].slice(-10));
    }, 4000);

    return () => {
      clearInterval(counterInterval);
      clearInterval(feedInterval);
    };
  }, []);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [feedItems]);

  const filteredSolutions = keywords.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.problem_description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'All') {
      return matchesSearch;
    } else {
      return matchesSearch && categories[selectedCategory].some(sol => sol.slug === item.slug);
    }
  });

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'KillSubscription Solutions Hub - Self-Hosted Alternatives to SaaS',
    'description': 'A comprehensive collection of 100+ self-hosted tools and solutions organized by industry. Replace expensive SaaS subscriptions with free, open-source alternatives.',
    'url': 'https://killsubscription.com/solutions',
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'KillSubscription',
      'url': 'https://killsubscription.com'
    },
    'mainEntity': {
      '@type': 'ItemList',
      'name': 'Subscription Alternatives by Category',
      'description': 'Industry-categorized collection of self-hosted tools',
      'numberOfItems': keywords.length,
      'itemListElement': Object.entries(categories).map(([category, items], catIndex) => ({
        '@type': 'ListItem',
        'position': catIndex + 1,
        'name': category,
        'description': CATEGORY_CONFIG[category].description,
        'numberOfItems': items.length,
        'itemListElement': items.map((item, itemIndex) => ({
          '@type': 'ListItem',
          'position': itemIndex + 1,
          'name': item.title,
          'description': item.problem_description,
          'url': `https://killsubscription.com/${item.slug}`
        }))
      }))
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema)
        }}
      />

      <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
              <ChevronDown className="w-5 h-5 rotate-90" />
              <span className="font-medium">back home</span>
            </Link>
            
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search solutions..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 my-12">
        <div className="mb-8 text-sm">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-slate-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronDown className="w-4 h-4 text-slate-400 rotate-[-90deg] mr-1" />
                  <span className="text-slate-900 font-medium">Solutions Hub</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <section className="mb-12" aria-label="Global Sabotage Dashboard">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-8 shadow-2xl">
            <h2 className="text-3xl font-black text-white mb-8 text-center">
              GLOBAL SABOTAGE DASHBOARD
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-slate-950 rounded-lg p-6 border border-slate-700 shadow-inner">
                <h3 className="text-slate-500 text-xs uppercase tracking-widest mb-4 text-center">
                  TOTAL SUBSCRIPTIONS TERMINATED
                </h3>
                <div className="bg-black rounded-lg p-4 border border-slate-800 text-center">
                  <span className="text-6xl font-black text-green-500 font-mono drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                    {subscriptionsTerminated.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="bg-slate-950 rounded-lg p-6 border border-slate-700 shadow-inner">
                <h3 className="text-slate-500 text-xs uppercase tracking-widest mb-4 text-center">
                  TOTAL CAPITAL RECLAIMED
                </h3>
                <div className="bg-black rounded-lg p-4 border border-slate-800 text-center">
                  <span className="text-6xl font-black text-green-500 font-mono drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                    ${capitalReclaimed.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 rounded-lg border border-slate-700 overflow-hidden shadow-inner">
              <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <h3 className="text-slate-300 text-sm font-semibold">
                  LIVE: Recent Subscriptions Terminated
                </h3>
              </div>
              <div className="p-4 max-h-40 overflow-y-auto bg-black/30" ref={feedRef}>
                <div className="space-y-3">
                  {feedItems.map((item) => (
                    <div key={item.id} className="text-sm text-slate-200 animate-in fade-in slide-in-from-left-4 duration-300">
                      <span className="text-green-400 font-semibold">A user from {item.city}</span> just replaced 
                      <span className="text-red-400 font-semibold"> {item.saasName}</span> with our 
                      <span className="text-blue-400 font-semibold"> {item.toolName}</span> and saved 
                      <span className="text-yellow-400 font-black"> ${item.savings.toLocaleString()}/year</span>.
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <header className="mb-12 text-center">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-4">
            KillSubscription Solutions Hub
          </h1>
          <p className="text-lg leading-relaxed text-slate-600 max-w-3xl mx-auto">
            A comprehensive collection of {keywords.length} self-hosted alternatives to expensive SaaS tools. 
            Stop renting software. Start owning your infrastructure.
          </p>
        </header>

        <nav className="mb-12 overflow-x-auto" aria-label="Category navigation">
          <div className="flex space-x-4 pb-4">
            <button
              className={`px-6 py-3 font-medium whitespace-nowrap ${selectedCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'} active:scale-95 transition-all`}
              onClick={() => setSelectedCategory('All')}
            >
              All Solutions ({keywords.length})
            </button>
            {Object.entries(categories).map(([category, items]) => (
              <button
                key={category}
                className={`px-6 py-3 font-medium whitespace-nowrap ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'} active:scale-95 transition-all`}
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({items.length})
              </button>
            ))}
          </div>
        </nav>

        {searchTerm && (
          <div className="mb-8">
            <p className="text-lg text-slate-600">
              Found <span className="font-semibold">{filteredSolutions.length}</span> solutions matching "{searchTerm}"
            </p>
          </div>
        )}

        {selectedCategory === 'All' ? (
          <div className="space-y-16">
            {Object.entries(categories).map(([category, items]) => {
              const categoryItems = items.filter(item => 
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.problem_description.toLowerCase().includes(searchTerm.toLowerCase())
              );
              
              if (categoryItems.length === 0) return null;
              
              return (
                <section key={category} className="category-section" aria-labelledby={`${category.toLowerCase().replace(/\s+/g, '-')}-heading`}>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 
                        id={`${category.toLowerCase().replace(/\s+/g, '-')}-heading`}
                        className="text-3xl font-black text-slate-900 border-l-4 border-blue-600 pl-4"
                      >
                        {category}
                      </h2>
                      <button
                        onClick={() => toggleCategory(category)}
                        className="flex items-center text-slate-600 hover:text-blue-600 transition-colors"
                        aria-expanded={expandedCategories[category]}
                        aria-controls={`${category.toLowerCase().replace(/\s+/g, '-')}-content`}
                      >
                        {expandedCategories[category] ? (
                          <>
                            <span>Collapse</span>
                            <ChevronUp className="w-5 h-5 ml-2" />
                          </>
                        ) : (
                          <>
                            <span>Expand</span>
                            <ChevronDown className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </button>
                    </div>
                    
                    <p className="text-slate-600 text-base leading-relaxed max-w-4xl mb-6">
                      {CATEGORY_CONFIG[category].description}
                    </p>
                  </div>
                  
                  {expandedCategories[category] && (
                    <div 
                      id={`${category.toLowerCase().replace(/\s+/g, '-')}-content`}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {categoryItems.map((item) => (
                        <article 
                          key={item.slug} 
                          className="bg-white border border-slate-200 p-6 hover:border-blue-600 hover:shadow-md transition-all"
                        >
                          <Link href={`/${item.slug}`} className="block">
                            <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-slate-600 mb-4 line-clamp-3 text-sm">
                              {item.problem_description}
                            </p>
                            <div className="flex items-center text-blue-600 font-medium text-sm">
                              <span>View Solution</span>
                              <ChevronDown className="w-4 h-4 ml-2 rotate-[-90deg]" />
                            </div>
                          </Link>
                        </article>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        ) : (
          <section aria-labelledby={`${selectedCategory.toLowerCase().replace(/\s+/g, '-')}-heading`}>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 
                  id={`${selectedCategory.toLowerCase().replace(/\s+/g, '-')}-heading`}
                  className="text-3xl font-black text-slate-900 border-l-4 border-blue-600 pl-4"
                >
                  {selectedCategory}
                </h2>
                <button
                  onClick={() => toggleCategory(selectedCategory)}
                  className="flex items-center text-slate-600 hover:text-blue-600 transition-colors"
                  aria-expanded={expandedCategories[selectedCategory]}
                  aria-controls={`${selectedCategory.toLowerCase().replace(/\s+/g, '-')}-content`}
                >
                  {expandedCategories[selectedCategory] ? (
                    <>
                      <span>Collapse</span>
                      <ChevronUp className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    <>
                      <span>Expand</span>
                      <ChevronDown className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-slate-600 text-base leading-relaxed max-w-4xl mb-6">
                {CATEGORY_CONFIG[selectedCategory].description}
              </p>
            </div>
            
            {expandedCategories[selectedCategory] && (
              <div 
                id={`${selectedCategory.toLowerCase().replace(/\s+/g, '-')}-content`}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {categories[selectedCategory].filter(item => 
                  item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.problem_description.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((item) => (
                  <article 
                    key={item.slug} 
                    className="bg-white border border-slate-200 p-6 hover:border-blue-600 hover:shadow-md transition-all"
                  >
                    <Link href={`/${item.slug}`} className="block">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 mb-4 line-clamp-3 text-sm">
                        {item.problem_description}
                      </p>
                      <div className="flex items-center text-blue-600 font-medium text-sm">
                        <span>View Solution</span>
                        <ChevronDown className="w-4 h-4 ml-2 rotate-[-90deg]" />
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        <section className="mt-16 pt-16 border-t border-slate-200">
          <h2 className="text-3xl font-black text-slate-900 mb-8 border-l-4 border-red-600 pl-4">
            SaaS vs. Self-Owned Logic
          </h2>
          
          <article className="prose prose-slate max-w-none mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Why Subscription-Based Software Is the Biggest Corporate Liability of 2026
            </h3>
            
            <p className="text-slate-700 leading-relaxed mb-4">
              In an era defined by <strong>SaaS Bloat</strong> and escalating <strong>Recurring Revenue Tax</strong>, enterprises are waking up to a harsh reality: 
              the tools they rent are slowly eroding their competitive advantage. The modern software stack has become a labyrinth of overlapping subscriptions, 
              each demanding annual price hikes while offering minimal incremental value.
            </p>
            
            <p className="text-slate-700 leading-relaxed mb-4">
              The emergence of <strong>Local-first software</strong> and self-hosted alternatives represents a paradigm shift. Organizations are recognizing 
              that true innovation comes from owning your infrastructure, not renting it. Every dollar saved on unnecessary SaaS subscriptions is a dollar 
              that can be reinvested in core business capabilities, R&D, and strategic growth initiatives.
            </p>
            
            <p className="text-slate-700 leading-relaxed mb-8">
              This isn't just about cost reduction—it's about data sovereignty, operational resilience, and breaking free from the golden handcuffs of vendor lock-in. 
              The companies that embrace self-hosted solutions today will be the market leaders of tomorrow, unburdened by the exponential scaling costs that cripple 
              their SaaS-dependent competitors.
            </p>
          </article>

          <div className="mb-12 overflow-x-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Core Comparison Matrix
            </h3>
            <table className="w-full border-collapse border border-slate-300 bg-white">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-300 px-6 py-4 text-left text-lg font-bold text-slate-900">
                    Dimension
                  </th>
                  <th className="border border-slate-300 px-6 py-4 text-left text-lg font-bold text-red-600">
                    Traditional SaaS
                  </th>
                  <th className="border border-slate-300 px-6 py-4 text-left text-lg font-bold text-green-600">
                    Self-Hosted / Local-First
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-slate-50">
                  <td className="border border-slate-300 px-6 py-4 font-semibold text-slate-900">
                    Scaling Cost
                  </td>
                  <td className="border border-slate-300 px-6 py-4 text-slate-700">
                    <span className="font-bold text-red-600">Exponential</span> — $$$ per user, per month, forever
                  </td>
                  <td className="border border-slate-300 px-6 py-4 text-slate-700">
                    <span className="font-bold text-green-600">Zero</span> — Fixed infrastructure costs, unlimited users
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="border border-slate-300 px-6 py-4 font-semibold text-slate-900">
                    Data Ownership
                  </td>
                  <td className="border border-slate-300 px-6 py-4 text-slate-700">
                    <span className="font-bold text-red-600">Rented</span> — Your data lives on their servers, subject to their terms
                  </td>
                  <td className="border border-slate-300 px-6 py-4 text-slate-700">
                    <span className="font-bold text-green-600">Private</span> — Complete sovereignty, full control, zero third-party access
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="border border-slate-300 px-6 py-4 font-semibold text-slate-900">
                    Customization
                  </td>
                  <td className="border border-slate-300 px-6 py-4 text-slate-700">
                    <span className="font-bold text-red-600">Limited</span> — Take it or leave it, roadmap controlled by vendor
                  </td>
                  <td className="border border-slate-300 px-6 py-4 text-slate-700">
                    <span className="font-bold text-green-600">Unlimited</span> — Fork, modify, extend to fit your exact needs
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="border border-slate-300 px-6 py-4 font-semibold text-slate-900">
                    Vendor Lock-In
                  </td>
                  <td className="border border-slate-300 px-6 py-4 text-slate-700">
                    <span className="font-bold text-red-600">Severe</span> — Data export friction, integration debt, switching costs
                  </td>
                  <td className="border border-slate-300 px-6 py-4 text-slate-700">
                    <span className="font-bold text-green-600">None</span> — Open standards, portable data, complete freedom
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="border border-slate-300 px-6 py-4 font-semibold text-slate-900">
                    Operational Resilience
                  </td>
                  <td className="border border-slate-300 px-6 py-4 text-slate-700">
                    <span className="font-bold text-red-600">Dependent</span> — Their downtime = your downtime, price hikes = your budget crisis
                  </td>
                  <td className="border border-slate-300 px-6 py-4 text-slate-700">
                    <span className="font-bold text-green-600">Independent</span> — You control uptime, updates, and business continuity
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
