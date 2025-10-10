'use client';

import emailjs from 'emailjs-com';

export default function ContactButton() {
  const sendMail = () => {
    emailjs
      .send(
        process.env['NEXT_PUBLIC_EMAILJS_SERVICE_ID'] || '',
        process.env['NEXT_PUBLIC_EMAILJS_TEMPLATE_ID'] || '',
        {
          to_name: '고객지원팀',
          from_name: '테스트 사용자',
          message: '문의하기 버튼을 눌렀습니다.',
        },
        process.env['NEXT_PUBLIC_EMAILJS_PUBLIC_KEY'] || '',
      )
      .then(() => {
        alert('문의 메일이 발송되었습니다!');
      })
      .catch(err => {
        console.error('메일 발송 실패:', err);
        alert('메일 발송에 실패했습니다.');
      });
  };

  return (
    <button
      onClick={sendMail}
      className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all"
    >
      문의하기
    </button>
  );
}
