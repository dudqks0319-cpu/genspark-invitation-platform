'use client';

import useInvitationStore from '@/store/useInvitationStore';

export default function OptionSelector() {
  const {
    showQR,
    setShowQR,
    useRSVP,
    setUseRSVP,
    photoProtection,
    setPhotoProtection,
  } = useInvitationStore();

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
      <div>
        <h3 className="font-bold text-gray-800">표시 옵션</h3>
        <p className="text-xs text-gray-500 mt-1">
          추천 기본값: QR/참석여부 ON, 사진 보호 OFF
        </p>
      </div>

      <OptionToggle
        title="QR 코드 표시"
        description="종이 초대장이나 현장에서 스캔할 수 있도록 QR을 보여줘요."
        enabled={showQR}
        onToggle={() => setShowQR(!showQR)}
      />

      <OptionToggle
        title="참석 여부 받기 (RSVP)"
        description="하객이 참석/불참을 남길 수 있어 인원 파악이 쉬워져요."
        enabled={useRSVP}
        onToggle={() => setUseRSVP(!useRSVP)}
      />

      <OptionToggle
        title="사진 확대/저장 방지"
        description="사진을 길게 눌러 저장하는 동작을 줄여줘요."
        enabled={photoProtection}
        onToggle={() => setPhotoProtection(!photoProtection)}
      />
    </div>
  );
}

function OptionToggle({ title, description, enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      className="w-full text-left rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <span className={`text-xs font-semibold ${enabled ? 'text-blue-600' : 'text-gray-400'}`}>
          {enabled ? 'ON' : 'OFF'}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </button>
  );
}
