import Link from 'next/link';
import roomsData from '../../data/rooms.json';

/**
 * 공간 및 디바이스 데이터 타입 정의
 */
interface Room {
  id: number;
  name: string;
  type: 'space' | 'device';
  category: string;
  capacity?: number;
  price: string;
  availability: string;
  image: string;
  features: string[];
  description?: string;
  [key: string]: any; // JSON 파일에 추가 필드가 있을 수 있음
}

/**
 * 커넥트원 공간 및 디바이스 섹션 컴포넌트
 * rooms.json 파일에서 공간 및 디바이스 데이터를 가져와 표시합니다.
 *
 * @returns {JSX.Element} 공간 및 디바이스 섹션
 */
export default function RoomSection() {
  // JSON 구조가 { spaces: [...] } 형태이므로 spaces 배열 추출
  const rooms: Room[] = roomsData['spaces'];

  /**
   * 타입에 따른 아이콘을 반환합니다.
   * @param {string} type - 아이템 타입 (space 또는 device)
   * @returns {string} 아이콘 클래스명
   */
  const getTypeIcon = (type: string): string => {
    return type === 'space' ? 'ri-building-line' : 'ri-computer-line';
  };

  /**
   * 가용성 상태에 따른 스타일을 반환합니다.
   * @param {string} availability - 가용성 상태
   * @returns {string} CSS 클래스명
   */
  const getAvailabilityStyle = (availability: string): string => {
    switch (availability) {
      case 'available':
      case '이용 가능':
        return 'bg-green-100 text-green-800';
      case 'busy':
      case '사용 중':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
      case '점검 중':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * 가용성 상태 텍스트를 반환합니다.
   * @param {string} availability - 가용성 상태
   * @returns {string} 표시할 텍스트
   */
  const getAvailabilityText = (availability: string): string => {
    const statusMap: { [key: string]: string } = {
      available: '이용 가능',
      busy: '사용 중',
      maintenance: '점검 중',
    };
    return statusMap[availability] || availability;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="w-[90%] max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-blue-600 font-semibold text-lg">커넥트원 공간 및 디바이스</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">커넥트원의 공간 및 디바이스를 확인하세요</h2>
          </div>
          <div className="flex gap-2">
            <button
              className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors shadow-md"
              aria-label="이전 항목"
            >
              <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center"></i>
            </button>
            <button
              className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors shadow-md"
              aria-label="다음 항목"
            >
              <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room: Room) => (
            <Link key={room['id']} href={`/rooms/${room['id']}`} className="group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:scale-[1.02]">
                <div className="relative">
                  <img
                    src={room['image']}
                    alt={room['name']}
                    className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* 호버 시 오버레이 효과 */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>

                  {/* 타입 뱃지 */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                      <i className={`${getTypeIcon(room['type'])} mr-1 w-3 h-3 flex items-center justify-center`}></i>
                      {room['type'] === 'space' ? '공간' : '디바이스'}
                    </span>
                  </div>

                  {/* 가용성 뱃지 */}
                  {room['availability'] && (
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityStyle(room['availability'])}`}>
                        {getAvailabilityText(room['availability'])}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 leading-tight group-hover:text-blue-600 transition-colors flex-1">
                      {room['name']}
                    </h3>
                    <div className="ml-2 text-right flex-shrink-0">
                      <div className="text-sm font-bold text-blue-600">{room['price']}</div>
                      <div className="text-xs text-gray-500">{room['type'] === 'space' ? '/ 시간' : '/ 일'}</div>
                    </div>
                  </div>

                  {/* 카테고리 및 수용인원 */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <i className="ri-price-tag-3-line mr-1 w-4 h-4 flex items-center justify-center"></i>
                      {room['category']}
                    </div>
                    {room['capacity'] && (
                      <div className="flex items-center">
                        <i className="ri-group-line mr-1 w-4 h-4 flex items-center justify-center"></i>
                        {room['capacity']}명
                      </div>
                    )}
                  </div>

                  {/* 주요 기능 */}
                  {room['features'] && room['features'].length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {room['features'].slice(0, 2).map((feature: string, index: number) => (
                          <span key={index} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {feature}
                          </span>
                        ))}
                        {room['features'].length > 2 && (
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                            +{room['features'].length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 추가 정보가 있다면 표시 */}
                  {room['description'] && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{room['description']}</p>}
                </div>

                {/* 하단 액션 영역 */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 font-medium group-hover:underline">
                      {room['availability'] === 'available' || room['availability'] === '이용 가능' ? '예약하기' : '자세히 보기'}
                    </span>
                    <i className="ri-arrow-right-line text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 더 많은 항목 보기 버튼 */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rooms"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-200"
            >
              <span>모든 공간 및 디바이스 보기</span>
              <i className="ri-arrow-right-line ml-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
