import Link from 'next/link';
import features from '../../data/features.json';

export default function FeatureSection() {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {features.map((item, index) => (
          <div key={index} className="relative h-[400px] group overflow-hidden">
            {/* 배경 이미지 */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* 어두운 오버레이 */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors"></div>

            {/* 텍스트 + 버튼 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <Link
                href={item.link}
                className="px-6 py-2 border border-white rounded-full text-sm font-medium hover:bg-white hover:text-black transition-colors"
              >
                자세히보기
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
