import Footer from 'components/Footer';
import Header from 'components/Header';
import Onboarding from './Onboarding';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 pb-12 px-4">
        <div className="max-w-lg mx-auto">
          <Onboarding />
        </div>
      </main>
      <Footer />
    </div>
  );
}
