import Footer from '../../components/Footer';
import Header from '../../components/Header';
import CreatorHero from './CreatorHero';
import CreatorSection from './CreatorSection';

export default function CreatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <CreatorHero />
        <CreatorSection />
      </div>
      <Footer />
    </div>
  );
}
