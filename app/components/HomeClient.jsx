'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Play, Loader2, Copy, Download, RefreshCw, AlertTriangle } from 'lucide-react'

// 导入关键词数据
import keywords from '../../data/keywords.json'

export default function HomeClient() {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [error, setError] = useState(false)
  const iframeRef = useRef(null)

  // 从 LocalStorage 加载数据
  useEffect(() => {
    const savedInput = localStorage.getItem('killSubscriptionInput')
    const savedCode = localStorage.getItem('killSubscriptionCode')
    if (savedInput) setInput(savedInput)
    if (savedCode) setGeneratedCode(savedCode)
  }, [])

  // 保存数据到 LocalStorage
  useEffect(() => {
    localStorage.setItem('killSubscriptionInput', input)
  }, [input])

  useEffect(() => {
    if (generatedCode) {
      localStorage.setItem('killSubscriptionCode', generatedCode)
      // 创建 blob URL 用于 iframe 预览
      const blob = new Blob([generatedCode], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      setPreviewUrl(url)
    }
  }, [generatedCode])

  const handleExecute = () => {
    setLoading(true)
    setError(false)
    // 模拟 AI API 调用
    setTimeout(() => {
      // 模拟 20% 的错误率
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
  <script src="https://cdn.tailwindcss.com" onerror="console.error('Failed to load Tailwind CSS CDN');"></script>
  <script src="https://unpkg.com/lucide@latest" onerror="console.error('Failed to load Lucide CDN');"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#6366f1',
          },
        },
      }
    }
  </script>
</head>
<body class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
  <div class="w-full max-w-md bg-white rounded-lg shadow-sm p-6 border border-slate-200">
    <h1 class="text-2xl font-bold text-slate-900 mb-4">Subscription Manager</h1>
    <p class="text-slate-500 mb-6">Manage your subscriptions efficiently</p>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Subscription Name</label>
        <input type="text" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Netflix" />
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Monthly Cost</label>
        <input type="number" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="15.99" />
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Billing Cycle</label>
        <select class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option>Monthly</option>
          <option>Yearly</option>
          <option>Quarterly</option>
        </select>
      </div>
      <button class="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
        Save Subscription
      </button>
    </div>
  </div>
  
  <script>
    // LocalStorage 数据持久化
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 背景网格效果 */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* 主内容 */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        {/* 顶部 Logo 和 Slogan */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            KILLSUBSCRIPTION
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Stop renting tools, start owning them.
          </p>
        </div>

        {/* 中间 Textarea */}
        <div className="w-full bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-8">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your subscription details here..."
            className="w-full min-h-[200px] p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 border-b border-slate-200 resize-none"
          />
        </div>

        {/* 按钮组 */}
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

        {/* 浏览所有替代方案按钮 */}
        <div className="mb-12 text-center">
          <Link 
            href="/solutions" 
            className="inline-flex items-center px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium transition-all duration-300 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
          >
            <span>Browse All Alternatives</span>
          </Link>
        </div>

        {/* 错误提示 */}
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

        {/* 生成的代码和预览 */}
        {generatedCode && (
          <div className="w-full bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-12">
            {/* 操作按钮 */}
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
              {/* 代码编辑器 */}
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
              
              {/* 预览窗口 */}
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

        {/* 计数器 */}
        <div className="mt-12 mb-8 text-center">
          <p className="text-lg font-medium text-slate-900">
            Total Subscriptions Killed: <span className="text-primary font-bold">$0</span> (and counting)
          </p>
        </div>

        {/* 打赏按钮 */}
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

        {/* Quick Access 文字矩阵 */}
        <div className="mt-12 mb-12 w-full max-w-4xl">
          <h2 className="text-sm font-medium text-slate-500 mb-6 text-center">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {keywords.slice(0, 15).map((keyword) => (
              <Link 
                key={keyword.slug} 
                href={`/${keyword.slug}`} 
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                {keyword.title}
              </Link>
            ))}
          </div>
        </div>

        {/* 底部信息 */}
        <div className="text-center text-sm text-slate-400">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="/terms" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-slate-600 transition-colors">Privacy</a>
            <a href="/refund" className="hover:text-slate-600 transition-colors">Refund</a>
            <a href="/about" className="hover:text-slate-600 transition-colors">About</a>
          </div>
          <p className="mb-2">Support: 457239850@qq.com</p>
          <p>Securely process your subscription data</p>
        </div>
      </div>
    </div>
  )
}
