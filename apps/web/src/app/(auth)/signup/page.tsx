'use client';

import Signup from './Signup';
import AppShell from 'components/AppShell';

export default function SignupPage() {
  return (
    <AppShell>
      <div className="min-h-[90vh] flex items-center justify-center py-12 sm:py-20 lg:py-24">
        <Signup />
      </div>
    </AppShell>
  );
}
