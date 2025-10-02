
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CenterDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const images = [
    "https://readdy.ai/api/search-image?query=modern%20office%20interior%20with%20open%20workspace%2C%20contemporary%20business%20environment%2C%20professional%20coworking%20space%20with%20desks%20and%20meeting%20areas%2C%20clean%20modern%20design%20with%20natural%20lighting&width=800&height=500&seq=gangnam-interior-1&orientation=landscape",
    "https://readdy.ai/api/search-image?query=conference%20room%20with%20modern%20furniture%2C%20glass%20walls%20meeting%20space%2C%20professional%20business%20meeting%20room%2C%20contemporary%20office%20interior%20with%20presentation%20equipment&width=800&height=500&seq=gangnam-interior-2&orientation=landscape",
    "https://readdy.ai/api/search-image?query=office%20lounge%20area%20with%20comfortable%20seating%2C%20modern%20workplace%20relaxation%20space%2C%20contemporary%20office%20break%20area%20with%20stylish%20furniture%20and%20natural%20light&width=800&height=500&seq=gangnam-interior-3&orientation=landscape",
    "https://readdy.ai/api/search-image?query=private%20office%20space%20with%20desk%20and%20chair%2C%20individual%20workspace%20in%20modern%20building%2C%20professional%20single%20office%20room%20with%20clean%20design&width=800&height=500&seq=gangnam-interior-4&orientation=landscape",
    "https://readdy.ai/api/search-image?query=modern%20office%20kitchen%20and%20dining%20area%2C%20workplace%20cafeteria%20with%20contemporary%20design%2C%20office%20break%20room%20with%20modern%20appliances%20and%20seating&width=800&height=500&seq=gangnam-interior-5&orientation=landscape"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://readdy.ai/api/form/d39urt6kjeaarh5ll250', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData as any),
      });

      if (response.ok) {
        setSubmitStatus('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.');
        form.reset();
      } else {
        setSubmitStatus('전송 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      setSubmitStatus('전송 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* 헤더 */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage: 'url("https://readdy.ai/api/search-image?query=modern%20office%20building%20exterior%20in%20Gangnam%20Seoul%20at%20sunset%2C%20glass%20facade%20with%20warm%20lighting%2C%20urban%20business%20district%20skyline%2C%20professional%20corporate%20environment&width=1920&height=600&seq=gangnam-hero&orientation=landscape")',
          minHeight: '384px'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-orange-600/20 rounded-full text-orange-200 text-sm font-medium backdrop-blur-sm border border-orange-400/30">
              GANGNAM CENTER
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6">강남센터</h1>
          <p className="text-xl text-gray-200">서울 강남구 테헤란로 217</p>
        </div>
      </section>

      {/* 콘텐츠 */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* 네비게이션 */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-orange-600">홈</Link>
              <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
              <Link href="/centers" className="hover:text-orange-600">공간소개</Link>
              <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
              <span className="text-orange-600 font-medium">강남센터</span>
            </nav>
          </div>

          {/* 센터 탭 */}
          <div className="mb-12">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 max-w-md">
              <Link href="/centers/gangnam" className="px-6 py-2 bg-white rounded-md shadow-sm text-orange-600 font-medium">
                강남센터
              </Link>
              <Link href="/centers/mapo" className="px-6 py-2 text-gray-600 hover:text-gray-900">
                마포센터
              </Link>
              <Link href="/centers/gwangmyeong" className="px-6 py-2 text-gray-600 hover:text-gray-900">
                광명센터
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* 이미지 갤러리 */}
            <div>
              <div className="relative mb-4">
                <img
                  src={images[currentImageIndex]}
                  alt="강남센터"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center"></i>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center"></i>
                </button>
              </div>

              <div className="flex space-x-2 justify-center">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-orange-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 센터 정보 */}
            <div>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">센터규모</h3>
                  <p className="text-gray-600">2,685㎡</p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">업무공간</h3>
                  <p className="text-gray-600">독립공간 22실, 오픈스페이스 65석, 회의실 11실</p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">편의시설</h3>
                  <p className="text-gray-600">라운지, 다목적홀, 영상 스튜디오, 공용 OA공간, 폰부스, 테라스</p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">센터구성</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>&lt;2층&gt; 독립공간 1실, 오픈스페이스 65석, 회의실 2실</p>
                    <p>&lt;3층&gt; 독립공간 9실, 회의실 2실</p>
                    <p>&lt;4층&gt; 다목적홀, 회의실 3실, 영상 스튜디오</p>
                    <p>&lt;5층&gt; 독립공간 6실, 회의실 2실</p>
                    <p>&lt;6층&gt; 독립공간 5실, 회의실 2실</p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">운영시간</h3>
                  <p className="text-gray-600">연중무휴</p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">문의처</h3>
                  <p className="text-gray-600">02-2192-5297 / <a href="mailto:startup@connectone.or.kr" className="text-orange-600 hover:text-orange-700">startup@connectone.or.kr</a></p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">주소</h3>
                  <p className="text-gray-600">서울특별시 강남구 테헤란로 217 커넥트원 2~6F</p>
                </div>
              </div>
            </div>
          </div>

          {/* 지도 */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">오시는 길</h3>
            <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.562!2d127.027!3d37.502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca34a215e1845%3A0x2dd2f8cd496c4ec1!2z7ISc7Jq47Yq567OE67OE7IucIOqwleq1rOq1rCDthYztl6TrnoDroZwgMjE3!5e0!3m2!1sko!2skr!4v1630655507166!5m2!1sko!2skr"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                className="rounded-2xl"
              ></iframe>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-orange-50 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">강남센터 이용 문의</h3>
            <p className="text-gray-600 mb-6">
              공간 예약 및 프로그램 참여에 관한 문의사항이 있으시면 언제든 연락해 주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap">
                공간 예약하기
              </button>
              <button className="px-8 py-3 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-medium rounded-lg transition-colors whitespace-nowrap">
                전화 문의하기
              </button>
            </div>
          </div>

          {/* 피드백 문의 폼 */}
          <div className="mt-16 bg-white border border-gray-200 rounded-3xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">피드백 및 문의사항</h3>
              <p className="text-gray-600">
                강남센터 이용에 대한 피드백이나 개선사항이 있으시면 언제든 말씀해 주세요.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              data-readdy-form
              id="gangnam-center-feedback"
              className="max-w-2xl mx-auto space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    placeholder="성함을 입력해 주세요"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    placeholder="답변 받으실 이메일을 입력해 주세요"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  연락처
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  placeholder="연락처를 입력해 주세요 (선택사항)"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  소속/회사명
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  placeholder="소속이나 회사명을 입력해 주세요 (선택사항)"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  문의 유형 *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                >
                  <option value="">문의 유형을 선택해 주세요</option>
                  <option value="시설 피드백">시설 관련 피드백</option>
                  <option value="서비스 피드백">서비스 관련 피드백</option>
                  <option value="개선 제안">개선 제안사항</option>
                  <option value="기타 문의">기타 문의사항</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  문의 내용 *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm resize-none"
                  placeholder="피드백이나 문의사항을 자세히 작성해 주세요 (최대 500자)"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">최대 500자까지 입력 가능합니다.</p>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  required
                  className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="privacy" className="ml-2 text-sm text-gray-600">
                  개인정보 수집 및 이용에 동의합니다. <span className="text-red-500">*</span>
                </label>
              </div>

              {submitStatus && (
                <div className={`p-4 rounded-lg text-sm ${
                  submitStatus.includes('성공')
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {submitStatus}
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors whitespace-nowrap"
                >
                  {isSubmitting ? '전송 중...' : '문의하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
