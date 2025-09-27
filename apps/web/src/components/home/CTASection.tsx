import Link from 'next/link';

export default function CTASection() {
  return (
    <section
      className="py-20 relative text-center"
      style={{
        backgroundImage: "linear-gradient(rgba(30,58,138,0.85), rgba(30,58,138,0.85)), url('/images/cta_sec_bk.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 제목 */}
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
          당신의 아이디어가 <span className="text-yellow-300">프로젝트</span>가 됩니다
        </h2>

        {/* 설명 */}
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">도전가에서 크리에이터까지, 커넥트원에서 함께 성장하는 이야기를 만들어가세요.</p>

        {/* CTA 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {[
            { href: '/devices', label: '공간 및 디바이스' },
            { href: '/creator', label: '크리에이터 소개' },
            { href: '/programs', label: '공간 및 프로그램' },
            { href: '/contact', label: '커넥트원 문의' },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold
                        transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                        hover:bg-blue-700 cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
