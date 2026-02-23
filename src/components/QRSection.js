'use client';

import { QRCodeSVG } from 'qrcode.react';

export default function QRSection({ design, isPreview }) {
  // 실제로는 저장된 초대장의 URL이 들어감
  const invitationUrl = isPreview
    ? 'https://your-domain.com/invitation/preview'
    : typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4" style={{ color: design.fontColor }}>
        QR코드
      </h2>
      <div className="inline-block bg-white p-6 rounded-2xl shadow-sm">
        <QRCodeSVG
          value={invitationUrl || 'https://invitation.example.com'}
          size={160}
          level="M"
          fgColor={design.fontColor}
        />
        <p className="text-xs text-gray-400 mt-3">QR코드를 스캔하면 초대장이 열려요</p>
      </div>
    </div>
  );
}
