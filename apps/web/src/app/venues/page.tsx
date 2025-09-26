
import Link from 'next/link';
import CentersHero from './CentersHero';
import CentersList from './CentersList';

export default function CentersPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <CentersHero />
      <CentersList />
    </div>
  );
}
