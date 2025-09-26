
'use client';

import { useState } from 'react';

export default function FamilyContent() {
  const [visibleCreators, setVisibleCreators] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 실제로는 auth 상태에서 가져와야 함
  const [applicationData, setApplicationData] = useState({
    name: '',
    englishName: '',
    email: '',
    phone: '',
    position: '',
    region: '',
    category: '',
    company: '',
    experience: '',
    description: '',
    portfolio: '',
    motivation: ''
  });

  const regions = ['전체', '서울', '경기', '부산', '제주', '충청', '인천', '대전', '광주', '울산'];
  const categories = ['전체', 'AI/로보틱스', '핀테크', '헬스케어', '이커머스', '게임', '교육', '미디어', '기타'];

  const allCreators = [
    {
      id: 1,
      name: '임재성',
      englishName: 'Jae Sung Rim',
      position: '제조',
      role: '서울',
      category: 'AI/로보틱스',
      description: '한 인디톡스 고치',
      achievements: ['전) RS건설 대표', '전) 주식회사 모익스 창업 크루'],
      photo: 'https://readdy.ai/api/search-image?query=professional%20Korean%20male%20entrepreneur%20in%20casual%20black%20hoodie%2C%20confident%20pose%20with%20arms%20crossed%2C%20startup%20founder%20portrait%2C%20modern%20business%20headshot%20with%20clean%20background&width=300&height=400&seq=creator-1&orientation=portrait',
      establishedYear: 2019,
      fundingAmount: '50억원'
    },
    {
      id: 2,
      name: '조항석',
      englishName: 'HS Cho',
      position: '리더십',
      role: '경기',
      category: 'AI/로보틱스',
      description: '한 슈퍼드루이딩 대표',
      achievements: ['2022 언더독스 우수 파트너코치', '아삼나눈멘인 슈스트넘서 기업가정신 강사'],
      photo: 'https://readdy.ai/api/search-image?query=smiling%20Korean%20male%20business%20leader%20in%20light%20gray%20hoodie%2C%20friendly%20approachable%20startup%20coach%20portrait%2C%20professional%20headshot%20with%20warm%20expression&width=300&height=400&seq=creator-2&orientation=portrait',
      establishedYear: 2020,
      fundingAmount: '80억원'
    },
    {
      id: 3,
      name: '이지은',
      englishName: 'JE Yi',
      position: '기획',
      role: '제주',
      category: '핀테크',
      description: '한 영농조합법인 제주더 스마트롱뿌시즘 연구',
      achievements: ['2022 언더독스 우수 파트너코치'],
      photo: 'https://readdy.ai/api/search-image?query=professional%20Korean%20female%20entrepreneur%20with%20shoulder%20length%20hair%2C%20confident%20business%20leader%20portrait%2C%20modern%20startup%20founder%20headshot%20against%20city%20background&width=300&height=400&seq=creator-3&orientation=portrait',
      establishedYear: 2018,
      fundingAmount: '120억원'
    },
    {
      id: 4,
      name: '송병근',
      englishName: 'BG Song',
      position: '소상공인',
      role: '경기',
      category: '이커머스',
      description: '한 (주)크리룩체이 대표',
      achievements: ['2022 언더독스 우수 파트너코치'],
      photo: 'https://readdy.ai/api/search-image?query=Korean%20male%20small%20business%20owner%20with%20arms%20crossed%2C%20confident%20entrepreneur%20in%20casual%20black%20clothing%2C%20professional%20startup%20portrait&width=300&height=400&seq=creator-4&orientation=portrait',
      establishedYear: 2017,
      fundingAmount: '200억원'
    },
    {
      id: 5,
      name: '안동국',
      englishName: 'DG Ahn',
      position: 'BM',
      role: '충청',
      category: '교육',
      description: '한 디지털혁신 CEO',
      achievements: ['2022 언더독스 우수 파트너코치', 'BM & 사업계획서 & IR 특화코칭', '3개 아이템 연쇄창업'],
      photo: 'https://readdy.ai/api/search-image?query=smiling%20Korean%20male%20CEO%20in%20light%20colored%20hoodie%2C%20friendly%20business%20mentor%20portrait%2C%20experienced%20entrepreneur%20headshot%20with%20warm%20smile&width=300&height=400&seq=creator-5&orientation=portrait',
      establishedYear: 2016,
      fundingAmount: '90억원'
    },
    {
      id: 6,
      name: '강송희',
      englishName: 'Allisen Kang',
      position: '브랜딩',
      role: '서울',
      category: '미디어',
      description: '한 뉴프레임인크레스 대표',
      achievements: ['전) 언더독스 마케팅 리드', '2019-2020년 와디즈메이커'],
      photo: 'https://readdy.ai/api/search-image?query=professional%20Korean%20female%20business%20leader%20with%20long%20hair%2C%20confident%20marketing%20expert%20portrait%2C%20modern%20branding%20specialist%20headshot%20with%20professional%20smile&width=300&height=400&seq=creator-6&orientation=portrait',
      establishedYear: 2019,
      fundingAmount: '150억원'
    },
    {
      id: 7,
      name: '김태현',
      englishName: 'TH Kim',
      position: '개발',
      role: '서울',
      category: '게임',
      description: '한 게임스튜디오 CTO',
      achievements: ['전) 네이버 시니어 개발자', '모바일 게임 개발 10년 경력'],
      photo: 'https://readdy.ai/api/search-image?query=Korean%20male%20tech%20developer%20in%20casual%20shirt%2C%20focused%20game%20developer%20portrait%2C%20professional%20CTO%20headshot%20with%20technical%20background&width=300&height=400&seq=creator-7&orientation=portrait',
      establishedYear: 2020,
      fundingAmount: '300억원'
    },
    {
      id: 8,
      name: '박민주',
      englishName: 'MJ Park',
      position: '디자인',
      role: '경기',
      category: '미디어',
      description: '한 크리에이티브 스튜디오 대표',
      achievements: ['UI/UX 디자인 전문가', '브랜드 아이덴티티 디자이너'],
      photo: 'https://readdy.ai/api/search-image?query=creative%20Korean%20female%20designer%20with%20stylish%20appearance%2C%20artistic%20professional%20portrait%2C%20modern%20creative%20director%20headshot%20with%20design%20elements&width=300&height=400&seq=creator-8&orientation=portrait',
      establishedYear: 2018,
      fundingAmount: '100억원'
    },
    {
      id: 9,
      name: '정우성',
      englishName: 'WS Jung',
      position: '마케팅',
      role: '부산',
      category: '이커머스',
      description: '한 디지털마케팅 대표',
      achievements: ['퍼포먼스 마케팅 전문가', '이커머스 성장 컨설턴트'],
      photo: 'https://readdy.ai/api/search-image?query=professional%20Korean%20male%20marketing%20expert%20in%20business%20casual%2C%20confident%20digital%20marketer%20portrait%2C%20modern%20consultant%20headshot&width=300&height=400&seq=creator-9&orientation=portrait',
      establishedYear: 2019,
      fundingAmount: '60억원'
    },
    {
      id: 10,
      name: '한소영',
      englishName: 'SY Han',
      position: '콘텐츠',
      role: '서울',
      category: '교육',
      description: '한 에듀테크 콘텐츠 디렉터',
      achievements: ['교육 콘텐츠 기획 전문가', '온라인 강의 플랫폼 운영'],
      photo: 'https://readdy.ai/api/search-image?query=professional%20Korean%20female%20content%20director%20with%20friendly%20smile%2C%20educational%20technology%20expert%20portrait%2C%20modern%20content%20creator%20headshot&width=300&height=400&seq=creator-10&orientation=portrait',
      establishedYear: 2017,
      fundingAmount: '40억원'
    },
    {
      id: 11,
      name: '오준석',
      englishName: 'JS Oh',
      position: '투자',
      role: '경기',
      category: '핀테크',
      description: '한 핀테크 투자 파트너',
      achievements: ['스타트업 투자 전문가', '핀테크 분야 멘터'],
      photo: 'https://readdy.ai/api/search-image?query=sophisticated%20Korean%20male%20investment%20partner%20in%20formal%20attire%2C%20professional%20fintech%20investor%20portrait%2C%20experienced%20venture%20capitalist%20headshot&width=300&height=400&seq=creator-11&orientation=portrait',
      establishedYear: 2016,
      fundingAmount: '80억원'
    },
    {
      id: 12,
      name: '최유진',
      englishName: 'YJ Choi',
      position: '운영',
      role: '인천',
      category: '헬스케어',
      description: '한 헬스테크 운영 디렉터',
      achievements: ['의료 IT 솔루션 전문가', '헬스케어 스타트업 운영 경험'],
      photo: 'https://readdy.ai/api/search-image?query=professional%20Korean%20female%20healthcare%20director%20with%20confident%20expression%2C%20medical%20technology%20expert%20portrait%2C%20modern%20healthcare%20professional%20headshot&width=300&height=400&seq=creator-12&orientation=portrait',
      establishedYear: 2020,
      fundingAmount: '180억원'
    },
    {
      id: 13,
      name: '이동훈',
      englishName: 'DH Lee',
      position: '기술',
      role: '대전',
      category: 'AI/로보틱스',
      description: '한 AI 연구소 기술이사',
      achievements: ['AI 알고리즘 개발 전문가', '로보틱스 기술 연구원'],
      photo: 'https://readdy.ai/api/search-image?query=focused%20Korean%20male%20AI%20researcher%20in%20casual%20tech%20wear%2C%20intelligent%20technology%20expert%20portrait%2C%20modern%20AI%20developer%20headshot&width=300&height=400&seq=creator-13&orientation=portrait',
      establishedYear: 2018,
      fundingAmount: '110억원'
    },
    {
      id: 14,
      name: '김하늘',
      englishName: 'HN Kim',
      position: '전략',
      role: '광주',
      category: '기타',
      description: '한 그린테크 전략기획자',
      achievements: ['지속가능 경영 전문가', '환경 기술 사업 개발'],
      photo: 'https://readdy.ai/api/search-image?query=professional%20Korean%20female%20strategy%20planner%20with%20eco-friendly%20background%2C%20sustainable%20business%20expert%20portrait%2C%20green%20technology%20strategist%20headshot&width=300&height=400&seq=creator-14&orientation=portrait',
      establishedYear: 2019,
      fundingAmount: '95억원'
    },
    {
      id: 15,
      name: '서민호',
      englishName: 'MH Seo',
      position: '비즈니스',
      role: '울산',
      category: '게임',
      description: '한 게임 퍼블리싱 BD',
      achievements: ['게임 사업 개발 전문가', '글로벌 게임 퍼블리싱 경험'],
      photo: 'https://readdy.ai/api/search-image?query=charismatic%20Korean%20male%20business%20developer%20with%20gaming%20industry%20background%2C%20professional%20game%20publisher%20portrait%2C%20modern%20BD%20specialist%20headshot&width=300&height=400&seq=creator-15&orientation=portrait',
      establishedYear: 2017,
      fundingAmount: '75억원'
    }
  ];

  const filteredCreators = allCreators
    .filter(creator => {
      const matchesSearch =
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === '전체' || creator.role === selectedRegion;
      const matchesCategory = selectedCategory === '전체' || creator.category === selectedCategory;
      return matchesSearch && matchesRegion && matchesCategory;
    });

  const visibleCreatorsData = filteredCreators.slice(0, visibleCreators);

  const loadMore = () => {
    setVisibleCreators(prev => prev + 12);
  };

  const handleSearch = () => {
    // 검색 실행 (이미 실시간으로 필터링되고 있음)
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      Object.entries(applicationData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('https://readdy.ai/api/form/submit/FTMQNKZA5GR0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
      });

      if (response.ok) {
        alert('크리에이터 신청이 완료되었습니다!');
        setIsApplicationModalOpen(false);
        setApplicationData({
          name: '',
          englishName: '',
          email: '',
          phone: '',
          position: '',
          region: '',
          category: '',
          company: '',
          experience: '',
          description: '',
          portfolio: '',
          motivation: ''
        });
      } else {
        alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplicationClick = () => {
    if (!isLoggedIn) {
      alert('크리에이터 신청은 로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?');
      window.location.href = '/login';
      return;
    }
    setIsApplicationModalOpen(true);
  };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* 상단 섹션 - 크리에이터 신청하기 버튼 수정 */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">커넥트원 크리에이터</h2>
              <p className="text-lg text-gray-600">
                다양한 분야의 전문가들과 함께 성장하세요
              </p>
            </div>
            <button
              onClick={handleApplicationClick}
              className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors font-semibold flex items-center space-x-2 whitespace-nowrap relative"
            >
              <i className="ri-user-add-line w-5 h-5 flex items-center justify-center"></i>
              <span>크리에이터 신청하기</span>
              {!isLoggedIn && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  로그인 필요
                </span>
              )}
            </button>
          </div>

          {/* 검색 및 필터 */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="전체">활동지역</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm pr-8"
                >
                  <option value="전체">크리에이터 분야</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center"></i>
                <input
                  type="text"
                  placeholder="크리에이터명 또는 전문분야 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
              </div>
              
              <div>
                <button
                  onClick={handleSearch}
                  className="w-full px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap"
                >
                  검색
                </button>
              </div>
            </div>
          </div>

          {/* 결과 정보 */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-900">
                전체 <span className="text-orange-500">{filteredCreators.length}</span>명
              </span>
              {(selectedRegion !== '전체' || selectedCategory !== '전체' || searchTerm) && (
                <div className="flex items-center space-x-2">
                  {selectedRegion !== '전체' && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                      {selectedRegion}
                      <button 
                        onClick={() => setSelectedRegion('전체')}
                        className="ml-2 hover:text-orange-800 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedCategory !== '전체' && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      {selectedCategory}
                      <button 
                        onClick={() => setSelectedCategory('전체')}
                        className="ml-2 hover:text-blue-800 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {searchTerm && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      "{searchTerm}"
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="ml-2 hover:text-gray-800 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 크리에이터 리스트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {visibleCreatorsData.map((creator) => (
              <div key={creator.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <img 
                    src={creator.photo}
                    alt={creator.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{creator.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{creator.englishName}</span>
                      <span className="text-sm text-gray-500">{creator.position}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        creator.role === '서울' ? 'bg-red-100 text-red-600' :
                        creator.role === '경기' ? 'bg-orange-100 text-orange-600' :
                        creator.role === '제주' ? 'bg-blue-100 text-blue-600' :
                        creator.role === '충청' ? 'bg-green-100 text-green-600' :
                        creator.role === '부산' ? 'bg-purple-100 text-purple-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {creator.role}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{creator.description}</p>
                  
                  <div className="space-y-2">
                    {creator.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-orange-500 text-xs mt-1">•</span>
                        <span className="text-xs text-gray-600">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 더보기 버튼 */}
          {visibleCreators < filteredCreators.length && (
            <div className="text-center">
              <button
                onClick={loadMore}
                className="px-8 py-3 bg-white border-2 border-orange-500 text-orange-500 font-medium rounded-lg hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap"
              >
                더보기 ({filteredCreators.length - visibleCreators}명 더)
              </button>
            </div>
          )}

          {/* 검색 결과 없음 */}
          {filteredCreators.length === 0 && (
            <div className="text-center py-16">
              <i className="ri-search-line w-16 h-16 flex items-center justify-center text-gray-400 text-4xl mx-auto mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-600">다른 검색어나 필터를 사용해보세요.</p>
            </div>
          )}
        </div>
      </section>

      {/* 크리에이터 신청하기 모달 */}
      {isApplicationModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">크리에이터 신청하기</h3>
                <button
                  onClick={() => setIsApplicationModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line w-6 h-6 flex items-center justify-center text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleApplicationSubmit} data-readdy-form id="creator-application" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={applicationData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="실명을 입력해주세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      영문명
                    </label>
                    <input
                      type="text"
                      name="englishName"
                      value={applicationData.englishName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="영문명을 입력해주세요"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={applicationData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-5

focus:border-transparent"
                      placeholder="이메일을 입력해주세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={applicationData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="연락처를 입력해주세요"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      전문분야 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={applicationData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="예: 개발, 디자인, 마케팅 등"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      활동지역 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="region"
                      value={applicationData.region}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-8"
                    >
                      <option value="">활동지역 선택</option>
                      {regions.slice(1).map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카테고리 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={applicationData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-8"
                    >
                      <option value="">카테고리 선택</option>
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      소속/회사
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={applicationData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="현재 소속이나 회사명"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    경력사항 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="experience"
                    value={applicationData.experience}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    placeholder="주요 경력과 성과를 간략히 작성해주세요 (최대 500자)"
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {applicationData.experience.length}/500
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    자기소개 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={applicationData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    placeholder="본인의 전문성과 강점을 소개해주세요 (최대 500자)"
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {applicationData.description.length}/500
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    포트폴리오 URL
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={applicationData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    지원동기 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="motivation"
                    value={applicationData.motivation}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    placeholder="크리에이터로 활동하고 싶은 이유를 작성해주세요 (최대 500자)"
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {applicationData.motivation.length}/500
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsApplicationModalOpen(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold whitespace-nowrap"
                  >
                    신청하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
