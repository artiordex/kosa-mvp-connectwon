import Link from 'next/link';

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-lg">ConnectOne</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 mt-2">
            커넥트원(ConnectOne)은 대한민국의
            <br />
            미래를 이끌어갈 ICT 핵심인재를 양성합니다!
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="relative mb-6">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20business%20people%20in%20modern%20meeting%20room%20discussing%20equipment%20and%20technology%2C%20collaborative%20workspace%20atmosphere%2C%20professional%20lighting%2C%20contemporary%20office%20environment&width=400&height=250&seq=equipment1&orientation=landscape"
                alt="장비예약"
                className="w-full h-48 object-cover object-top rounded-lg"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">장비예약</h3>
              <Link href="/rooms" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                자세히보기
                <i className="ri-arrow-right-line ml-1 w-4 h-4 flex items-center justify-center"></i>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="relative mb-6">
              <img
                src="https://readdy.ai/api/search-image?query=Modern%20conference%20room%20with%20large%20windows%2C%20professional%20meeting%20space%2C%20clean%20design%2C%20contemporary%20office%20interior%2C%20business%20meeting%20environment%2C%20natural%20lighting&width=400&height=250&seq=space1&orientation=landscape"
                alt="공간예약"
                className="w-full h-48 object-cover object-top rounded-lg"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">공간예약</h3>
              <Link href="/rooms" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                자세히보기
                <i className="ri-arrow-right-line ml-1 w-4 h-4 flex items-center justify-center"></i>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="relative mb-6">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20training%20session%20with%20instructor%20teaching%20programming%20and%20technology%20skills%2C%20educational%20environment%2C%20students%20learning%20coding%2C%20modern%20classroom%20setting&width=400&height=250&seq=program1&orientation=landscape"
                alt="프로그램 신청"
                className="w-full h-48 object-cover object-top rounded-lg"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">프로그램 신청</h3>
              <Link href="/programs" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                자세히보기
                <i className="ri-arrow-right-line ml-1 w-4 h-4 flex items-center justify-center"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
