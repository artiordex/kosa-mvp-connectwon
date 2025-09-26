
import Link from 'next/link';

export default function PopularProgramsSection() {
  const programs = [
    {
      title: "2025 제5회 투자상담회 참가기업 모집",
      date: "2025-09-26",
      image: "https://readdy.ai/api/search-image?query=Professional%20investment%20consulting%20meeting%20with%20business%20presentations%2C%20modern%20conference%20room%2C%20entrepreneurs%20presenting%20to%20investors%2C%20professional%20business%20atmosphere&width=400&height=250&seq=invest1&orientation=landscape"
    },
    {
      title: "AI 모델과 업무자동화를 연결하는 API 개발 실무 교육",
      date: "2025-09-25 ~ 2025-10-24",
      image: "https://readdy.ai/api/search-image?query=AI%20programming%20workshop%20with%20developers%20learning%20automation%20and%20API%20development%2C%20coding%20on%20computers%2C%20technical%20training%20environment%2C%20modern%20classroom&width=400&height=250&seq=ai1&orientation=landscape"
    },
    {
      title: "SW개발 공모전 참가자 모집",
      date: "2025-09-01 ~ 2025-12-17",
      image: "https://readdy.ai/api/search-image?query=Software%20development%20competition%20with%20young%20programmers%20working%20on%20projects%2C%20collaborative%20coding%20environment%2C%20innovation%20and%20creativity%2C%20modern%20tech%20space&width=400&height=250&seq=contest1&orientation=landscape"
    },
    {
      title: "2025 커넥트원 전문가 멘토링 참가 신청",
      date: "2025-04-09 ~ 2025-11-30",
      image: "https://readdy.ai/api/search-image?query=Professional%20mentoring%20session%20with%20expert%20advisor%20guiding%20young%20entrepreneurs%2C%20business%20consultation%20meeting%2C%20modern%20office%20environment%2C%20knowledge%20sharing&width=400&height=250&seq=mentor1&orientation=landscape"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-blue-600 font-semibold text-lg">프로그램</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
              커넥트원의<br />프로그램을 확인하세요
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
              <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center"></i>
            </button>
            <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
              <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <Link key={index} href="/programs" className="group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <img 
                    src={program.image}
                    alt={program.title}
                    className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
                    {program.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {program.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
