
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FamilyHero from './CreatorHero';
import FamilyContent from './CreatorContent';

export default function FamilyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <FamilyHero />
        <FamilyContent />
      </div>
      <Footer />
    </div>
  );
}
