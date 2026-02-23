'use client';

import { useMemo, useState } from 'react';
import useInvitationStore from '@/store/useInvitationStore';
import templates from '@/data/templates';

const TYPE_EMOJI = {
  wedding: '💍',
  baby: '👶',
  seventieth: '🎊',
  housewarming: '🏠',
  party: '🥂',
};

const MOOD_LABELS = {
  all: '전체',
  elegant: '클래식',
  cute: '귀여운',
  modern: '모던',
  traditional: '전통',
  natural: '내추럴',
};

const TIER_LABELS = {
  all: '전체',
  free: '무료',
  premium: 'PRO',
};

const MOOD_SEQUENCE = ['elegant', 'modern', 'natural', 'traditional', 'cute'];
const BADGE_SEQUENCE = ['BEST', 'NEW', null, null, 'HOT'];

const PREMIUM_FEATURES = ['오프닝 연출', 'BGM 효과', '프리미엄 분위기'];

export default function DesignSelector({ type }) {
  const { selectedDesign, setSelectedDesign, setIsPremium } = useInvitationStore();

  const [tierFilter, setTierFilter] = useState('all');
  const [moodFilter, setMoodFilter] = useState('all');
  const [previewDesign, setPreviewDesign] = useState(null);
  const [premiumHint, setPremiumHint] = useState('');

  const rawList = templates[type] || [];

  const designList = useMemo(() => {
    return rawList.map((design, index) => ({
      ...design,
      mood: design.mood || MOOD_SEQUENCE[index % MOOD_SEQUENCE.length],
      badge: design.badge || BADGE_SEQUENCE[index % BADGE_SEQUENCE.length],
      features:
        design.features ||
        (design.tier === 'premium' ? PREMIUM_FEATURES : ['무료 디자인']),
    }));
  }, [rawList]);

  const filteredList = useMemo(() => {
    return designList.filter((design) => {
      const tierOk = tierFilter === 'all' || design.tier === tierFilter;
      const moodOk = moodFilter === 'all' || design.mood === moodFilter;
      return tierOk && moodOk;
    });
  }, [designList, tierFilter, moodFilter]);

  const topPicks = useMemo(() => {
    const byBadge = designList.filter((design) => Boolean(design.badge));
    if (byBadge.length >= 3) return byBadge.slice(0, 3);
    return designList.slice(0, 3);
  }, [designList]);

  const selectDesign = (design) => {
    setSelectedDesign(design);
    setIsPremium(design.tier === 'premium');

    if (design.tier === 'premium') {
      setPremiumHint(`✨ ₩${design.price.toLocaleString()} · 프리미엄 기능 포함`);
      window.setTimeout(() => setPremiumHint(''), 2200);
    } else {
      setPremiumHint('');
    }
  };

  const renderCard = (design, compact = false) => {
    const isSelected = selectedDesign?.id === design.id;

    return (
      <div
        key={design.id}
        onClick={() => selectDesign(design)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectDesign(design);
          }
        }}
        tabIndex={0}
        className={`relative w-full overflow-hidden rounded-2xl border-2 text-left transition-all ${
          isSelected
            ? 'border-gray-900 shadow-lg scale-[1.01]'
            : 'border-gray-200 shadow-sm hover:border-gray-300'
        } ${compact ? '' : 'min-h-[300px]'}`}
        role="radio"
        aria-checked={isSelected}
        aria-label={`${design.name}, ${design.tier === 'free' ? '무료' : `${design.price.toLocaleString()}원`}, ${MOOD_LABELS[design.mood]} 스타일`}
      >
        <div
          className={`${compact ? 'h-36' : 'h-48'} p-4 flex items-end`}
          style={{
            backgroundImage: `linear-gradient(135deg, ${design.accentColor}33, ${design.accentColor}77), url(${design.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="rounded-lg bg-black/35 px-3 py-1.5 text-white text-xs font-medium backdrop-blur-sm">
            {TYPE_EMOJI[type]} {MOOD_LABELS[design.mood]} 분위기
          </div>
        </div>

        {design.badge && (
          <div className="absolute top-3 left-3 rounded-md bg-gray-900 px-2 py-1 text-[11px] font-bold text-white">
            {design.badge}
          </div>
        )}

        {design.tier === 'premium' && (
          <div className="absolute top-3 right-3 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 px-2 py-1 text-[11px] font-bold text-white">
            PRO
          </div>
        )}

        {isSelected && (
          <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        <div className="space-y-2 bg-white p-4">
          <div>
            <p className="text-base font-bold text-gray-900">{design.name}</p>
            <p className="mt-1 text-sm text-gray-500">{design.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
              {MOOD_LABELS[design.mood]}
            </span>
            {design.tier === 'premium' ? (
              <span className="text-sm font-semibold text-amber-700">
                ₩{design.price.toLocaleString()}
              </span>
            ) : (
              <span className="text-sm font-semibold text-emerald-700">무료</span>
            )}
          </div>

          {!compact && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewDesign(design);
              }}
              className="min-h-[44px] text-sm font-medium text-blue-600 underline underline-offset-4"
            >
              미리보기
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5 pb-4">
      <div>
        <h2 className="mb-1 text-xl font-bold text-gray-900">디자인 선택</h2>
        <p className="text-sm text-gray-500">한눈에 비교하고, 미리본 뒤 확정하세요</p>
      </div>

      {!!topPicks.length && (
        <section>
          <p className="mb-2 text-xs font-semibold text-gray-500">👑 이번 달 인기 디자인</p>
          <div className="hide-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1">
            {topPicks.map((design) => (
              <div key={`top-${design.id}`} className="w-44 shrink-0">
                {renderCard(design, true)}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-2">
        <div
          className="hide-scrollbar flex gap-2 overflow-x-auto"
          role="radiogroup"
          aria-label="분위기 필터"
        >
          {Object.entries(MOOD_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setMoodFilter(key)}
              role="radio"
              aria-checked={moodFilter === key}
              className={`min-h-[44px] shrink-0 rounded-full px-4 text-sm font-medium transition-colors ${
                moodFilter === key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div
          className="hide-scrollbar flex gap-2 overflow-x-auto"
          role="radiogroup"
          aria-label="요금 필터"
        >
          {Object.entries(TIER_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTierFilter(key)}
              role="radio"
              aria-checked={tierFilter === key}
              className={`min-h-[44px] shrink-0 rounded-lg border px-3 text-sm font-medium transition-colors ${
                tierFilter === key
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-600'
              }`}
            >
              {label}
            </button>
          ))}

          {tierFilter === 'free' && (
            <span className="self-center text-xs text-gray-400">무료 디자인도 충분히 예뻐요</span>
          )}
        </div>
      </section>

      {selectedDesign && (
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-3">
          <p className="text-sm font-medium text-blue-900">
            선택됨: {selectedDesign.name}
            {selectedDesign.tier === 'premium' ? ' · PRO' : ''}
          </p>
        </div>
      )}

      {premiumHint && (
        <div className="rounded-xl bg-gray-900 px-3 py-2 text-sm font-medium text-white">
          {premiumHint}
        </div>
      )}

      {filteredList.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-base font-semibold text-gray-700">해당 조건의 디자인이 아직 없어요</p>
          <p className="mt-1 text-sm text-gray-500">필터를 초기화하고 전체 디자인을 확인해보세요</p>
          <button
            type="button"
            onClick={() => {
              setTierFilter('all');
              setMoodFilter('all');
            }}
            className="mt-4 min-h-[44px] rounded-xl bg-gray-900 px-5 text-sm font-medium text-white"
          >
            전체 보기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filteredList.map((design) => renderCard(design, false))}
        </div>
      )}

      {previewDesign && (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            aria-label="미리보기 닫기"
            className="absolute inset-0 bg-black/45"
            onClick={() => setPreviewDesign(null)}
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-hidden rounded-t-3xl bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <div>
                <p className="text-sm text-gray-500">디자인 미리보기</p>
                <h3 className="text-lg font-bold text-gray-900">{previewDesign.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDesign(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto px-4 py-4">
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  background: `linear-gradient(155deg, ${previewDesign.accentColor}22, ${previewDesign.accentColor}66)`,
                }}
              >
                <p className="mb-2 text-xs font-medium text-gray-600">{TYPE_EMOJI[type]} 샘플 화면</p>
                <h4 className="text-2xl font-bold" style={{ color: previewDesign.fontColor }}>
                  초대합니다
                </h4>
                <p className="mt-2 text-sm" style={{ color: previewDesign.fontColor }}>
                  {previewDesign.description}
                </p>
                <div className="mx-auto mt-5 h-0.5 w-16" style={{ backgroundColor: previewDesign.accentColor }} />
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                <p className="text-sm font-medium text-gray-700">
                  {previewDesign.tier === 'premium' ? '프리미엄 포함 기능' : '기본 포함 기능'}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(previewDesign.features || ['디자인 선택', '기본 미리보기']).map((feature) => (
                    <span
                      key={`${previewDesign.id}-${feature}`}
                      className="rounded-full bg-white px-2.5 py-1 text-xs text-gray-600"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 px-4 py-3">
              <button
                type="button"
                onClick={() => {
                  selectDesign(previewDesign);
                  setPreviewDesign(null);
                }}
                className="min-h-[48px] w-full rounded-xl bg-gray-900 text-sm font-semibold text-white"
              >
                이 디자인으로 시작하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
