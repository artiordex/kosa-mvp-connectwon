
'use client';

import { useState, useEffect } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export default function TermsModal({ isOpen, onClose, type }: TermsModalProps) {
  const [activeTab, setActiveTab] = useState(type);

  useEffect(() => {
    setActiveTab(type);
  }, [type]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const termsContent = {
    terms: {
      title: '서비스 이용약관',
      content: `
        <h3 class="text-lg font-semibold mb-4">제1조 (목적)</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">
          이 약관은 커넥트원(이하 "회사")이 제공하는 모든 서비스의 이용과 관련하여 회사와 이용자간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
        </p>

        <h3 class="text-lg font-semibold mb-4 mt-6">제2조 (정의)</h3>
        <p class="mb-2 text-gray-700 leading-relaxed">본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
        <ul class="list-disc list-inside mb-4 text-gray-700 space-y-2">
          <li>"서비스"라 함은 회사가 제공하는 모든 프로그램, 공간 및 디바이스 대여, 예약 서비스를 의미합니다.</li>
          <li>"이용자"라 함은 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
          <li>"회원"이라 함은 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 서비스를 지속적으로 이용할 수 있는 자를 말합니다.</li>
        </ul>

        <h3 class="text-lg font-semibold mb-4 mt-6">제3조 (약관의 효력 및 변경)</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">
          본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다. 회사는 합리적인 사유가 발생될 경우에는 본 약관을 변경할 수 있으며, 약관이 변경되는 경우 변경된 약관의 적용일자 및 변경사유를 명시하여 현행약관과 함께 서비스의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.
        </p>

        <h3 class="text-lg font-semibold mb-4 mt-6">제4조 (서비스의 제공)</h3>
        <p class="mb-2 text-gray-700 leading-relaxed">회사가 제공하는 서비스는 다음과 같습니다:</p>
        <ul class="list-disc list-inside mb-4 text-gray-700 space-y-2">
          <li>각종 교육 프로그램 제공</li>
          <li>공간 및 디바이스 대여 서비스</li>
          <li>온라인 예약 및 결제 서비스</li>
          <li>기타 회사가 정하는 서비스</li>
        </ul>

        <h3 class="text-lg font-semibold mb-4 mt-6">제5조 (서비스 이용료)</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">
          회사가 제공하는 서비스는 기본적으로 유료입니다. 서비스 이용료, 결제방법, 환불조건 등은 각 서비스의 안내사항을 따릅니다.
        </p>

        <h3 class="text-lg font-semibold mb-4 mt-6">제6조 (환불정책)</h3>
        <ul class="list-disc list-inside mb-4 text-gray-700 space-y-2">
          <li>프로그램 시작 7일 전 취소: 100% 환불</li>
          <li>프로그램 시작 3-6일 전 취소: 50% 환불</li>
          <li>프로그램 시작 1-2일 전 취소: 환불 불가</li>
          <li>당일 취소 및 노쇼: 환불 불가</li>
        </ul>

        <h3 class="text-lg font-semibold mb-4 mt-6">제7조 (이용자의 의무)</h3>
        <p class="mb-2 text-gray-700 leading-relaxed">이용자는 다음 행위를 하여서는 안됩니다:</p>
        <ul class="list-disc list-inside mb-4 text-gray-700 space-y-2">
          <li>신청 또는 변경시 허위내용의 등록</li>
          <li>타인의 정보도용</li>
          <li>회사가 게시한 정보의 변경</li>
          <li>회사 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
          <li>회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
          <li>외설 또는 폭력적인 메시지, 화상, 음성 기타 공서양속에 반하는 정보를 회사에 공개 또는 게시하는 행위</li>
        </ul>

        <h3 class="text-lg font-semibold mb-4 mt-6">제8조 (서비스 이용제한)</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">
          회사는 이용자가 본 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우, 경고, 일시정지, 영구이용정지 등으로 서비스 이용을 단계적으로 제한할 수 있습니다.
        </p>

        <h3 class="text-lg font-semibold mb-4 mt-6">제9조 (면책조항)</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">
          회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
        </p>

        <h3 class="text-lg font-semibold mb-4 mt-6">제10조 (준거법 및 관할법원)</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">
          본 약관의 해석 및 회사와 이용자 간의 분쟁에 대하여는 대한민국의 법을 적용하며, 이용자와 회사 간에 발생한 분쟁에 관한 소송은 민사소송법상의 관할법원에 제기합니다.
        </p>

        <div class="mt-8 p-4 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600">
            <strong>시행일:</strong> 2024년 12월 18일<br>
            본 약관은 2024년 12월 18일부터 시행됩니다.
          </p>
        </div>
      `
    },
    privacy: {
      title: '개인정보처리방침',
      content: `
        <h3 class="text-lg font-semibold mb-4">1. 개인정보의 처리목적</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">
          커넥트원(이하 "회사")은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
        </p>
        <ul class="list-disc list-inside mb-4 text-gray-700 space-y-2">
          <li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
          <li>회원 가입의사 확인, 연령확인, 불량회원의 부정이용 방지와 비인가 사용방지</li>
          <li>고객상담 및 불만처리, 공지사항 전달</li>
          <li>신규 서비스 개발 및 마케팅·광고에의 활용</li>
        </ul>

        <h3 class="text-lg font-semibold mb-4 mt-6">2. 개인정보의 처리 및 보유기간</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">
          회사는 정보주체로부터 개인정보를 수집할 때 동의받은 개인정보 보유·이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
        </p>
        <ul class="list-disc list-inside mb-4 text-gray-700 space-y-2">
          <li>회원정보: 회원 탈퇴 시까지 (단, 관계법령에 의해 보존할 필요성이 있는 경우 해당 기간)</li>
          <li>예약 및 결제정보: 서비스 제공 완료 후 5년</li>
          <li>고객상담 기록: 상담 완료 후 3년</li>
        </ul>

        <h3 class="text-lg font-semibold mb-4 mt-6">3. 처리하는 개인정보의 항목</h3>
        <p class="mb-2 text-gray-700 leading-relaxed">회사는 다음의 개인정보 항목을 처리하고 있습니다:</p>
        
        <div class="mb-4">
          <h4 class="font-medium text-gray-900 mb-2">가. 회원가입</h4>
          <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li>필수항목: 이름, 이메일주소, 휴대전화번호</li>
            <li>선택항목: 생년월일, 성별, 관심분야</li>
          </ul>
        </div>

        <div class="mb-4">
          <h4 class="font-medium text-gray-900 mb-2">나. 서비스 이용</h4>
          <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li>예약정보: 예약일시, 참여인원, 특별요청사항</li>
            <li>결제정보: 결제수단, 결제금액, 거래내역</li>
          </ul>
        </div>

        <div class="mb-4">
          <h4 class="font-medium text-gray-900 mb-2">다. 자동 수집되는 정보</h4>
          <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li>IP주소, 쿠키, 방문일시, 서비스 이용기록, 불량 이용기록</li>
          </ul>
        </div>

        <h3 class="text-lg font-semibold mb-4 mt-6">4. 개인정보의 제3자 제공</h3>
        <p class="mb-4 text-gray-700 leading-relaxed">
          회사는 정보주체의 개인정보를 개인정보의 처리목적에서 고지한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
        </p>

        <h3 class="text-lg font-semibold mb-4 mt-6">5. 개인정보처리의 위탁</h3>
        <p class="mb-2 text-gray-700 leading-relaxed">회사는 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:</p>
        <ul class="list-disc list-inside mb-4 text-gray-700 space-y-2">
          <li>결제처리업체: 결제 및 정산 업무</li>
          <li>문자발송업체: 예약확인 및 안내문자 발송</li>
          <li>이메일발송업체: 공지사항 및 마케팅 이메일 발송</li>
        </ul>

        <h3 class="text-lg font-semibold mb-4 mt-6">6. 정보주체의 권리·의무 및 행사방법</h3>
        <p class="mb-2 text-gray-700 leading-relaxed">정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:</p>
        <ul class="list-disc list-inside mb-4 text-gray-700 space-y-2">
          <li>개인정보 처리현황 통지요구</li>
          <li>개인정보 열람요구</li>
          <li>개인정보 정정·삭제요구</li>
          <li>개인정보 처리정지요구</li>
        </ul>

        <h3 class="text-lg font-semibold mb-4 mt-6">7. 개인정보의 안전성 확보조치</h3>
        <p class="mb-2 text-gray-700 leading-relaxed">회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
        <ul class="list-disc list-inside mb-4 text-gray-700 space-y-2">
          <li>개인정보 취급직원의 최소화 및 교육</li>
          <li>개인정보에 대한 접근 제한</li>
          <li>개인정보를 안전하게 저장·전송할 수 있는 암호화 기술의 적용</li>
          <li>해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위한 보안프로그램 설치</li>
        </ul>

        <h3 class="text-lg font-semibold mb-4 mt-6">8. 개인정보보호책임자</h3>
        <div class="mb-4 text-gray-700">
          <p class="mb-2">회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다:</p>
          <div class="bg-gray-50 p-4 rounded-lg mt-4">
            <p><strong>개인정보보호책임자</strong></p>
            <p>성명: 김개인</p>
            <p>직책: 개인정보보호팀장</p>
            <p>연락처: privacy@connectone.com</p>
            <p>전화번호: 02-1234-5678</p>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4 mt-6">9. 권익침해 구제방법</h3>
        <p class="mb-2 text-gray-700 leading-relaxed">정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보보호위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다:</p>
        <ul class="list-disc list-inside mb-4 text-gray-700 space-y-2">
          <li>개인정보보호위원회: privacy.go.kr / 국번없이 182</li>
          <li>개인정보침해신고센터: privacy.kisa.or.kr / 국번없이 118</li>
          <li>대검찰청 사이버범죄수사단: spo.go.kr / 02-3480-3573</li>
          <li>경찰청 사이버테러대응센터: cyberbureau.police.go.kr / 국번없이 182</li>
        </ul>

        <div class="mt-8 p-4 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600">
            <strong>시행일:</strong> 2024년 12월 18일<br>
            본 개인정보처리방침은 2024년 12월 18일부터 시행됩니다.
          </p>
        </div>
      `
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'terms'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              } cursor-pointer whitespace-nowrap`}
            >
              이용약관
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'privacy'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              } cursor-pointer whitespace-nowrap`}
            >
              개인정보처리방침
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <i className="ri-close-line w-6 h-6 flex items-center justify-center text-2xl"></i>
          </button>
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {termsContent[activeTab].title}
          </h2>
          <div 
            className="prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: termsContent[activeTab].content }}
          />
        </div>

        {/* 푸터 */}
        <div className="border-t border-gray-200 p-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
