'use client';

import { useState } from 'react';
import useInvitationStore from '@/store/useInvitationStore';
import templates from '@/data/templates';

export default function DesignSelector({ type }) {
  const { selectedDesign, setSelectedDesign, setIsPremium } = useInvitationStore();
  const [filter, setFilter] = useState('all'); // all, free, premium

  const designList = templates[type] || [];

  const filteredList = designList.filter((d) => {
    if (filter === 'free') return d.tier === 'free';
    if (filter === 'premium') return d.tier === 'premium';
    return true;
  });

  const handleSelect = (design) => {
    setSelectedDesign(design);
    setIsPremium(design.tier === 'premium');
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">디자인 선택</h2>
      <p className="text-sm text-gray-500 mb-4">마음에 드는 디자인을 골라주세요</p>

      {/* 필터 버튼 */}
      <div className="flex gap-2 mb-5">
        {[
          { key: 'all', label: '전체' },
          { key: 'free', label: '무료' },
          { key: 'premium', label: '프리미엄' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === f.key
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 디자인 카드 목록 */}
      <div className="grid grid-cols-2 gap-3">
        {filteredList.map((design) => (
          <button
            key={design.id}
            onClick={() => handleSelect(design)}
            className={`relative rounded-2xl overflow-hidden border-2 transition-all ${
              selectedDesign?.id === design.id
                ? 'border-blue-500 shadow-lg scale-[1.02]'
                : 'border-transparent shadow-sm'
            }`}
          >
            {/* 디자인 미리보기 (실제 이미지 넣기 전) */}
            <div
              className="aspect-[3/4] flex flex-col items-center justify-center p-4"
              style={{
                background: `linear-gradient(135deg, ${design.accentColor}22, ${design.accentColor}44)`,
              }}
            >
              {/* 임시 디자인 미리보기 (실제 이미지 넣기 전) */}
              <div
                className="w-16 h-16 rounded-full mb-3 flex items-center justify-center text-3xl"
                style={{ backgroundColor: design.accentColor + '33' }}
              >
                {type === 'wedding' && '💍'}
                {type === 'baby' && '👶'}
                {type === 'seventieth' && '🎊'}
                {type === 'housewarming' && '🏠'}
                {type === 'party' && '🥂'}
              </div>
              <p className="text-xs font-medium" style={{ color: design.fontColor }}>
                초대합니다
              </p>
              <div className="mt-2 w-12 h-0.5" style={{ backgroundColor: design.accentColor }} />
            </div>

            {/* 디자인 이름 */}
            <div className="bg-white p-3">
              <p className="text-sm font-bold text-gray-800">{design.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{design.description}</p>

              {/* 가격 표시 */}
              {design.tier === 'premium' ? (
                <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
                  ₩{design.price.toLocaleString()}
                </span>
              ) : (
                <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  무료
                </span>
              )}
            </div>

            {/* 선택됨 표시 */}
            {selectedDesign?.id === design.id && (
              <div className="absolute top-2 right-2 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}

            {/* 프리미엄 뱃지 */}
            {design.tier === 'premium' && (
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full font-bold">
                PRO
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
