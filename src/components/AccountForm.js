'use client';

import { useState } from 'react';
import useInvitationStore from '@/store/useInvitationStore';

const bankList = [
  'KB국민은행', '신한은행', '하나은행', '우리은행',
  'NH농협은행', 'IBK기업은행', 'SC제일은행', '카카오뱅크',
  '토스뱅크', 'KEBㅎ하나은행', '대구은행', '부산은행',
  '경남은행', '광주은행', '전북은행', '제주은행',
  '수협은행', '새마을금고', '신협', '우체국',
];

export default function AccountForm() {
  const { accounts, addAccount, removeAccount } = useInvitationStore();
  const [showForm, setShowForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    label: '', // 예: 신랑측, 신부측, 아버지 등
    bank: '',
    accountNumber: '',
    holder: '',
  });

  const handleAdd = () => {
    if (!newAccount.bank || !newAccount.accountNumber || !newAccount.holder) {
      alert('은행, 계좌번호, 예금주를 모두 입력해주세요');
      return;
    }
    addAccount({ ...newAccount });
    setNewAccount({ label: '', bank: '', accountNumber: '', holder: '' });
    setShowForm(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">계좌 정보</h2>
      <p className="text-sm text-gray-500 mb-4">축의금/선물 계좌를 등록해주세요 (선택)</p>

      {/* 등록된 계좌 목록 */}
      <div className="space-y-3 mb-4">
        {accounts.map((acc, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div>
              {acc.label && (
                <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium mb-1">
                  {acc.label}
                </span>
              )}
              <p className="text-sm font-bold text-gray-800">{acc.bank}</p>
              <p className="text-sm text-gray-600">{acc.accountNumber}</p>
              <p className="text-xs text-gray-400">{acc.holder}</p>
            </div>
            <button
              onClick={() => removeAccount(index)}
              className="text-red-400 hover:text-red-600 p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* 계좌 추가 폼 */}
      {showForm ? (
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="font-bold text-gray-700 text-sm">새 계좌 추가</h3>

          <div>
            <label className="block text-xs text-gray-500 mb-1">구분 (선택)</label>
            <input
              type="text"
              placeholder="예: 신랑측, 신부측, 아버지"
              value={newAccount.label}
              onChange={(e) => setNewAccount({ ...newAccount, label: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">은행 선택</label>
            <select
              value={newAccount.bank}
              onChange={(e) => setNewAccount({ ...newAccount, bank: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
            >
              <option value="">은행을 선택하세요</option>
              {bankList.map((bank) => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">계좌번호</label>
            <input
              type="text"
              placeholder="- 없이 숫자만 입력"
              value={newAccount.accountNumber}
              onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">예금주</label>
            <input
              type="text"
              placeholder="예금주 이름"
              value={newAccount.holder}
              onChange={(e) => setNewAccount({ ...newAccount, holder: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium"
            >
              취소
            </button>
            <button
              onClick={handleAdd}
              className="flex-1 py-3 rounded-xl bg-blue-500 text-white text-sm font-medium"
            >
              추가
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-300 text-gray-500 text-sm font-medium hover:border-blue-400 hover:text-blue-500 transition-colors"
        >
          + 계좌 추가하기
        </button>
      )}
    </div>
  );
}
