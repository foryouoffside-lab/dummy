import fs from 'fs';
import path from 'path';
import { redirect, notFound } from 'next/navigation';
import { stripLocale } from '@/lib/i18n/locales';

export default async function FrenchFallbackRedirect({ params }) {
  const { slug = [] } = await params;
  const route = stripLocale('/fr/' + slug.join('/'));
  const pagePath = path.join(process.cwd(), 'app', route, 'page.js');
  if (!fs.existsSync(pagePath)) notFound();
  redirect(route);
}
