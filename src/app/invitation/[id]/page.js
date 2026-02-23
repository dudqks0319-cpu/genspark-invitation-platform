'use client';

import { useParams } from 'next/navigation';

export default function InvitationPublicPage() {
  const params = useParams();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">초대장 뷰</h1>
        <p className="mt-2 text-gray-500">초대장 ID: {params?.id || 'unknown'}</p>
        <p className="mt-6 text-sm text-gray-400">실 운영에서는 DB에서 초대장 데이터를 로드해 렌더링합니다.</p>
      </div>
    </div>
  );
}
