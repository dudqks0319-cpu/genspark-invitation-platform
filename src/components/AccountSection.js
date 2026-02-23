'use client';

import { useState } from 'react';

export default function AccountSection({ accounts, design }) {
  const [openIndex, setOpenIndex] = useState(null);

  const copyAccount = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber).then(() => {
      alert('계좌번호가 복사되었습니다!');
    });
  };

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold" style={{ color: design.fontColor }}>
          마음 전하실 곳
        </h2>
        <p className="text-xs mt-1" style={{ color: design.fontColor + '88' }}>
          축하의 마음을 전해주세요
        </p>
      </div>

      <div className="space-y-3">
        {accounts.map((acc, index) => (
          <div key={index} className="bg-white/80 rounded-2xl shadow-sm overflow-hidden">
            {/* 헤더 (클릭하면 열림) */}
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {acc.label && (
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: design.accentColor + '22', color: design.accentColor }}
                  >
                    {acc.label}
                  </span>
                )}
                <span className="text-sm font-bold text-gray-800">{acc.holder}</span>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* 계좌 상세 (펼쳐지는 부분) */}
            {openIndex === index && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                <p className="text-sm text-gray-600">{acc.bank}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-bold text-gray-800 tracking-wide">{acc.accountNumber}</p>
                  <button
                    onClick={() => copyAccount(acc.accountNumber)}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-white"
                    style={{ backgroundColor: design.accentColor }}
                  >
                    복사
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
