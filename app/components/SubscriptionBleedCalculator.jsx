'use client'
import React, { useState, useEffect } from 'react'
import { getSaaSPrice } from '../lib/saasPrices'

export default function SubscriptionBleedCalculator({ slug }) {
  const [monthlyPrice, setMonthlyPrice] = useState(0)
  const [users, setUsers] = useState(1)
  const [saasTotal, setSaasTotal] = useState(0)
  const [displayPrice, setDisplayPrice] = useState(0)

  useEffect(() => {
    const price = getSaaSPrice(slug)
    setMonthlyPrice(price)
    setDisplayPrice(price)
  }, [slug])

  useEffect(() => {
    const total = monthlyPrice * users * 12 * 10
    setSaasTotal(total)
  }, [monthlyPrice, users])

  const handlePriceChange = (e) => {
    const rawValue = e.target.value
    if (rawValue === '') {
      setDisplayPrice('')
      setMonthlyPrice(0)
      return
    }
    const value = parseFloat(rawValue)
    if (!isNaN(value) && value >= 0 && value <= 500) {
      setDisplayPrice(value)
      setMonthlyPrice(value)
    }
  }

  const handleUsersChange = (e) => {
    const rawValue = e.target.value
    if (rawValue === '') {
      setUsers('')
      return
    }
    const value = parseInt(rawValue)
    if (!isNaN(value) && value >= 1 && value <= 50) {
      setUsers(value)
    }
  }

  return (
    <div className="mb-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-lg border border-slate-800 p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-green-600 rounded-lg flex items-center justify-center">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Subscription Bleed Calculator</h3>
          <p className="text-slate-400 text-sm">Calculate your 10-year SaaS cost nightmare</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Industry SaaS Monthly Fee (per user)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">$</span>
            <input
              type="number"
              value={displayPrice}
              onChange={handlePriceChange}
              className="w-full bg-slate-800 border border-slate-700 text-white text-lg font-semibold pl-8 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              max="500"
              step="1"
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">Auto-detected based on your industry</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Number of Users (1-50)
          </label>
          <input
            type="number"
            value={users}
            onChange={handleUsersChange}
            className="w-full bg-slate-800 border border-slate-700 text-white text-lg font-semibold px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            max="50"
          />
          <p className="text-xs text-slate-500 mt-1">Team size or expected users</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
        <div className="text-center mb-6">
          <p className="text-sm text-slate-400 mb-2">10-Year Total Cost Comparison</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-950/50 to-red-900/30 border-2 border-red-600/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-red-400 font-semibold text-sm uppercase tracking-wide">SaaS Rent</span>
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.293 6.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L9 4.414V17a1 1 0 11-2 0V4.414L4.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mb-2">
                ${saasTotal.toLocaleString()}
              </p>
              <p className="text-xs text-red-400">Bleeding money for 10 years</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-950/50 to-green-900/30 border-2 border-green-600/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-green-400 font-semibold text-sm uppercase tracking-wide">Your Cost</span>
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-2">
                $0
              </p>
              <p className="text-xs text-green-400">Permanent ownership, forever free</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-slate-400">You save:</span>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              ${saasTotal.toLocaleString()}
            </span>
            <span className="text-slate-400">over 10 years</span>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-xs text-slate-500 italic">
          Calculated based on 2026 SaaS price indices and inflation data.
        </p>
      </div>

      {/* The Execution Verdict - Comparison Table */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-900/20 to-green-900/20 px-6 py-4 border-b border-slate-800">
          <h4 className="text-lg font-bold text-white text-center">The Execution Verdict</h4>
        </div>
        
        <table 
          className="w-full"
          itemScope 
          itemType="https://schema.org/Table"
        >
          <caption className="sr-only">Comparison between SaaS and Your Tool</caption>
          <thead>
            <tr className="bg-slate-800/50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-400 w-1/3">Feature</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-red-400 w-1/3">SaaS</th>
              <th 
                className="px-4 py-3 text-left text-sm font-semibold text-yellow-400 w-1/3 shadow-[0_0_15px_rgba(250,204,21,0.15)]"
                itemProp="about"
              >
                Your Tool
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="px-4 py-4 text-sm font-medium text-slate-300">Wait Time</td>
              <td className="px-4 py-4 text-sm text-slate-400">
                <span className="text-red-400">App Loading + Login (30s+)</span>
              </td>
              <td className="px-4 py-4 text-sm text-yellow-400 font-semibold shadow-[inset_0_0_20px_rgba(250,204,21,0.1)]">
                Instant (0s)
              </td>
            </tr>
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="px-4 py-4 text-sm font-medium text-slate-300">Data Ownership</td>
              <td className="px-4 py-4 text-sm text-slate-400">
                <span className="text-red-400">Rented (They own it)</span>
              </td>
              <td className="px-4 py-4 text-sm text-yellow-400 font-semibold shadow-[inset_0_0_20px_rgba(250,204,21,0.1)]">
                Owned (100% Private)
              </td>
            </tr>
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="px-4 py-4 text-sm font-medium text-slate-300">Monthly Tax</td>
              <td className="px-4 py-4 text-sm text-slate-400">
                <span className="text-red-400">${monthlyPrice}/mo Forever</span>
              </td>
              <td className="px-4 py-4 text-sm text-yellow-400 font-semibold shadow-[inset_0_0_20px_rgba(250,204,21,0.1)]">
                $0.00
              </td>
            </tr>
          </tbody>
        </table>

        {/* Schema.org structured data for table */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Table',
              'about': 'Comparison between SaaS subscription tools and self-hosted alternatives',
              'name': 'The Execution Verdict',
              'description': 'Feature comparison showing wait time, data ownership, and monthly cost differences between SaaS and local-first tools',
              'hasPart': [
                {
                  '@type': 'TableRow',
                  'rowType': 'header',
                  'hasPart': [
                    { '@type': 'TableCell', 'text': 'Feature' },
                    { '@type': 'TableCell', 'text': 'SaaS' },
                    { '@type': 'TableCell', 'text': 'Your Tool' }
                  ]
                },
                {
                  '@type': 'TableRow',
                  'hasPart': [
                    { '@type': 'TableCell', 'text': 'Wait Time' },
                    { '@type': 'TableCell', 'text': 'App Loading + Login (30s+)' },
                    { '@type': 'TableCell', 'text': 'Instant (0s)' }
                  ]
                },
                {
                  '@type': 'TableRow',
                  'hasPart': [
                    { '@type': 'TableCell', 'text': 'Data Ownership' },
                    { '@type': 'TableCell', 'text': 'Rented (They own it)' },
                    { '@type': 'TableCell', 'text': 'Owned (100% Private)' }
                  ]
                },
                {
                  '@type': 'TableRow',
                  'hasPart': [
                    { '@type': 'TableCell', 'text': 'Monthly Tax' },
                    { '@type': 'TableCell', 'text': `$${monthlyPrice}/mo Forever` },
                    { '@type': 'TableCell', 'text': '$0.00' }
                  ]
                }
              ]
            })
          }}
        />
      </div>
    </div>
  )
}
