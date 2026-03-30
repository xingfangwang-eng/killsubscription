// 生成 SEO 元数据
export async function generateMetadata() {
  return {
    title: 'KillSubscription Hub - No Subscription, Zero Cost',
    description: 'Browse all lightweight alternatives to expensive SaaS tools. Build your own apps in minutes, data stored locally, 100% private and forever free.',
    canonical: 'https://killsubscription.com/solutions',
  }
}

// 导入客户端组件
import SolutionsClient from '../components/SolutionsClient';

export default function Solutions() {
  return <SolutionsClient />
}