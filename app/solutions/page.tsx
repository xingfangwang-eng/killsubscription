// Generate SEO metadata
export async function generateMetadata() {
  return {
    title: 'KillSubscription Hub - No Subscription, Zero Cost',
    description: 'Browse all lightweight alternatives to expensive SaaS tools. Build your own apps in minutes, data stored locally, 100% private and forever free.',
    canonical: 'https://killsubscription.com/solutions',
  }
}

// Import client component
import SolutionsClient from '../components/SolutionsClient';

export default function Solutions() {
  return <SolutionsClient />
}