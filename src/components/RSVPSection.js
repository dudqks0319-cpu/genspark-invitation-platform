'use client';

import { useState } from 'react';

export default function RSVPSection({ design, isPreview }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    attendance: '', // 'yes' or 'no'
    guestCount: 1,
    meal: true,
    message: '',
  });

  const handleSubmit = () => {
    if (!form.name || !form.attendance) {
      alert('이름과 참석 여부를 선택해주세요');
      return;
    }

    if (isPreview) {
      alert('미리보기 모드입니다.\n실제로는 DB에 저장됩니다!');
      setSubmitted(true);
      return;
    }

    // TODO: 실제 DB에 저장
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white/80 rounded-2xl p-8 shadow-sm text-center">
        <div className="text-4xl mb-3">💌</div>
        <h3 className="text-lg font-bold" style={{ color: design.fontColor }}>
          감사합니다!
        </h3>
        <p className="text-sm mt-2" style={{ color: design.fontColor + '88' }}>
          참석 여부가 전달되었습니다
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold" style={{ color: design.fontColor }}>
          참석 여부
        </h2>
        <p className="text-xs mt-1" style={{ color: design.fontColor + '88' }}>
          참석 여부를 알려주시면 감사하겠습니다
        </p>
      </div>

      <div className="bg-white/80 rounded-2xl p-5 shadow-sm space-y-4">
        {/* 이름 */}
        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">이름</label>
          <input
            type="text"
            placeholder="성함을 입력해주세요"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* 참석 여부 */}
        <div>
          <label className="text-sm font-medium text-gray-600 block mb-2">참석 여부</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setForm({ ...form, attendance: 'yes' })}
              className={`py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                form.attendance === 'yes'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-500'
              }`}
            >
              참석할게요
            </button>
            <button
              onClick={() => setForm({ ...form, attendance: 'no' })}
              className={`py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                form.attendance === 'no'
                  ? 'border-red-400 bg-red-50 text-red-600'
                  : 'border-gray-200 text-gray-500'
              }`}
            >
              불참이에요
            </button>
          </div>
        </div>

        {/* 참석 시 추가 옵션 */}
        {form.attendance === 'yes' && (
          <>
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">동행 인원</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setForm({ ...form, guestCount: Math.max(1, form.guestCount - 1) })}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-600"
                >
                  -
                </button>
                <span className="text-lg font-bold text-gray-800 w-8 text-center">{form.guestCount}</span>
                <button
                  onClick={() => setForm({ ...form, guestCount: form.guestCount + 1 })}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-600"
                >
                  +
                </button>
                <span className="text-sm text-gray-500">명</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-600">식사 여부</label>
              <button
                onClick={() => setForm({ ...form, meal: !form.meal })}
                className={`relative w-12 h-7 rounded-full transition-colors ${form.meal ? 'bg-blue-500' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${form.meal ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </>
        )}

        {/* 메시지 */}
        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">축하 메시지 (선택)</label>
          <textarea
            placeholder="축하 메시지를 남겨주세요"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
            rows={3}
          />
        </div>

        {/* 전송 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl text-white font-semibold text-sm"
          style={{ backgroundColor: design.accentColor }}
        >
          참석 의사 전달하기
        </button>
      </div>
    </div>
  );
}
