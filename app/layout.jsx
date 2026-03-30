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
      <body className="min-h-screen bg-gray-50 font-sans">
        {children}
        <Script src="/shared-footer.js" strategy="afterInteractive" />
        <shared-footer></shared-footer>
      </body>
    </html>
  )
}