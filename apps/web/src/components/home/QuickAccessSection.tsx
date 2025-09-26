
import Link from 'next/link';

export default function QuickAccessSection() {
  const quickItems = [
    {
      icon: "ri-graduation-cap-line",
      title: "커넥트원 프로그램",
      description: "창업·개발·네트워킹까지 다양한\nICT 특화 프로그램을 제공합니다.",
      link: "/programs",
      bgColor: "bg-blue-50",
      iconColor: "bg-blue-600"
    },
    {
      icon: "ri-computer-line",
      title: "커넥트원 디바이스",
      description: "다양한 최신 ICT 장비를\n무료로 대여·이용해보세요.",
      link: "/rooms",
      bgColor: "bg-green-50",
      iconColor: "bg-green-600"
    },
    {
      icon: "ri-building-line",
      title: "커넥트원 공간안내",
      description: "다양한 ICT 공간을 용도에 맞게\n자유롭게 이용해보세요.",
      link: "/centers",
      bgColor: "bg-purple-50",
      iconColor: "bg-purple-600"
    },
    {
      icon: "ri-information-line",
      title: "커넥트원 이용가이드",
      description: "커넥트원 이용에 필요한\n절차와 유의사항을 안내드립니다.",
      link: "/programs",
      bgColor: "bg-orange-50",
      iconColor: "bg-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {quickItems.map((item, index) => (
            <Link key={index} href={item.link} className="group">
              <div className={`${item.bgColor} p-8 hover:shadow-lg transition-all duration-300 cursor-pointer h-full min-h-[280px] flex flex-col justify-center items-center text-center`}>
                <div className={`w-16 h-16 ${item.iconColor} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <i className={`${item.icon} text-2xl text-white w-8 h-8 flex items-center justify-center`}></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
