'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import useInvitationStore from '@/store/useInvitationStore';
import InvitationForm from '@/components/InvitationForm';
import DesignSelector from '@/components/DesignSelector';
import AccountForm from '@/components/AccountForm';
import OptionSelector from '@/components/OptionSelector';

// searchParams를 사용하는 실제 컴포넌트
function CreateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get('type') || 'wedding';

  const { setType, selectedDesign } = useInvitationStore();

  // 현재 단계 (1: 디자인선택, 2: 정보입력, 3: 계좌/옵션, 4: 완료)
  const [step, setStep] = useState(1);
  const [stepNotice, setStepNotice] = useState('');

  useEffect(() => {
    setType(type);
  }, [type, setType]);

  const typeNames = {
    wedding: '결혼식',
    baby: '돌잔치',
    seventieth: '칠순·팔순',
    housewarming: '집들이',
    party: '결혼전 모임',
  };

  const steps = [
    { num: 1, label: '디자인' },
    { num: 2, label: '정보입력' },
    { num: 3, label: '계좌·옵션' },
    { num: 4, label: '완료' },
  ];

  const handleNext = () => {
    if (step === 1 && !selectedDesign) {
      setStepNotice('디자인을 먼저 선택해주세요.');
      return;
    }

    setStepNotice('');

    if (step < 4) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    setStepNotice('');
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleComplete = () => {
    router.push(`/preview?type=${type}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 바 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => (step > 1 ? handlePrev() : router.back())}
            className="text-gray-600 p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-800">
            {typeNames[type]} 초대장 만들기
          </h1>
          <div className="w-6" />
        </div>

        {/* 진행 바 */}
        <div className="max-w-lg mx-auto px-4 pb-3">
          <div className="flex items-center justify-between mb-2">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s.num ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {s.num}
                </div>
                <span className={`ml-1 text-xs ${step >= s.num ? 'text-blue-500 font-semibold' : 'text-gray-400'}`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 ${step > s.num ? 'bg-blue-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-lg mx-auto px-4 py-6 pb-32">
        {stepNotice && (
          <div className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {stepNotice}
          </div>
        )}
        {step === 1 && <DesignSelector type={type} />}
        {step === 2 && <InvitationForm type={type} />}
        {step === 3 && (
          <>
            <AccountForm />
            <div className="mt-6">
              <OptionSelector />
            </div>
          </>
        )}
        {step === 4 && <CompletionStep />}
      </main>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-lg mx-auto flex gap-3">
          {step > 1 && (
            <button
              onClick={handlePrev}
              className="flex-1 py-4 rounded-xl text-gray-600 font-semibold bg-gray-100 active:bg-gray-200"
            >
              이전
            </button>
          )}
          <button
            onClick={step === 4 ? handleComplete : handleNext}
            className={`flex-[2] py-4 rounded-xl text-white font-semibold ${
              step === 1 && !selectedDesign
                ? 'bg-blue-300'
                : 'bg-blue-500 active:bg-blue-600'
            }`}
          >
            {step === 4 ? '미리보기' : step === 1 ? '이 디자인으로 시작하기' : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
}

// 4단계: 완료 확인
function CompletionStep() {
  const { info, selectedDesign, accounts, showQR, useRSVP } = useInvitationStore();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">입력 내용 확인</h2>

        <div className="space-y-3">
          <InfoRow label="제목" value={info.title} />
          <InfoRow label="날짜" value={info.date} />
          <InfoRow label="시간" value={info.time} />
          <InfoRow label="장소" value={info.location} />
          <InfoRow label="주소" value={info.address} />
          <InfoRow label="연락처" value={info.phone} />
          <InfoRow label="디자인" value={selectedDesign?.name || '선택 안됨'} />
          <InfoRow label="계좌수" value={`${accounts.length}개`} />
          <InfoRow label="QR코드" value={showQR ? '표시' : '숨김'} />
          <InfoRow label="참석여부" value={useRSVP ? '사용' : '미사용'} />
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-5">
        <p className="text-blue-700 text-sm">
          모든 정보를 확인하셨으면 "미리보기" 버튼을 눌러주세요!
          미리보기에서 최종 초대장 모습을 확인할 수 있어요.
        </p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-gray-800 text-sm font-medium">{value || '-'}</span>
    </div>
  );
}

// Suspense로 감싸는 메인 export
export default function CreatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-400">로딩 중...</p>
        </div>
      }
    >
      <CreateContent />
    </Suspense>
  );
}
