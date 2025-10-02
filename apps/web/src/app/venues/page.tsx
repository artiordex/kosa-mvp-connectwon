'use client';

import VenueHeroSection from './VenueHeroSection';
import VenueListSection from './VenueListSection';
import AppShell from 'components/AppShell';

export default function CentersPage() {
  return (
    <AppShell className="bg-white pt-20">
      <VenueHeroSection />
      <VenueListSection />
    </AppShell>
  );
}
