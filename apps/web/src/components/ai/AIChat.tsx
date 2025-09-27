'use client';

import { useEffect, useRef, useState } from 'react';
import { analyzeIntent, getRecommendations, IntentResult, RecommendationResult } from '../../lib/huggingface';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  metadata?: {
    intent?: IntentResult;
    recommendations?: RecommendationResult | undefined;
  };
}

interface AIChatProps {
  onBookingRequest?: (data: any) => void;
  onProgramRequest?: (data: any) => void;
}

export default function AIChat({ onBookingRequest, onProgramRequest }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '안녕하세요! 커넥트원 AI 도우미입니다. 회의실 예약이나 프로그램 참여를 도와드릴게요. 어떤 도움이 필요하신가요?',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // AI 의도 분석
      const intentResult = await analyzeIntent(inputText);

      let aiResponse = '';
      let recommendations: RecommendationResult | undefined;

      if (intentResult.intent === 'room_booking') {
        aiResponse = await handleRoomBookingIntent(intentResult);
        recommendations = await getRoomRecommendations(intentResult);
      } else if (intentResult.intent === 'program_registration') {
        aiResponse = await handleProgramIntent(intentResult);
        recommendations = await getProgramRecommendations(intentResult);
      } else {
        aiResponse = handleGeneralInquiry(inputText);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        metadata: {
          intent: intentResult,
          recommendations,
        },
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: '죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoomBookingIntent = async (intent: IntentResult): Promise<string> => {
    const { entities } = intent;
    let response = '회의실 예약을 도와드리겠습니다!\n\n';

    if (entities.date && entities.time) {
      response += `📅 요청하신 예약 정보:\n`;
      response += `• 날짜: ${entities.date}\n`;
      response += `• 시간: ${entities.time}\n`;
      if (entities.capacity) response += `• 인원: ${entities.capacity}명\n`;
      if (entities.facilities) response += `• 필요 시설: ${entities.facilities.join(', ')}\n`;

      response += '\n아래 추천 회의실 중 선택하시거나, 직접 예약 페이지로 이동하실 수 있습니다.';
    } else {
      response += '더 정확한 예약을 위해 다음 정보를 알려주세요:\n';
      if (!entities.date) response += '• 희망 날짜 (예: 내일, 12월 25일)\n';
      if (!entities.time) response += '• 희망 시간 (예: 오후 3시, 14:00)\n';
      response += '• 예상 참여 인원\n• 필요한 시설 (프로젝터, 화이트보드 등)';
    }

    return response;
  };

  const handleProgramIntent = async (intent: IntentResult): Promise<string> => {
    const { entities } = intent;
    let response = '프로그램 참여를 도와드리겠습니다!\n\n';

    if (entities.programType) {
      response += `관심 있는 프로그램: ${entities.programType}\n`;
    }

    response += '현재 진행 중인 프로그램을 추천해드릴게요. 아래에서 선택하시거나 프로그램 페이지에서 더 많은 정보를 확인하실 수 있습니다.';

    return response;
  };

  const handleGeneralInquiry = (text: string): string => {
    if (text.includes('위치') || text.includes('주소')) {
      return (
        '**커넥트원 센터 위치:**\n\n' +
        '🏢 강남센터: 서울특별시 강남구 테헤란로 123\n' +
        '🏢 마포센터: 서울특별시 마포구 홍익로 456\n' +
        '🏢 광명센터: 경기도 광명시 광명로 789\n\n' +
        '📞 대표번호: 02-1234-5678'
      );
    }

    return (
      '커넥트원에 대해 궁금한 것이 있으시면 언제든 말씀해주세요!\n\n' +
      '• 회의실 예약: "내일 오후 3시에 회의실 예약"\n' +
      '• 프로그램 참여: "요가 클래스 참여하고 싶어요"\n' +
      '• 센터 정보: "위치 알려주세요"'
    );
  };

  const getRoomRecommendations = async (intent: IntentResult) => {
    return await getRecommendations('user1', 'room', [], intent.entities);
  };

  const getProgramRecommendations = async (intent: IntentResult) => {
    return await getRecommendations('user1', 'program', [], intent.entities);
  };

  const handleRecommendationClick = (recommendation: any, type: 'room' | 'program') => {
    if (type === 'room' && onBookingRequest) {
      onBookingRequest({
        roomId: recommendation.id,
        roomName: recommendation.name,
      });
    } else if (type === 'program' && onProgramRequest) {
      onProgramRequest({
        programId: recommendation.id,
        programName: recommendation.name,
      });
    }
  };

  const quickActions = [
    { text: '내일 오후 3시에 회의실 예약', icon: 'ri-calendar-line' },
    { text: '요가 클래스 참여하고 싶어요', icon: 'ri-heart-pulse-line' },
    { text: '프로젝터가 있는 회의실 찾아주세요', icon: 'ri-slideshow-line' },
    { text: '센터 위치 알려주세요', icon: 'ri-map-pin-line' },
  ];

  return (
    <div className={`fixed bottom-4 left-4 z-50 transition-all duration-300 ${isExpanded ? 'w-96 h-[600px]' : 'w-14 h-14'}`}>
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center cursor-pointer"
        >
          <i className="ri-chat-3-line w-6 h-6 flex items-center justify-center text-xl"></i>
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col h-full">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <i className="ri-robot-line w-4 h-4 flex items-center justify-center text-white"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI 도우미</h3>
                <p className="text-xs text-green-600">온라인</p>
              </div>
            </div>
            <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>

                  {/* 추천 항목 표시 */}
                  {message.metadata?.recommendations?.items && (
                    <div className="mt-3 space-y-2">
                      {message.metadata.recommendations.items.map((rec, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecommendationClick(rec, message.metadata!.recommendations!.type)}
                          className="w-full text-left p-2 bg-white/10 rounded border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                        >
                          <div className="font-medium text-sm">{rec.name}</div>
                          <div className="text-xs opacity-75">{rec.reason}</div>
                          <div className="text-xs opacity-60">신뢰도: {Math.round(rec.confidence * 100)}%</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 빠른 액션 */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="text-xs text-gray-500 mb-2">빠른 요청:</div>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(action.text)}
                    className="p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors cursor-pointer"
                  >
                    <i className={`${action.icon} mr-1 w-3 h-3 inline-flex items-center justify-center`}></i>
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 입력 영역 */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
              >
                <i className="ri-send-plane-line w-4 h-4 flex items-center justify-center"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
