'use client';

import Onboarding from './Onboarding';
import AppShell from 'components/AppShell';

export default function OnboardingPage() {
  return (
    <AppShell>
      <div className="min-h-[90vh] flex items-center justify-center py-12 sm:py-20 lg:py-24 px-4">
        <div className="max-w-lg w-full">
          <Onboarding />
        </div>
      </div>
    </AppShell>
  );
}
