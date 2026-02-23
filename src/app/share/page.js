'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import useInvitationStore from '@/store/useInvitationStore';
import { QRCodeSVG } from 'qrcode.react';

function ShareContent() {
  const router = useRouter();
  const { info, type } = useInvitationStore();

  // 실제로는 DB 저장 후 생성된 URL
  const invitationUrl = 'https://your-domain.com/invitation/abc123';

  // 카카오톡 공유
  const shareKakao = () => {
    if (!window.Kakao) {
      alert('카카오 SDK가 로드되지 않았습니다.\n.env에 NEXT_PUBLIC_KAKAO_JS_KEY를 설정해주세요.');
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: info.title || '초대합니다',
        description: (info.greetingMessage || '소중한 자리에 초대합니다').slice(0, 50),
        imageUrl: 'https://your-domain.com/images/share-thumbnail.jpg',
        link: {
          mobileWebUrl: invitationUrl,
          webUrl: invitationUrl,
        },
      },
      buttons: [
        {
          title: '초대장 보기',
          link: {
            mobileWebUrl: invitationUrl,
            webUrl: invitationUrl,
          },
        },
      ],
    });
  };

  // URL 복사
  const copyUrl = () => {
    navigator.clipboard.writeText(invitationUrl).then(() => {
      alert('링크가 복사되었습니다!');
    });
  };

  // 일반 공유 (네이티브 공유)
  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: info.title || '초대합니다',
          text: (info.greetingMessage || '소중한 자리에 초대합니다').slice(0, 50),
          url: invitationUrl,
        });
      } catch (err) {
        // 사용자가 공유를 취소한 경우
      }
    } else {
      copyUrl();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md mx-auto px-4 pt-16 pb-20 text-center">
        {/* 완성 축하 */}
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          초대장이 완성되었어요!
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          아래 방법으로 초대장을 보내보세요
        </p>

        {/* 카카오톡 공유 버튼 */}
        <button
          onClick={shareKakao}
          className="w-full py-4 rounded-2xl bg-yellow-400 text-yellow-900 font-bold text-lg mb-3 flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.56-.96 3.6-.99 3.83 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.7-2.44 4.28-2.86.55.08 1.13.12 1.72.12 5.52 0 10-3.58 10-7.94C22 6.58 17.52 3 12 3z"/>
          </svg>
          카카오톡으로 보내기
        </button>

        {/* URL 복사 */}
        <button
          onClick={copyUrl}
          className="w-full py-4 rounded-2xl bg-white border border-gray-200 text-gray-700 font-semibold mb-3 shadow-sm active:scale-[0.98] transition-transform"
        >
          링크 복사하기
        </button>

        {/* 기타 공유 */}
        <button
          onClick={shareNative}
          className="w-full py-4 rounded-2xl bg-white border border-gray-200 text-gray-700 font-semibold mb-8 shadow-sm active:scale-[0.98] transition-transform"
        >
          다른 방법으로 공유하기
        </button>

        {/* QR코드 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm inline-block">
          <p className="text-sm font-medium text-gray-600 mb-4">QR코드로도 공유할 수 있어요</p>
          <QRCodeSVG
            value={invitationUrl}
            size={180}
            level="M"
          />
        </div>

        {/* 다시 수정 */}
        <div className="mt-10">
          <button
            onClick={() => router.push(`/create?type=${type}`)}
            className="text-sm text-gray-400 underline"
          >
            초대장 수정하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>로딩 중...</p></div>}>
      <ShareContent />
    </Suspense>
  );
}
