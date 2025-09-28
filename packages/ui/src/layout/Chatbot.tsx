/**
 * Description : Chatbot.tsx - 📌 ConnectWon UI 애플리케이션 챗봇 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-25
 */
import { useState } from 'react';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // 유저 메시지 추가
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);

    // 간단한 봇 응답 (추후 API 연동 가능)
    const botMessage: Message = { role: 'bot', content: `응답: ${input}` };
    setMessages(prev => [...prev, userMessage, botMessage]);

    setInput('');
  };

  return (
    <div className="flex flex-col w-full max-w-md h-[500px] border rounded-lg shadow bg-white">
      {/* 메시지 표시 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md max-w-[80%] ${
              msg.role === 'user' ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-black self-start mr-auto'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="flex items-center border-t p-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border rounded px-2 py-1 mr-2 focus:outline-none"
          placeholder="메시지를 입력하세요..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
          전송
        </button>
      </div>
    </div>
  );
}
