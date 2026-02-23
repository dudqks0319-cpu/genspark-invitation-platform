'use client';

import useInvitationStore from '@/store/useInvitationStore';

export default function OptionSelector() {
  const { showQR, setShowQR, useRSVP, setUseRSVP } = useInvitationStore();

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">추가 옵션</h2>
      <p className="text-sm text-gray-500 mb-4">원하는 기능을 선택해주세요</p>

      <div className="space-y-3">
        {/* QR코드 */}
        <ToggleOption
          title="QR코드 표시"
          description="초대장 링크를 QR코드로도 보여줍니다"
          enabled={showQR}
          onToggle={() => setShowQR(!showQR)}
        />

        {/* 참석여부 */}
        <ToggleOption
          title="참석여부 (RSVP)"
          description="받는 사람이 참석/불참을 알려줄 수 있어요"
          enabled={useRSVP}
          onToggle={() => setUseRSVP(!useRSVP)}
        />
      </div>
    </div>
  );
}

function ToggleOption({ title, description, enabled, onToggle }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
      <div>
        <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-12 h-7 rounded-full transition-colors ${enabled ? 'bg-blue-500' : 'bg-gray-300'}`}
      >
        <div
          className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`}
        />
      </button>
    </div>
  );
}
