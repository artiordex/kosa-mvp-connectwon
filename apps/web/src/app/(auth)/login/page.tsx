import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Login from './login';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="min-h-[90vh] bg-gray-50 pb-12 pt-20" style={{ paddingTop: '80px' }}>
        <Login />
      </main>
      <Footer />
    </div>
  );
}
