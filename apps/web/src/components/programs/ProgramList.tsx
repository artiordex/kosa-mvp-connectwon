
import ProgramCard from './ProgramCard';

interface Program {
  id: number;
  title: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  participants: number;
  maxParticipants: number;
  duration: string;
  level: string;
  instructor: string;
  nextSession: string;
  image: string;
}

interface ProgramListProps {
  programs: Program[];
}

export default function ProgramList({ programs }: ProgramListProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            프로그램 목록 ({programs.length}개)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        {programs.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-search-line text-gray-400 text-6xl mb-4 w-16 h-16 flex items-center justify-center mx-auto"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600">다른 검색 조건을 시도해보세요</p>
          </div>
        )}
      </div>
    </section>
  );
}
