'use client';

import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-16">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">문의하기</h1>
        <ContactForm />
      </div>
    </div>
  );
}
