
import Link from 'next/link';

export default function NewsSection() {
  const newsItems = [
    {
      title: "커넥트원 공지사항 - 2025 테스트디바이스 리스트",
      date: "2025-09-17",
      category: "공지사항"
    },
    {
      title: "정부지원사업소식 - 2025년 길음청년희망스토어 청년창업 지원사업",
      date: "2025-09-15",
      category: "정부지원사업"
    },
    {
      title: "정부지원사업소식 - 2025 제6회 하남도시공사 창업경진대회",
      date: "2025-09-15",
      category: "정부지원사업"
    },
    {
      title: "정부지원사업소식 - 2025년 오픈데이터포럼 공공데이터·AI 활용 프로젝트",
      date: "2025-09-15",
      category: "정부지원사업"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-blue-600 font-semibold text-lg">커넥트원 뉴스</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
              커넥트원의<br />소식을 확인하세요
            </h2>
          </div>
          <Link
            href="/programs"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            뉴스 더보기
            <i className="ri-arrow-right-line ml-1 w-4 h-4 flex items-center justify-center"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                  {item.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">
                {item.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
