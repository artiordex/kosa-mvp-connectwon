/**
 * Description : BoardManagement.tsx - 📌 게시판 관리 컴포넌트 (글/리뷰 관리, 설정)
 * Author : Shiwoo Min
 * Date : 2025-10-11
 */
'use client';

import { useState } from 'react';
import postsData from 'data/posts.json';
import Pagination from 'components/Pagination';

type ManagementTab = 'posts' | 'reviews' | 'settings';

interface PostType {
  id: number;
  type: 'notice' | 'program' | 'general';
  title: string;
  author: string;
  date: string;
  views: number;
  status: 'published' | 'draft';
}

export default function BoardManagement() {
  const [activeTab, setActiveTab] = useState<ManagementTab>('posts');

  return (
    <div className="space-y-6">
      {/* 탭 네비게이션 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          <TabButton
            active={activeTab === 'posts'}
            onClick={() => setActiveTab('posts')}
            icon="ri-article-line"
            label="글 관리"
          />
          <TabButton
            active={activeTab === 'reviews'}
            onClick={() => setActiveTab('reviews')}
            icon="ri-star-line"
            label="리뷰 관리"
          />
          <TabButton
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
            icon="ri-settings-3-line"
            label="게시판 설정"
          />
        </div>

        <div className="p-6">
          {activeTab === 'posts' && <PostManagement />}
          {activeTab === 'reviews' && <ReviewManagement />}
          {activeTab === 'settings' && <BoardSettings />}
        </div>
      </div>
    </div>
  );
}

/* ==================== 탭 버튼 컴포넌트 ==================== */
function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: string; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all border-b-2 ${
        active
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      <i className={`${icon} text-lg`}></i>
      <span>{label}</span>
    </button>
  );
}

/* ==================== 1. 글 관리 ==================== */
function PostManagement() {
  const [posts, setPosts] = useState<PostType[]>(postsData.posts as PostType[]);
  const [filter, setFilter] = useState<'all' | 'notice' | 'program' | 'general'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'all' || post.type === filter;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // 페이지네이션 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // 필터 변경 시 첫 페이지로 이동
  const handleFilterChange = (callback: () => void) => {
    callback();
    setCurrentPage(1);
  };

  // 페이지당 항목 수 변경
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const getTypeBadge = (type: string) => {
    const badges = {
      notice: { label: '공지', color: 'bg-red-100 text-red-700' },
      program: { label: '프로그램', color: 'bg-blue-100 text-blue-700' },
      general: { label: '일반', color: 'bg-gray-100 text-gray-700' },
    };
    return badges[type as 'notice' | 'program' | 'general'] || badges.general;
  };

  const getStatusBadge = (status: string) => {
    return status === 'published'
      ? { label: '게시됨', color: 'bg-green-100 text-green-700' }
      : { label: '임시저장', color: 'bg-yellow-100 text-yellow-700' };
  };

  return (
    <div className="space-y-6">
      {/* 필터 & 검색 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setFilter('notice')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'notice' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            공지사항
          </button>
          <button
            onClick={() => setFilter('program')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'program' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            프로그램
          </button>
          <button
            onClick={() => setFilter('general')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'general' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            일반글
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="게시글 검색..."
              value={searchTerm}
              onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </div>

      {/* 게시글 목록 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">분류</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">작성자</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">작성일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">조회수</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentPosts.map((post) => {
              const typeBadge = getTypeBadge(post.type);
              const statusBadge = getStatusBadge(post.status);
              return (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeBadge.color}`}>
                      {typeBadge.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{post.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{post.views}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}>
                      {statusBadge.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <i className="ri-edit-line"></i>
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {filteredPosts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredPosts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}

      {/* 결과 없음 */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <i className="ri-article-line text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">검색 결과가 없습니다</p>
        </div>
      )}
    </div>
  );
}

/* ==================== 2. 리뷰 관리 ==================== */
function ReviewManagement() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const reviews = [
    { id: 1, author: '김민수', program: '요가 클래스', rating: 5, content: '정말 좋은 프로그램입니다. 강사님이 친절하시고...', date: '2025-10-10', status: 'approved' },
    { id: 2, author: '이지은', program: '필라테스', rating: 4, content: '시설이 깨끗하고 좋아요. 다만 주차가 조금...', date: '2025-10-09', status: 'pending' },
    { id: 3, author: '박철수', program: '수영 강습', rating: 5, content: '초보자도 쉽게 배울 수 있어요. 추천합니다!', date: '2025-10-08', status: 'approved' },
    { id: 4, author: '최영희', program: '헬스', rating: 3, content: '장비가 조금 노후된 것 같아요', date: '2025-10-07', status: 'rejected' },
  ];

  const filteredReviews = reviews.filter(review => filter === 'all' || review.status === filter);

  const getStatusBadge = (status: string) => {
    const badges = {
      approved: { label: '승인됨', color: 'bg-green-100 text-green-700' },
      pending: { label: '대기중', color: 'bg-yellow-100 text-yellow-700' },
      rejected: { label: '거부됨', color: 'bg-red-100 text-red-700' },
    };
    return badges[status as keyof typeof badges];
  };

  return (
    <div className="space-y-6">
      {/* 필터 */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          전체
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          대기중
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          승인됨
        </button>
        <button
          onClick={() => setFilter('rejected')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          거부됨
        </button>
      </div>

      {/* 리뷰 목록 */}
      <div className="space-y-4">
        {filteredReviews.map((review) => {
          const statusBadge = getStatusBadge(review.status);
          return (
            <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{review.author}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}>
                      {statusBadge.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <i className="ri-book-line mr-1"></i>
                      {review.program}
                    </span>
                    <span className="flex items-center">
                      <i className="ri-calendar-line mr-1"></i>
                      {review.date}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`${i < review.rating ? 'ri-star-fill text-yellow-400' : 'ri-star-line text-gray-300'}`}
                    ></i>
                  ))}
                </div>
              </div>

              <p className="text-gray-700 mb-4">{review.content}</p>

              {review.status === 'pending' && (
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
                    <i className="ri-check-line mr-1"></i>
                    승인
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">
                    <i className="ri-close-line mr-1"></i>
                    거부
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ==================== 3. 게시판 설정 ==================== */
function BoardSettings() {
  const [settings, setSettings] = useState({
    postsPerPage: 10,
    allowComments: true,
    allowAnonymous: false,
    requireApproval: true,
    enableNotifications: true,
  });

  const handleSave = () => {
    console.log('Settings saved:', settings);
    alert('설정이 저장되었습니다');
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <i className="ri-information-line text-blue-600 text-xl mr-3 mt-0.5"></i>
          <div>
            <h3 className="text-sm font-medium text-blue-900">게시판 설정 안내</h3>
            <p className="text-sm text-blue-700 mt-1">
              게시판의 동작 방식과 사용자 권한을 설정할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 기본 설정 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">기본 설정</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              페이지당 게시글 수
            </label>
            <select
              value={settings.postsPerPage}
              onChange={(e) => setSettings({ ...settings, postsPerPage: parseInt(e.target.value) })}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5개</option>
              <option value={10}>10개</option>
              <option value={20}>20개</option>
              <option value={50}>50개</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <div className="text-sm font-medium text-gray-900">댓글 허용</div>
              <div className="text-sm text-gray-500">게시글에 댓글을 작성할 수 있습니다</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowComments}
                onChange={(e) => setSettings({ ...settings, allowComments: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <div className="text-sm font-medium text-gray-900">익명 게시 허용</div>
              <div className="text-sm text-gray-500">익명으로 게시글을 작성할 수 있습니다</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowAnonymous}
                onChange={(e) => setSettings({ ...settings, allowAnonymous: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <div className="text-sm font-medium text-gray-900">게시글 승인 필요</div>
              <div className="text-sm text-gray-500">관리자 승인 후 게시글이 공개됩니다</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.requireApproval}
                onChange={(e) => setSettings({ ...settings, requireApproval: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <div className="text-sm font-medium text-gray-900">알림 활성화</div>
              <div className="text-sm text-gray-500">새 게시글 및 댓글 알림을 받습니다</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableNotifications}
                onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
          취소
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          <i className="ri-save-line mr-2"></i>
          설정 저장
        </button>
      </div>
    </div>
  );
}
