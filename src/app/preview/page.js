'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import useInvitationStore from '@/store/useInvitationStore';
import InvitationView from '@/components/InvitationView';

function PreviewContent() {
  const router = useRouter();
  const store = useInvitationStore();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 상단 안내 바 */}
      <div className="bg-yellow-400 text-yellow-900 text-center py-2 text-sm font-bold sticky top-0 z-50">
        미리보기 모드 - 실제 초대장은 이렇게 보여요!
      </div>

      {/* 초대장 미리보기 */}
      <div className="max-w-md mx-auto">
        <InvitationView data={store} isPreview={true} />
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={() => router.back()}
            className="flex-1 py-4 rounded-xl text-gray-600 font-semibold bg-gray-100"
          >
            수정하기
          </button>
          <button
            onClick={() => {
              alert('초대장이 생성되었습니다!\n(DB 연결 후 실제 저장됩니다)');
              router.push(`/share?type=${store.type}`);
            }}
            className="flex-[2] py-4 rounded-xl text-white font-semibold bg-blue-500"
          >
            초대장 완성하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center"><p className="text-white">로딩 중...</p></div>}>
      <PreviewContent />
    </Suspense>
  );
}
