import '../src/index.css'
import Script from 'next/script'

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
        {/* Google HTML 验证标签 */}
        <meta name="google-site-verification" content="uTT2vLHXrvh44esSpln_EMc1QEFjkN0vjJZ04UgI0Qc" />
      </head>
      <body className="min-h-screen bg-gray-50 font-sans pt-16">
        {children}
        <Script src="/shared-footer.js" strategy="afterInteractive" />
        <shared-footer></shared-footer>
      </body>
    </html>
  )
}