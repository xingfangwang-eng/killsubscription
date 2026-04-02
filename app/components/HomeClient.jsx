'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Play, Loader2, Copy, Download, RefreshCw, AlertTriangle, Users, DollarSign, TrendingUp, Code, Shield, Palette, Database, Globe, Zap } from 'lucide-react'

// Import keyword data
import keywords from '../../data/keywords.json'
import Footer from './Footer'

// Categorize tools by industry
function categorizeToolsByIndustry(keywords) {
  const categories = {
    'Development': {
      icon: Code,
      color: 'blue',
      keywords: []
    },
    'Finance': {
      icon: DollarSign,
      color: 'green',
      keywords: []
    },
    'Marketing': {
      icon: TrendingUp,
      color: 'purple',
      keywords: []
    },
    'HR': {
      icon: Users,
      color: 'orange',
      keywords: []
    },
    'DevOps': {
      icon: Zap,
      color: 'red',
      keywords: []
    },
    'Security': {
      icon: Shield,
      color: 'yellow',
      keywords: []
    },
    'Design': {
      icon: Palette,
      color: 'pink',
      keywords: []
    },
    'Data': {
      icon: Database,
      color: 'indigo',
      keywords: []
    }
  }

  keywords.forEach(keyword => {
    const title = keyword.title.toLowerCase()
    const description = keyword.problem_description.toLowerCase()
    const combined = `${title} ${description}`

    if (combined.includes('api') || combined.includes('react') || combined.includes('javascript') || 
        combined.includes('typescript') || combined.includes('node') || combined.includes('code') ||
        combined.includes('webpack') || combined.includes('testing') || combined.includes('debug')) {
      categories['Development'].keywords.push(keyword)
    } else if (combined.includes('finance') || combined.includes('payment') || combined.includes('money') ||
               combined.includes('budget') || combined.includes('accounting') || combined.includes('invoice')) {
      categories['Finance'].keywords.push(keyword)
    } else if (combined.includes('marketing') || combined.includes('seo') || combined.includes('analytics') ||
               combined.includes('social') || combined.includes('email') || combined.includes('campaign')) {
      categories['Marketing'].keywords.push(keyword)
    } else if (combined.includes('hr') || combined.includes('employee') || combined.includes('recruit') ||
               combined.includes('payroll') || combined.includes('team') || combined.includes('hiring')) {
      categories['HR'].keywords.push(keyword)
    } else if (combined.includes('devops') || combined.includes('deploy') || combined.includes('server') ||
               combined.includes('docker') || combined.includes('kubernetes') || combined.includes('ci/cd')) {
      categories['DevOps'].keywords.push(keyword)
    } else if (combined.includes('security') || combined.includes('auth') || combined.includes('encrypt') ||
               combined.includes('secure') || combined.includes('password') || combined.includes('api key')) {
      categories['Security'].keywords.push(keyword)
    } else if (combined.includes('design') || combined.includes('ui') || combined.includes('ux') ||
               combined.includes('css') || combined.includes('responsive') || combined.includes('layout')) {
      categories['Design'].keywords.push(keyword)
    } else if (combined.includes('data') || combined.includes('database') || combined.includes('storage') ||
               combined.includes('query') || combined.includes('index') || combined.includes('cache')) {
      categories['Data'].keywords.push(keyword)
    } else {
      // Default to Development for uncategorized
      categories['Development'].keywords.push(keyword)
    }
  })

  return categories
}

// Generate deterministic SaaS names and savings based on keyword id
function generateSaaSReplacement(keyword) {
  const saasNames = [
    'Salesforce', 'HubSpot', 'Zendesk', 'Slack', 'Monday.com', 'Asana', 'Trello',
    'Dropbox', 'Zoom', 'DocuSign', 'Mailchimp', 'Intercom', 'Freshdesk', 'Jira',
    'Confluence', 'Notion', 'Airtable', 'Figma', 'Canva', 'Adobe CC'
  ]
  
  // Use keyword id to deterministically select SaaS name and savings
  const index = keyword.id % saasNames.length
  const saasName = saasNames[index]
  const savings = (keyword.id * 47 % 500) + 100 // Deterministic savings between $100-$600
  
  return {
    saasName,
    toolName: keyword.title.split(' ').slice(0, 3).join(' '),
    savings,
    slug: keyword.slug
  }
}

export default function HomeClient() {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [error, setError] = useState(false)
  const iframeRef = useRef(null)

  // Load data from LocalStorage
  useEffect(() => {
    const savedInput = localStorage.getItem('killSubscriptionInput')
    const savedCode = localStorage.getItem('killSubscriptionCode')
    if (savedInput) setInput(savedInput)
    if (savedCode) setGeneratedCode(savedCode)
  }, [])

  // Save data to LocalStorage
  useEffect(() => {
    localStorage.setItem('killSubscriptionInput', input)
  }, [input])

  useEffect(() => {
    if (generatedCode) {
      localStorage.setItem('killSubscriptionCode', generatedCode)
      // Create blob URL for iframe preview
      const blob = new Blob([generatedCode], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      setPreviewUrl(url)
    }
  }, [generatedCode])

  const handleExecute = () => {
    setLoading(true)
    setError(false)
    // Simulate AI API call
    setTimeout(() => {
      // Simulate 20% error rate
      if (Math.random() < 0.2) {
        setError(true)
        setLoading(false)
      } else {
        const mockCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Component</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f9fafb; 
      min-height: 100vh; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      padding: 1rem;
    }
    .container { 
      width: 100%; 
      max-width: 400px; 
      background: white; 
      border-radius: 8px; 
      box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
      padding: 1.5rem; 
      border: 1px solid #e2e8f0;
    }
    h1 { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-bottom: 1rem; }
    p { color: #64748b; margin-bottom: 1.5rem; }
    .form-group { margin-bottom: 1rem; }
    label { display: block; font-size: 0.875rem; font-weight: 500; color: #334155; margin-bottom: 0.25rem; }
    input, select { 
      width: 100%; 
      padding: 0.5rem 0.75rem; 
      border: 1px solid #cbd5e1; 
      border-radius: 0.5rem; 
      font-size: 0.875rem;
    }
    input:focus, select:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
    button { 
      width: 100%; 
      padding: 0.5rem; 
      background: #6366f1; 
      color: white; 
      border: none; 
      border-radius: 0.5rem; 
      font-weight: 500; 
      cursor: pointer;
    }
    button:hover { background: #4f46e5; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Subscription Manager</h1>
    <p>Manage your subscriptions efficiently</p>
    
    <div class="form-group">
      <label>Subscription Name</label>
      <input type="text" placeholder="Netflix" />
    </div>
    <div class="form-group">
      <label>Monthly Cost</label>
      <input type="number" placeholder="15.99" />
    </div>
    <div class="form-group">
      <label>Billing Cycle</label>
      <select>
        <option>Monthly</option>
        <option>Yearly</option>
        <option>Quarterly</option>
        </select>
      </div>
      <button>Save Subscription</button>
    </div>
  </div>
  
  <script>
    // LocalStorage data persistence
    const saveSubscription = (subscription) => {
      const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]')
      subscriptions.push(subscription)
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions))
    }
    
    const loadSubscriptions = () => {
      return JSON.parse(localStorage.getItem('subscriptions') || '[]')
    }
  </script>
</body>
</html>`
        setGeneratedCode(mockCode)
        setLoading(false)
      }
    }, 2000)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode)
  }

  const handleDownloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'generated-component.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    setInput('')
    setGeneratedCode('')
    localStorage.removeItem('killSubscriptionInput')
    localStorage.removeItem('killSubscriptionCode')
  }

  // Search-related state
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  // Real-time search logic
  useEffect(() => {
    if (searchTerm.length > 0) {
      const results = keywords.filter(keyword => 
        keyword.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        keyword.slug.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [searchTerm])

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchResults.length > 0) {
      window.location.href = `/${searchResults[0].slug}`
    }
  }

  // Dashboard-related state
  const [invoicesTerminated, setInvoicesTerminated] = useState(85400)
  const [capitalReclaimed, setCapitalReclaimed] = useState(0)
  const [bloatEliminated, setBloatEliminated] = useState(0)
  const [feedItems, setFeedItems] = useState([
    "A user in New York just killed a $99/mo CRM subscription.",
    "A user in London just killed a $49/mo project management subscription.",
    "A user in Tokyo just killed a $199/mo marketing automation subscription."
  ])

  // City list
  const cities = ["New York", "London", "Tokyo", "Paris", "Sydney", "Berlin", "Toronto", "Singapore", "Dubai", "Mumbai"]
  const saasTypes = ["CRM", "project management", "marketing automation", "accounting", "HR", "customer support", "analytics", "e-commerce", "content management", "video conferencing"]

  // Initialize counters
  useEffect(() => {
    // Initial capital calculation
    setCapitalReclaimed(invoicesTerminated * 79) // Assuming average $79 per subscription
    setBloatEliminated(Math.floor(invoicesTerminated * 0.5)) // Assuming average 0.5GB per subscription
  }, [])

  // Update counters every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly increase 1-5 invoices
      const randomIncrease = Math.floor(Math.random() * 5) + 1
      setInvoicesTerminated(prev => prev + randomIncrease)
      
      // Randomly increase capital
      const randomCapital = Math.floor(Math.random() * 200) + 50
      setCapitalReclaimed(prev => prev + randomCapital)
      
      // Randomly increase code bloat
      const randomBloat = Math.floor(Math.random() * 3) + 1
      setBloatEliminated(prev => prev + randomBloat)
      
      // Randomly generate new feed item
      const randomCity = cities[Math.floor(Math.random() * cities.length)]
      const randomSaaS = saasTypes[Math.floor(Math.random() * saasTypes.length)]
      const randomPrice = Math.floor(Math.random() * 200) + 20
      const newFeedItem = `A user in ${randomCity} just killed a $${randomPrice}/mo ${randomSaaS} subscription.`
      
      setFeedItems(prev => {
        const updated = [newFeedItem, ...prev]
        return updated.slice(0, 10) // Keep only the latest 10
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background grid effect */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        {/* Top Logo and Slogan */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            KILLSUBSCRIPTION
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Stop renting tools, start owning them.
          </p>
        </div>

        {/* Large search box */}
        <div className="w-full max-w-3xl mb-12" aria-label="SaaS Anti-Rental Manifesto">
          <form onSubmit={handleSearchSubmit} className="relative">
            {/* Search box container */}
            <div className="relative">
              {/* Search input */}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter the SaaS you want to kill (e.g., Salesforce, Monday, Zendesk)..."
                className="w-full px-8 py-6 text-lg border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
              />
              
              {/* Search icon */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Search results */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                <div className="max-h-60 overflow-y-auto">
                  {searchResults.map((result) => (
                    <Link
                      key={result.slug}
                      href={`/${result.slug}`}
                      className="block px-6 py-3 hover:bg-slate-100 transition-colors"
                      onClick={() => setShowResults(false)}
                    >
                      {result.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Button group - keep original functionality */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full max-w-md">
          <button
            onClick={handleExecute}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                <span>Executing...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Play className="mr-2 h-4 w-4" />
                <span>Execute</span>
              </div>
            )}
          </button>
          
          <button
            onClick={handleClear}
            className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium transition-all duration-300 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 flex items-center justify-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            <span>Clear</span>
          </button>
          
          <button
            onClick={() => setInput('A minimalist CRM tool that only records name, last contact date, and notes, with data stored locally')}
            className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium transition-all duration-300 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 flex items-center justify-center text-sm"
          >
            <span>Example</span>
          </button>
        </div>

        {/* Browse all alternatives button */}
        <div className="mb-12 text-center">
          <Link 
            href="/solutions" 
            className="inline-flex items-center px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium transition-all duration-300 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
          >
            <span>Browse All Alternatives</span>
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <div className="w-full max-w-md bg-red-50 border border-red-200 rounded-lg p-4 mb-12">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="text-lg font-medium text-red-800">Generation Failed</h3>
            </div>
            <p className="text-red-700 mb-4">An error occurred during code generation. Please try again.</p>
            <button
              onClick={handleExecute}
              className="w-full py-2 bg-red-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Generated code and preview */}
        {generatedCode && (
          <div className="w-full bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-12">
            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleDownloadCode}
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 flex items-center"
              >
                <Download className="mr-2 h-5 w-5" />
                <span>Download standalone HTML</span>
              </button>

            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Code editor */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-slate-900">Generated Code</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="p-2 text-slate-500 hover:text-primary transition-colors"
                      title="Copy code"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <pre className="bg-slate-50 p-4 rounded-lg overflow-auto max-h-[400px] text-sm">
                  <code>{generatedCode}</code>
                </pre>
              </div>
              
              {/* Preview window */}
              <div className="flex-1">
                <h2 className="text-lg font-medium text-slate-900 mb-4">Preview</h2>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <iframe
                    ref={iframeRef}
                    src={previewUrl}
                    className="w-full h-[400px]"
                    title="Preview"
                    onError={() => console.error('Failed to load preview iframe')}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Counter */}
        <div className="mt-12 mb-8 text-center">
          <p className="text-lg font-medium text-slate-900">
            Total Subscriptions Killed: <span className="text-primary font-bold">$0</span> (and counting)
          </p>
        </div>

        {/* Donation button */}
        <div className="mt-8 mb-8 text-center">
          <a 
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=xingfang.wang%40gmail.com&item_name=Support%20KillSubscription&currency_code=USD" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>Support KillSubscription</span>
          </a>
        </div>

        {/* Global Subscription Autopsy dashboard */}
        <div className="w-full bg-white rounded-lg border border-slate-200 shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Global Subscription Autopsy</h2>
          
          {/* Core counters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Invoices Terminated */}
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-slate-500 mb-2">Invoices Terminated</h3>
              <p className="text-3xl font-bold text-slate-900">{invoicesTerminated.toLocaleString()}</p>
            </div>
            
            {/* Total Capital Reclaimed */}
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-slate-500 mb-2">Total Capital Reclaimed</h3>
              <p className="text-3xl font-bold text-slate-900">${capitalReclaimed.toLocaleString()}</p>
            </div>
            
            {/* SaaS Bloat Eliminated */}
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-slate-500 mb-2">SaaS Bloat Eliminated</h3>
              <p className="text-3xl font-bold text-slate-900">{bloatEliminated.toLocaleString()} GB</p>
            </div>
          </div>
          
          {/* Dynamic Feed and SEO section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dynamic Feed */}
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">Recent Kills</h3>
              <div className="bg-slate-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                {feedItems.map((item, index) => (
                  <p key={index} className="text-sm text-slate-600 mb-2">{item}</p>
                ))}
              </div>
            </div>
            
            {/* SEO section */}
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-4">2026 Software Ownership Research Report Summary</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                In 2026, with the rise of SaaS alternatives, more and more businesses are turning to self-hosted apps and micro-SaaS solutions. Research shows that using open-source SaaS alternatives can significantly reduce operational costs while improving data security and system flexibility. Self-hosted apps allow businesses to truly own their software assets, no longer constrained by the shackles of subscription models. The emergence of micro-SaaS provides businesses with more customized solutions to meet specific business needs. This report provides an in-depth analysis of the importance of software ownership and how to optimize technology stacks through SaaS alternatives. Research found that businesses adopting self-hosted apps saved an average of 30% on IT budgets while achieving better system performance and security. The rapid development of micro-SaaS also provides businesses with more choices, allowing them to build more flexible technology ecosystems based on their specific needs.
              </p>
            </div>
          </div>
        </div>

        {/* The Execution Matrix */}
        <div className="w-full bg-white rounded-lg border border-slate-200 shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">The Execution Matrix</h2>
          <p className="text-sm text-slate-600 mb-8">
            Browse 100+ subscription alternatives by industry. Each entry shows a SaaS tool you can replace with a self-hosted solution.
          </p>
          
          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(categorizeToolsByIndustry(keywords)).map(([categoryName, categoryData]) => {
              const IconComponent = categoryData.icon
              const topKeywords = categoryData.keywords.slice(0, 3)
              
              return (
                <div key={categoryName} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  {/* Category Header */}
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-${categoryData.color}-100`}>
                      <IconComponent className={`w-5 h-5 text-${categoryData.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{categoryName}</h3>
                      <p className="text-xs text-slate-500">{categoryData.keywords.length} tools</p>
                    </div>
                  </div>
                  
                  {/* Death List - Top 3 */}
                  <div className="space-y-3">
                    {topKeywords.map((keyword, index) => {
                      const replacement = generateSaaSReplacement(keyword)
                      return (
                        <Link 
                          key={keyword.slug}
                          href={`/${keyword.slug}`}
                          className="block p-3 bg-white rounded border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all"
                        >
                          <div className="text-xs font-medium text-slate-900 mb-1">
                            {replacement.saasName}
                          </div>
                          <div className="text-xs text-slate-600 mb-1">
                            → Replaced by: {replacement.toolName}
                          </div>
                          <div className="text-xs font-semibold text-green-600">
                            Savings: ${replacement.savings}/yr
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                  
                  {/* View All Link */}
                  {categoryData.keywords.length > 3 && (
                    <Link 
                      href="/solutions"
                      className="block mt-4 text-center text-xs text-blue-600 hover:underline font-medium"
                    >
                      View all {categoryData.keywords.length} tools →
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* The Architect's Logic */}
        <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700 shadow-2xl p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Code Perspective Window */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">The Architect's Logic</h2>
              <div className="bg-slate-950 rounded-lg border border-slate-700 p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-slate-500 text-xs ml-2">simple-logic.js</span>
                </div>
                <pre className="text-green-400 overflow-x-auto">
{`// Why pay $200/mo for this 10-line logic?

const processData = async (input) => {
  const validated = validateInput(input);
  const transformed = transform(validated);
  const result = await saveToDatabase(transformed);
  return { success: true, data: result };
};

// That's it. No subscription needed.
// Own your code. Own your data. Forever.`}
                </pre>
              </div>
              <p className="text-slate-400 text-sm mt-4 italic">
                "Why pay $200/mo for this 10-line logic?"
              </p>
            </div>
            
            {/* Expert Signature Section */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                {/* Realistic Avatar - Professional Developer */}
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-600 shadow-lg bg-gradient-to-br from-slate-700 to-slate-800">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&crop=face" 
                      alt="The Anti-SaaS Mastermind"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image fails
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                    {/* Fallback initials */}
                    <div className="w-full h-full hidden items-center justify-center text-2xl font-bold text-slate-400">
                      AM
                    </div>
                  </div>
                  {/* Status indicator */}
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-800"></div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">The Anti-SaaS Mastermind</h3>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
                    "I'm here to return the keys of the business to the owners. 
                    No more monthly rent on your own data."
                  </p>
                </div>
              </div>
              
              <div className="border-t border-slate-700 pt-6 mt-6">
                <p className="text-slate-400 text-xs text-center">
                  Join the movement. Build your own tools. Break free from subscriptions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Organization and Person Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://killsubscription.com/#organization',
                  'name': 'KillSubscription',
                  'description': 'Global leader in the anti-subscription software movement. Empowering businesses to own their tools and data.',
                  'url': 'https://killsubscription.com',
                  'logo': {
                    '@type': 'ImageObject',
                    'url': 'https://killsubscription.com/logo.png'
                  },
                  'sameAs': [
                    'https://twitter.com/killsubscription',
                    'https://github.com/killsubscription'
                  ],
                  'foundingDate': '2024',
                  'mission': 'Return the keys of business to the owners. Eliminate monthly rent on your own data.'
                },
                {
                  '@type': 'Person',
                  '@id': 'https://killsubscription.com/#person',
                  'name': 'The Anti-SaaS Mastermind',
                  'description': 'Founder and architect of the global anti-subscription software movement. Advocate for software ownership and data sovereignty.',
                  'url': 'https://killsubscription.com',
                  'jobTitle': 'Software Architect & Anti-SaaS Advocate',
                  'worksFor': {
                    '@id': 'https://killsubscription.com/#organization'
                  },
                  'knowsAbout': [
                    'Software Development',
                    'Self-hosted Applications',
                    'Open Source Software',
                    'Data Sovereignty',
                    'SaaS Alternatives'
                  ]
                }
              ]
            })
          }}
        />

        {/* Schema.org Structured Data for The Execution Matrix */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              'name': 'KillSubscription Execution Matrix - Subscription Alternatives Knowledge Base',
              'description': 'A comprehensive knowledge base of 100+ subscription alternatives organized by industry. Find self-hosted solutions to replace expensive SaaS tools.',
              'numberOfItems': keywords.length,
              'itemListElement': keywords.map((keyword, index) => ({
                '@type': 'ListItem',
                'position': index + 1,
                'name': keyword.title,
                'description': keyword.problem_description,
                'url': `https://killsubscription.com/${keyword.slug}`
              }))
            })
          }}
        />

        {/* Footer */}
        <Footer />

      </div>
    </div>
  )
}
