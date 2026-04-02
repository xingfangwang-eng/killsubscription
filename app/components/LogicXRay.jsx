'use client'
import React, { useState } from 'react'

// 代码逻辑库 - 根据slug返回核心代码
const CODE_LOGIC_LIBRARY = {
  'convert-curl-to-axios': `// Core Logic: Parse curl and generate Axios config
function parseCurlToAxios(curlCommand) {
  const config = {
    method: 'GET',
    url: '',
    headers: {},
    data: null
  };

  // Extract URL
  const urlMatch = curlCommand.match(/curl ['"]([^'"]+)['"]/);
  if (urlMatch) config.url = urlMatch[1];

  // Extract method
  const methodMatch = curlCommand.match(/-X\s+(\w+)/);
  if (methodMatch) config.method = methodMatch[1].toUpperCase();

  // Extract headers
  const headerMatches = curlCommand.matchAll(/-H\s+['"]([^'"]+)['"]/g);
  for (const match of headerMatches) {
    const [key, value] = match[1].split(': ');
    config.headers[key] = value;
  }

  // Extract data
  const dataMatch = curlCommand.match(/-d\s+['"]([^'"]+)['"]/);
  if (dataMatch) {
    try {
      config.data = JSON.parse(dataMatch[1]);
    } catch {
      config.data = dataMatch[1];
    }
  }

  return config;
}`,

  'optimize-react-performance': `// Core Logic: Detect unnecessary re-renders
function analyzeComponentRenders(component) {
  const issues = [];
  
  // Check for inline object/array creation
  if (hasInlineObjectInRender(component)) {
    issues.push({
      type: 'inline-object',
      fix: 'Use useMemo() or move outside component'
    });
  }

  // Check for function creation in render
  if (hasInlineFunctionInRender(component)) {
    issues.push({
      type: 'inline-function', 
      fix: 'Use useCallback() to memoize'
    });
  }

  // Check props stability
  const unstableProps = getUnstableProps(component);
  if (unstableProps.length > 0) {
    issues.push({
      type: 'unstable-props',
      props: unstableProps,
      fix: 'Wrap with React.memo() or memoize props'
    });
  }

  return issues;
}

function hasInlineObjectInRender(code) {
  return /return\s*\(\s*<[\s\S]*?\{\s*\{[\s\S]*?\}\s*\}/.test(code);
}`,

  'secure-api-keys': `// Core Logic: Proxy pattern for API key protection
class SecureAPIProxy {
  constructor() {
    this.tokenCache = new Map();
    this.refreshPromise = null;
  }

  async fetchWithAuth(endpoint, options = {}) {
    const token = await this.getValidToken();
    
    const response = await fetch(\`/api/proxy\${endpoint}\`, {
      ...options,
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (response.status === 401) {
      this.tokenCache.delete('access_token');
      return this.fetchWithAuth(endpoint, options);
    }

    return response;
  }

  async getValidToken() {
    const cached = this.tokenCache.get('access_token');
    if (cached && cached.expiresAt > Date.now()) {
      return cached.token;
    }
    return this.refreshToken();
  }
}`,

  'responsive-design-tips': `// Core Logic: Breakpoint detection and responsive utilities
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

function useBreakpoint() {
  const [current, setCurrent] = useState('lg');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width >= breakpoints['2xl']) setCurrent('2xl');
      else if (width >= breakpoints.xl) setCurrent('xl');
      else if (width >= breakpoints.lg) setCurrent('lg');
      else if (width >= breakpoints.md) setCurrent('md');
      else setCurrent('sm');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return {
    current,
    isMobile: current === 'sm',
    isTablet: current === 'md',
    isDesktop: ['lg', 'xl', '2xl'].includes(current)
  };
}`,

  'javascript-async-await': `// Core Logic: Async operation orchestration
class AsyncQueue {
  constructor(concurrency = 3) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  async add(fn, priority = 0) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject, priority });
      this.queue.sort((a, b) => b.priority - a.priority);
      this.process();
    });
  }

  async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }

    this.running++;
    const { fn, resolve, reject } = this.queue.shift();

    try {
      const result = await fn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process();
    }
  }
}

// Usage: Priority-based async task execution
const queue = new AsyncQueue(3);
await queue.add(() => fetchCriticalData(), 10);
await queue.add(() => fetchBackgroundData(), 1);`,

  'css-grid-layout': `// Core Logic: Grid template generator
function generateGridTemplate(columns, rows, gap = '1rem') {
  const colTemplate = columns.map(col => {
    if (typeof col === 'number') return \`\${col}fr\`;
    if (col.endsWith('px') || col.endsWith('%')) return col;
    return \`minmax(\${col.min}, \${col.max})\`;
  }).join(' ');

  const rowTemplate = rows.map(row => {
    if (typeof row === 'number') return \`\${row}fr\`;
    if (row === 'auto') return 'auto';
    return \`minmax(min-content, max-content)\`;
  }).join(' ');

  return {
    display: 'grid',
    gridTemplateColumns: colTemplate,
    gridTemplateRows: rowTemplate,
    gap: gap,
    gridAutoFlow: 'row dense'
  };
}

// Generate responsive grid
const responsiveGrid = {
  mobile: generateGridTemplate([1], ['auto'], '0.5rem'),
  tablet: generateGridTemplate([1, 1], ['auto'], '1rem'),
  desktop: generateGridTemplate([1, 1, 1], ['auto'], '1.5rem')
};`,

  'nodejs-performance': `// Core Logic: Memory leak detection
class MemoryProfiler {
  constructor() {
    this.baseline = 0;
    this.snapshots = [];
  }

  takeSnapshot(label) {
    if (global.gc) global.gc();
    
    const usage = process.memoryUsage();
    this.snapshots.push({
      label,
      timestamp: Date.now(),
      heapUsed: usage.heapUsed,
      heapTotal: usage.heapTotal,
      external: usage.external
    });

    return usage;
  }

  detectLeaks() {
    const leaks = [];
    
    for (let i = 1; i < this.snapshots.length; i++) {
      const current = this.snapshots[i];
      const previous = this.snapshots[i - 1];
      const growth = current.heapUsed - previous.heapUsed;
      
      // If heap grew by more than 10MB between snapshots
      if (growth > 10 * 1024 * 1024) {
        leaks.push({
          between: [previous.label, current.label],
          growth: (growth / 1024 / 1024).toFixed(2) + 'MB'
        });
      }
    }

    return leaks;
  }
}`,

  'default': `// Core Logic: Local-first data persistence
class LocalFirstStorage {
  constructor(dbName = 'killsubscription-db') {
    this.dbName = dbName;
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('data')) {
          db.createObjectStore('data', { keyPath: 'id' });
        }
      };
    });
  }

  async save(key, data) {
    const transaction = this.db.transaction(['data'], 'readwrite');
    const store = transaction.objectStore('data');
    await store.put({ id: key, data, timestamp: Date.now() });
  }

  async load(key) {
    const transaction = this.db.transaction(['data'], 'readonly');
    const store = transaction.objectStore('data');
    const result = await store.get(key);
    return result?.data || null;
  }
}`
};

// 语法高亮函数
function highlightCode(code) {
  return code
    .replace(/(\/\/.*$)/gm, '<span class="text-slate-500">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-slate-500">$1</span>')
    .replace(/\b(const|let|var|function|class|return|if|else|for|while|async|await|import|export|from|new|this|try|catch|finally|throw|typeof|instanceof)\b/g, '<span class="text-purple-400">$1</span>')
    .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-400">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="text-cyan-400">$1</span>')
    .replace(/('[^']*'|"[^"]*"|`[^`]*`)/g, '<span class="text-green-400">$1</span>')
    .replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span class="text-yellow-400">$1</span>')
    .replace(/\b([a-z][a-zA-Z0-9]*)\s*(?=\()/g, '<span class="text-blue-400">$1</span>');
}

export default function LogicXRay({ slug, monthlyPrice }) {
  const [showToast, setShowToast] = useState(false);
  
  const code = CODE_LOGIC_LIBRARY[slug] || CODE_LOGIC_LIBRARY['default'];
  const highlightedCode = highlightCode(code);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mb-12">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Logic X-Ray</h3>
        <p className="text-slate-600">
          <span className="font-semibold text-red-600">Transparency Report:</span> This is the exact logic SaaS vendors charge you 
          <span className="font-bold text-slate-900"> ${monthlyPrice}/mo</span> for. 
          We've unlocked it for your browser.
        </p>
      </div>

      {/* VSCode-style Code Window */}
      <div className="bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shadow-2xl">
        {/* Window Header */}
        <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-3 text-sm text-slate-400 font-mono">core-logic.js</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Logic
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto">
          <pre className="font-mono text-sm leading-relaxed">
            <code 
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
              className="text-slate-300"
            />
          </pre>
        </div>

        {/* Status Bar */}
        <div className="bg-blue-600 px-4 py-1 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-4">
            <span>JavaScript</span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Ln {code.split('\n').length}</span>
            <span>Col 1</span>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-4 fade-in duration-300 z-50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-semibold">Logic Unlocked</p>
            <p className="text-sm text-green-100">You now own this tool.</p>
          </div>
        </div>
      )}
    </div>
  );
}
