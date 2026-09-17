import { sb } from '../lib/supabase';

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rebel-log.vercel.app';

  const { data } = await sb.from('logs').select('id, kategori, date');
  const items = data || [];

  const karyaUrls = items.map((item) => ({
    url: `${siteUrl}/karya/${item.kategori}/${item.id}`,
    lastModified: item.date,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      priority: 1,
    },
    ...karyaUrls,
  ];
}
