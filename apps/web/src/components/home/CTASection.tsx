
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
          지금 시작하세요!
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          커넥트원에 가입하고 다양한 프로그램을 경험해보세요. 
          새로운 취미와 기술을 배울 수 있는 기회가 기다리고 있습니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
          >
            무료 회원가입
          </Link>
          <Link
            href="/programs"
            className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            프로그램 둘러보기
          </Link>
        </div>
      </div>
    </section>
  );
}
