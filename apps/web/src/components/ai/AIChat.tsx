/**
 * Description : AIChat.tsx - 📌  AI 챗봇 (타입 안정 + 첫 글자 타이핑 누락 수정)
 * Author : Shiwoo Min
 * Date : 2025-10-13
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import rawData from 'data/ai.json';

interface Pattern {
  keywords: string[];
  responses: string[];
}
interface Suggestions {
  [key: string]: string[];
}
interface AIData {
  patterns: Pattern[];
  defaultResponses: string[];
  suggestions?: Suggestions;
}

const aiData: AIData = (rawData as AIData) ?? {
  patterns: [],
  defaultResponses: [],
  suggestions: {},
};

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  intent?: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content:
        '안녕하세요! 커넥트원 AI 도우미입니다.\n회의실 예약, 장비 대여, 프로그램 참여 등을 도와드릴게요.\n무엇을 원하시나요?',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [currentIntent, setCurrentIntent] = useState<string | undefined>(undefined);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAITyping, typingText]);

  // Intent 추론
  const detectIntent = (input: string): string => {
    const lower = input.toLowerCase();

    if (['회의실', '예약', '공간', '룸'].some((k) => lower.includes(k)))
      return 'room_booking';
    if (['프로그램', '참여', '교육', '강의', '클래스'].some((k) => lower.includes(k)))
      return 'program';
    if (['위치', '주소', '찾아가는', '오시는'].some((k) => lower.includes(k)))
      return 'general';
    if (['장비', '렌탈', '대여'].some((k) => lower.includes(k)))
      return 'equipment';

    return 'general';
  };

  // AI 응답 찾기 (타입 안전)
  const findAIResponse = (userInput: string): { text: string; intent: string } => {
    const lowerInput = userInput.toLowerCase();

    for (const pattern of aiData?.patterns ?? []) {
      if (
        Array.isArray(pattern.keywords) &&
        pattern.keywords.some((keyword) => lowerInput.includes(keyword))
      ) {
        const responses = pattern.responses ?? [];
        if (responses.length > 0) {
          const randomText =
            responses[Math.floor(Math.random() * responses.length)] ??
            '죄송합니다, 응답을 찾지 못했어요.';
          return {
            text: randomText,
            intent: detectIntent(userInput) ?? 'general',
          };
        }
      }
    }

    // fallback
    const defaults = aiData?.defaultResponses ?? ['죄송합니다, 이해하지 못했어요.'];
    const randomIndex = Math.floor(Math.random() * defaults.length);
    const fallbackText =
      defaults[randomIndex] ?? '죄송합니다, 이해하지 못했습니다.';

    return {
      text: fallbackText,
      intent: detectIntent(userInput) ?? 'general',
    };
  };

  // 💬 타이핑 효과 (첫 글자 누락 방지)
  const typeMessage = (text: string, callback: () => void) => {
    let index = 0;
    setTypingText('');
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    // ✅ 렌더링 완료 후 타이핑 시작 (첫 글자 누락 방지)
    setTimeout(() => {
      setIsAITyping(true);

      typingIntervalRef.current = setInterval(() => {
        setTypingText((prev) => {
          if (index < text.length) {
            const next = prev + text[index];
            index++;
            return next;
          } else {
            clearInterval(typingIntervalRef.current!);
            setIsAITyping(false);
            setTypingText('');
            callback();
            return prev;
          }
        });
      }, 30);
    }, 50);
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text ?? inputText;
    if (!messageText.trim() || isAITyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = messageText;
    setInputText('');

    // ⏳ 0.5초 후 AI 타이핑 시작
    setTimeout(() => {
      const result = findAIResponse(currentInput);
      const { text: aiResponse, intent } = result;
      setCurrentIntent(intent);

      typeMessage(aiResponse, () => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: aiResponse,
          timestamp: new Date(),
          intent,
        };
        setMessages((prev) => [...prev, aiMessage]);
      });
    }, 500);
  };

  // 추천 질문 목록
  const fullSuggestions =
    (currentIntent && aiData.suggestions?.[currentIntent]) || [];

  const suggestedQuestions =
    fullSuggestions.length > 5
      ? fullSuggestions.sort(() => Math.random() - 0.5).slice(0, 5)
      : fullSuggestions;

  const quickActions = [
    { text: '내일 오후 3시에 회의실 예약하고 싶어요', icon: 'ri-calendar-line' },
    { text: '프로젝터가 있는 회의실 찾아주세요', icon: 'ri-slideshow-line' },
    { text: '이번 주 프로그램 일정 알려주세요', icon: 'ri-heart-pulse-line' },
    { text: '강남센터 위치 알려주세요', icon: 'ri-map-pin-line' },
  ];

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 transition-all duration-300 ${
        isExpanded ? 'w-96 h-[600px]' : 'w-14 h-14'
      }`}
    >
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center group relative"
        >
          <i className="ri-message-3-line text-2xl"></i>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col h-full">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 relative">
                <i className="ri-robot-2-line text-blue-600 text-xl"></i>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-bold text-white">ConnectWon AI</h3>
                <p className="text-xs text-blue-100 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  온라인
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
                      : 'bg-white text-gray-900 rounded-2xl rounded-tl-sm shadow-sm'
                  } p-3`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* AI 타이핑 중 */}
            {isAITyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] bg-white text-gray-900 rounded-2xl rounded-tl-sm shadow-sm p-3">
                  <p className="text-sm whitespace-pre-line leading-relaxed">
                    {typingText}
                    <span className="inline-block w-1 h-4 bg-gray-400 ml-1 animate-pulse"></span>
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* intent 기반 추천 질문 */}
          {suggestedQuestions.length > 0 && !isAITyping && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <div className="text-xs font-medium text-gray-600 mb-2 flex items-center">
                <i className="ri-sparkling-2-line mr-1 text-blue-500"></i>
                추천 질문
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(q)}
                    className="px-3 py-2 text-xs bg-white hover:bg-blue-50 border border-gray-200 text-gray-700 rounded-lg transition-all hover:shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 기본 빠른 질문 */}
          {messages.length === 1 && !isAITyping && suggestedQuestions.length === 0 && (
            <div className="px-4 py-3 border-t border-gray-200 bg-white">
              <div className="text-xs font-medium text-gray-600 mb-2 flex items-center">
                <i className="ri-flashlight-line mr-1"></i>
                빠른 질문
              </div>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(action.text)}
                    className="p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-all hover:shadow-sm border border-gray-200"
                  >
                    <i className={`${action.icon} text-blue-600 mr-1`}></i>
                    <span className="text-gray-700">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 입력 영역 */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isAITyping}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isAITyping || !inputText.trim()}
                className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <i className="ri-send-plane-fill"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
