'use client';

import { useEffect, useState } from 'react';

// 환경변수
const serviceId = process.env['NEXT_PUBLIC_EMAILJS_SERVICE_ID'];
const templateId = process.env['NEXT_PUBLIC_EMAILJS_TEMPLATE_ID'];
const publicKey = process.env['NEXT_PUBLIC_EMAILJS_PUBLIC_KEY'];

export const useEmailJS = () => {
  const [emailjsLoaded, setEmailjsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // EmailJS 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      if (publicKey) {
        (window as any).emailjs.init(publicKey);
        setEmailjsLoaded(true);
      } else {
        setErrorMessage('EmailJS 설정이 필요합니다. 환경변수를 확인해주세요.');
      }
    };
    script.onerror = () => {
      setErrorMessage('EmailJS 라이브러리를 로드할 수 없습니다.');
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // 메일 전송 함수
  const sendEmail = async (params: Record<string, any>) => {
    if (!emailjsLoaded || !serviceId || !templateId) {
      throw new Error('EmailJS가 준비되지 않았습니다.');
    }

    return (window as any).emailjs.send(serviceId, templateId, params);
  };

  return { emailjsLoaded, errorMessage, sendEmail };
};
