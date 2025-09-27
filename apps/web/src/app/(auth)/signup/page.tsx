import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Signup from './Signup';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12 pt-20">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Signup />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
