// Generate SEO metadata
export async function generateMetadata() {
  return {
    title: 'KillSubscription - No Subscription, Zero Cost',
    description: 'Stop paying for SaaS tools. Build your own lightweight apps in minutes. Data is stored locally, 100% private and forever free.',
    canonical: 'https://killsubscription.com',
  }
}

// Import client component
import HomeClient from './components/HomeClient';

export default function Home() {
  return <HomeClient />
}