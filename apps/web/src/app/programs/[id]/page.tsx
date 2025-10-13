/**
 * Description : page.tsx - 📌 프로그램 상세 페이지
 * Author : Shiwoo Min
 * Date : 2025-10-12
 */

import Link from 'next/link';
import programsDataRaw from 'data/programs.json';
import programDetailsRaw from 'data/program-details.json';
import ProgramHeader from './ProgramHeader';
import ProgramTabContent from './ProgramTabContent';
import ProgramHero from '../ProgramHero';

interface Program {
  id: number;
  title: string;
  date: string;
  image: string;
  category: string;
  status: string;
  type: string;
  venueId?: number;
  roomId?: number;
  instructor?: string;
}

interface Session {
  id: number;
  date: string;
  time: string;
  spots: number;
  status: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

interface Curriculum {
  week: number;
  title: string;
  content: string;
}

interface Instructor {
  name: string;
  bio: string;
  experience: string;
  certification: string;
  specialty: string[];
}

interface CenterInfo {
  name: string;
  address: string;
  phone: string;
  room: string;
}

interface ProgramDetailData {
  id: string;
  title: string;
  category: string;
  location: string;
  centerInfo: CenterInfo;
  price: number;
  rating: number;
  reviewCount: number;
  participants: number;
  maxParticipants: number;
  duration: string;
  level: string;
  instructor: Instructor;
  description: string;
  fullDescription: string;
  objectives: string[];
  curriculum: Curriculum[];
  whatYouLearn: string[];
  requirements: string[];
  providedItems: string[];
  sessions: Session[];
  images: string[];
  reviews: Review[];
}

interface PageProps {
  params: { id: string };
}

const programsData = programsDataRaw.programs as Program[];
const programDetailsData = programDetailsRaw.programs as Record<string, ProgramDetailData>;

export default function ProgramDetail({ params }: PageProps) {
  const programId = params.id;

  const program = programDetailsData[programId];
  const basicProgram = programsData.find((p) => p.id.toString() === programId);

  if (!program || !basicProgram) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">프로그램을 찾을 수 없습니다</h1>
          <Link href="/programs" className="text-blue-600 hover:underline">
            프로그램 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 영역만큼 여백 확보 */}
      <div className="pt-20">
        {/* 상단 히어로 */}
        <ProgramHero />

        {/* 브레드크럼 */}
        <section className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">홈</Link>
              <i className="ri-arrow-right-s-line" />
              <Link href="/programs" className="hover:text-blue-600">프로그램</Link>
              <i className="ri-arrow-right-s-line" />
              <span className="text-gray-900">{program.title}</span>
            </nav>
          </div>
        </section>

        {/* 프로그램 헤더 */}
        <ProgramHeader program={program} programId={programId} />

        {/* 프로그램 탭 콘텐츠 */}
        <ProgramTabContent program={program} />
      </div>
    </div>
  );
}
