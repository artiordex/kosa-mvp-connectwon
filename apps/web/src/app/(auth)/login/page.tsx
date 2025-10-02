'use client';

import Login from './Login';
import AppShell from 'components/AppShell';

export default function LoginPage() {
  return (
    <AppShell>
      <div className="min-h-[90vh] flex items-center justify-center py-12 sm:py-20 lg:py-24">
        <Login />
      </div>
    </AppShell>
  );
}
