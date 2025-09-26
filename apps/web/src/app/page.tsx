'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CTASection from '../components/home/CTASection';
import FeaturesSection from '../components/home/FeaturesSection';
import HeroSection from '../components/home/HeroSection';
import NewsSection from '../components/home/NewsSection';
import PopularProgramsSection from '../components/home/PopularProgramsSection';
import QuickAccessSection from '../components/home/QuickAccessSection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero / 주요 섹션 */}
        <HeroSection />
        <FeaturesSection />
        <PopularProgramsSection />
        <QuickAccessSection />
        <NewsSection />
        <CTASection />

        {/* 간단 소개 + 카드 */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">ConnectWon</h1>
          <p className="mt-3 text-base text-gray-600">예약, 결제, 멘토링을 한곳에서. 지금 바로 시작하세요.</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/programs" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50">
              프로그램 보기
            </Link>
            <Link href="/reservation" className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              예약하기
            </Link>
            <Link href="/(auth)/login" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50">
              로그인
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Card title="멘토링" desc="경험 많은 멘토와 1:1 세션을 예약하세요." href="/users" />
            <Card title="마이페이지" desc="내 예약과 결제 내역을 확인하세요." href="/mypage" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Card({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="block rounded-2xl border border-gray-200 p-5 transition hover:shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
      <span className="mt-3 inline-block text-sm text-gray-900">바로가기 →</span>
    </Link>
  );
}
