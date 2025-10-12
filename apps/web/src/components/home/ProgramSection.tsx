/**
 * Description : ProgramSection.tsx - 📌 커넥트원 프로그램 섹션
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */

import Link from 'next/link';
import programsData from 'data/programs.json';

/**
 * 프로그램 데이터 타입 정의
 */
interface Program {
  id: number;
  title: string;
  date: string;
  image: string;
  category: string;
  status: string;
  description?: string;
  [key: string]: any; // JSON 파일에 추가 필드가 있을 수 있음
}

/**
 * 안정적인 기본 이미지 URL 생성기 (DiceBear 기반)
 */
const getDefaultImage = (title: string) => {
  const seed = encodeURIComponent(title);
  return `https://api.dicebear.com/7.x/shapes/png?seed=${seed}`;
};

/**
 * 인기 프로그램 섹션 컴포넌트
 * programs.json 파일에서 프로그램 데이터를 가져와 표시합니다.
 *
 * @returns {JSX.Element} 인기 프로그램 섹션
 */
export default function ProgramSection() {
  // JSON 구조가 { programs: [...] } 형태이므로 programs 배열 추출
  const programs: Program[] = programsData['programs'];

  // ✅ 프로그램 배열을 무작위로 섞은 뒤 상위 5개만 표시
  const randomPrograms = [...programs]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  return (
    <section className="py-20 bg-white">
      <div className="w-[90%] max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-blue-600 font-semibold text-lg">커넥트원 공간 및 프로그램</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
              커넥트원의 프로그램을 확인하세요
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              aria-label="이전 프로그램"
            >
              <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center"></i>
            </button>
            <button
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              aria-label="다음 프로그램"
            >
              <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {randomPrograms.map((program: Program) => (
            <Link key={program['id']} href="/programs" className="group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:scale-[1.02]">
                <div className="relative">
                  <img
                    src={
                      program['image'] && program['image'].trim() !== ''
                        ? program['image']
                        : getDefaultImage(program['title'])
                    }
                    alt={program['title']}
                    className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.src = getDefaultImage(program['title']);
                    }}
                  />
                  {/* 호버 시 오버레이 효과 */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>

                  {/* 카테고리 뱃지 */}
                  {program['category'] && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        {program['category']}
                      </span>
                    </div>
                  )}

                  {/* 상태 뱃지 */}
                  {program['status'] && (
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          program['status'] === 'recruiting' || program['status'] === '모집중'
                            ? 'bg-green-100 text-green-800'
                            : program['status'] === 'ongoing' || program['status'] === '진행중'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {program['status']}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {program['title']}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="ri-calendar-line mr-1 w-4 h-4 flex items-center justify-center"></i>
                    {program['date']}
                  </div>

                  {/* 추가 정보가 있다면 표시 */}
                  {program['description'] && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {program['description']}
                    </p>
                  )}
                </div>

                {/* 하단 액션 영역 */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 font-medium group-hover:underline">
                      자세히 보기
                    </span>
                    <i className="ri-arrow-right-line text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 더 많은 프로그램 보기 버튼 */}
        <div className="text-center mt-12">
          <Link
            href="/programs"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span>모든 프로그램 보기</span>
            <i className="ri-arrow-right-line ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
