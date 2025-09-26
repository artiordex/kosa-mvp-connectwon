
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InsightsHero from './InsightsHero';
import InsightsContent from './InsightsContent';

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <InsightsHero />
        <InsightsContent />
      </div>
      <Footer />
    </div>
  );
}