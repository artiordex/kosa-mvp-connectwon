export default function AdminHome() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">관리자 대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">총 사용자</h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">월별 주문</h3>
          <p className="text-3xl font-bold text-green-600">856</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">수익</h3>
          <p className="text-3xl font-bold text-purple-600">₩12,345,678</p>
        </div>
      </div>
    </div>
  )
}
