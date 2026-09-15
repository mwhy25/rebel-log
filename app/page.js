import { sb } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Diary from '../components/Diary';
import Calendar from '../components/Calendar';
import Works from '../components/Works';
import Footer from '../components/Footer';

export const revalidate = 0;

export default async function HomePage() {
  const { data, error } = await sb
    .from('logs')
    .select('*')
    .order('date', { ascending: false })
    .limit(200);

  const logs = error || !data ? [] : data;

  return (
    <>
      <Navbar />
      <Hero />
      <Stats logs={logs} />
      <Diary logs={logs} />
      <Calendar logs={logs} />
      <Works logs={logs} />
      <Footer />
    </>
  );
}
