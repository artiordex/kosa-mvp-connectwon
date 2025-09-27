'use client';

import Link from 'next/link';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import CentersHero from './CentersHero';
import CentersList from './CentersList';

export default function CentersPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* 헤더 */}
      <Header />
      <main className="flex-grow">
      <CentersHero />
      <CentersList />
      </main>
      {/* 푸터 */}
      <Footer />
    </div>
  );
}
