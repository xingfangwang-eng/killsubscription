import '../src/index.css'

export const metadata = {
  title: 'KillSubscription',
  description: 'Stop renting tools, start owning them.',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        {/* Google HTML verification tag */}
        <meta name="google-site-verification" content="uTT2vLHXrvh44esSpln_EMc1QEFjkN0vjJZ04UgI0Qc" />
        
        {/* Preconnect to critical domains for LCP optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* SearchAction Schema for Google search box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              'name': 'KillSubscription',
              'url': 'https://killsubscription.com',
              'potentialAction': {
                '@type': 'SearchAction',
                'target': {
                  '@type': 'EntryPoint',
                  'urlTemplate': 'https://killsubscription.com/solutions?q={search_term_string}'
                },
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 font-sans pt-16">
        {children}
      </body>
    </html>
  )
}