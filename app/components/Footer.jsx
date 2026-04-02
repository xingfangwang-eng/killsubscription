import React from 'react';
import Link from 'next/link';
import keywords from '../../data/keywords.json';

const Footer = () => {
  const mostKilledThisMonth = keywords.slice(0, 10);

  return (
    <footer className="w-full mt-16 pt-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">
            Most Killed This Month
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {mostKilledThisMonth.map((keyword) => (
              <Link
                key={keyword.slug}
                href={`/${keyword.slug}`}
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors line-clamp-2"
                title={keyword.title}
              >
                {keyword.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <Link href="/terms" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
            Privacy
          </Link>
          <Link href="/refund" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
            Refund
          </Link>
          <Link href="/about" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
            About
          </Link>
        </div>

        <div className="text-center text-xs text-slate-500 pb-8">
          <div className="flex items-center justify-center gap-2">
            <span>Support:</span>
            <a href="mailto:457239850@qq.com" className="text-blue-600 hover:underline">
              457239850@qq.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
