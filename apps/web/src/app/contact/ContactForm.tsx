'use client';

import { useState } from 'react';
import { useEmailJS } from '../../lib/email';

const ContactForm = () => {
  const { emailjsLoaded, errorMessage, sendEmail } = useEmailJS();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendEmail({
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_name: 'ConnectWon 관리자',
      });
      setStatus('✅ 메일 전송 성공');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('❌ 메일 전송 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {status && <p className="text-sm">{status}</p>}

      <input type="text" name="name" placeholder="이름" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
      <input type="email" name="email" placeholder="이메일" value={form.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
      <textarea name="message" placeholder="메시지" value={form.message} onChange={handleChange} className="w-full border px-3 py-2 rounded" />

      <button type="submit" disabled={!emailjsLoaded} className="w-full bg-blue-600 text-white py-2 rounded">
        {emailjsLoaded ? '메일 보내기' : '로딩 중...'}
      </button>
    </form>
  );
};

export default ContactForm;
