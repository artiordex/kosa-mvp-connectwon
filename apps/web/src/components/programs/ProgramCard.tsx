
import Link from 'next/link';

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

interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={program.image}
          alt={program.title}
          className="w-full h-48 object-cover object-top rounded-t-xl"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            {program.category}
          </span>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {program.level}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {program.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <i className="ri-user-line mr-2 w-4 h-4 flex items-center justify-center"></i>
            <span className="text-sm">{program.instructor}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <i className="ri-map-pin-line mr-2 w-4 h-4 flex items-center justify-center"></i>
            <span className="text-sm">{program.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <i className="ri-time-line mr-2 w-4 h-4 flex items-center justify-center"></i>
            <span className="text-sm">{program.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <i className="ri-calendar-line mr-2 w-4 h-4 flex items-center justify-center"></i>
            <span className="text-sm">다음 수업: {program.nextSession}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <i className="ri-star-fill text-yellow-400 mr-1 w-4 h-4 flex items-center justify-center"></i>
            <span className="text-sm text-gray-600">{program.rating}</span>
            <span className="text-sm text-gray-500 ml-2">({program.participants}/{program.maxParticipants}명)</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            {program.price.toLocaleString()}원
          </span>
          <Link
            href={`/programs/${program.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            자세히 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
