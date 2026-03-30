'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronUp, Code, Terminal, Zap, Shield, Layout, Cpu } from 'lucide-react';

// 导入关键词数据
import keywords from '../../data/keywords.json';

// 分类逻辑
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
    const keyword = item.keyword?.toLowerCase() || '';
    
    if (title.includes('tool') || title.includes('api') || title.includes('code') || title.includes('javascript') || title.includes('react') || title.includes('frontend') || title.includes('backend')) {
      categories['Development Tools'].push(item);
    } else if (title.includes('performance') || title.includes('optimize') || title.includes('speed') || title.includes('load') || title.includes('fast')) {
      categories['Performance Optimization'].push(item);
    } else if (title.includes('security') || title.includes('secure') || title.includes('api key') || title.includes('authentication') || title.includes('auth')) {
      categories['Security Solutions'].push(item);
    } else if (title.includes('design') || title.includes('ui') || title.includes('ux') || title.includes('responsive') || title.includes('layout')) {
      categories['UI/UX Design'].push(item);
    } else {
      categories['Data Management'].push(item);
    }
  });

  return categories;
}

export default function SolutionsClient() {
  const categories = categorizeKeywords(keywords);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedCategories, setExpandedCategories] = useState({
    'Development Tools': true,
    'Performance Optimization': true,
    'Security Solutions': true,
    'UI/UX Design': true,
    'Data Management': true
  });

  // 过滤解决方案
  const filteredSolutions = keywords.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.problem_description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'All') {
      return matchesSearch;
    } else {
      return matchesSearch && categories[selectedCategory].some(sol => sol.slug === item.slug);
    }
  });

  // 切换分类展开/收起状态
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'name': 'KillSubscription Solutions Hub',
            'description': 'A comprehensive hub of 100 solutions for developers and businesses',
            'itemListElement': keywords.map((item, index) => ({
              '@type': 'ListItem',
              'position': index + 1,
              'name': item.title,
              'url': `/${item.slug}`
            }))
          })
        }}
      />

      {/* 顶部搜索栏 */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="relative">
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

      {/* 主内容 */}
      <div className="max-w-7xl mx-auto px-6 my-12">
        {/* 面包屑导航 */}
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
                  <span className="text-slate-900 font-medium">KillSubscription Hub</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* 标题部分 */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-4">KillSubscription Hub</h1>
          <p className="text-lg leading-relaxed text-slate-600 max-w-3xl mx-auto">
            A comprehensive collection of 100 solutions to help you streamline your development workflow and optimize your applications.
          </p>
        </div>

        {/* 分类导航 */}
        <nav className="mb-12 overflow-x-auto">
          <div className="flex space-x-4 pb-4">
            <button
              className={`px-6 py-3 font-medium ${selectedCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'} active:scale-95 transition-all`}
              onClick={() => setSelectedCategory('All')}
            >
              All Solutions
            </button>
            {Object.keys(categories).map((category) => (
              <button
                key={category}
                className={`px-6 py-3 font-medium ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'} active:scale-95 transition-all`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </nav>

        {/* 搜索结果计数 */}
        {searchTerm && (
          <div className="mb-8">
            <p className="text-lg text-slate-600">
              Found <span className="font-semibold">{filteredSolutions.length}</span> solutions matching "{searchTerm}"
            </p>
          </div>
        )}

        {/* 分类内容 */}
        {selectedCategory === 'All' ? (
          // 全部解决方案
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSolutions.map((item) => (
              <article key={item.slug} className="bg-white border border-slate-200 p-8 hover:border-blue-600 transition-all">
                <Link href={`/${item.slug}`} className="block" target="_blank" rel="noopener noreferrer">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {item.problem_description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <span>View Solution</span>
                    <ChevronDown className="w-5 h-5 ml-2" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          // 按分类显示
          <div className="space-y-12">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4">
                  {selectedCategory}
                </h2>
                <button
                  onClick={() => toggleCategory(selectedCategory)}
                  className="flex items-center text-slate-600 hover:text-blue-600"
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
              
              {expandedCategories[selectedCategory] && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categories[selectedCategory].filter(item => 
                    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.problem_description.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((item) => (
                    <article key={item.slug} className="bg-white border border-slate-200 p-8 hover:border-blue-600 transition-all">
                      <Link href={`/${item.slug}`} className="block" target="_blank" rel="noopener noreferrer">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                        <p className="text-slate-600 mb-4 line-clamp-3">
                          {item.problem_description}
                        </p>
                        <div className="flex items-center text-blue-600 font-medium">
                          <span>View Solution</span>
                          <ChevronDown className="w-5 h-5 ml-2" />
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 分类概览 */}
        <div className="mt-16 pt-16 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-blue-600 pl-4">
            Category Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {Object.entries(categories).map(([category, items]) => (
              <div key={category} className="bg-white border border-slate-200 p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mr-4">
                    {category === 'Development Tools' && <Code className="w-6 h-6 text-slate-400" />}
                    {category === 'Performance Optimization' && <Zap className="w-6 h-6 text-slate-400" />}
                    {category === 'Security Solutions' && <Shield className="w-6 h-6 text-slate-400" />}
                    {category === 'UI/UX Design' && <Layout className="w-6 h-6 text-slate-400" />}
                    {category === 'Data Management' && <Cpu className="w-6 h-6 text-slate-400" />}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{category}</h3>
                </div>
                <p className="text-slate-600 mb-4">{items.length} solutions</p>
                <Link 
                  href="#" 
                  className="inline-flex items-center text-blue-600 font-medium hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(category);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  View All
                  <ChevronDown className="w-5 h-5 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
