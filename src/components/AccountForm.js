'use client';

import { useMemo, useState } from 'react';
import useInvitationStore from '@/store/useInvitationStore';

const BANK_OPTIONS = [
  '신한은행',
  '국민은행',
  '우리은행',
  '하나은행',
  'KEB하나은행',
  '농협은행',
  '기업은행',
  '카카오뱅크',
  '토스뱅크',
  '새마을금고',
  '우체국',
  '기타',
];

export default function AccountForm() {
  const {
    accounts,
    addAccount,
    removeAccount,
    useKakaoPay,
    setUseKakaoPay,
    kakaoPayLink,
    setKakaoPayLink,
  } = useInvitationStore();

  const [form, setForm] = useState({
    label: '',
    bank: BANK_OPTIONS[0],
    number: '',
    holder: '',
  });

  const canAdd = useMemo(() => {
    return form.label.trim() && form.bank.trim() && form.number.trim() && form.holder.trim();
  }, [form]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdd = () => {
    if (!canAdd) return;
    addAccount({
      label: form.label.trim(),
      bank: form.bank.trim(),
      number: form.number.trim(),
      holder: form.holder.trim(),
    });
    setForm({
      label: '',
      bank: BANK_OPTIONS[0],
      number: '',
      holder: '',
    });
  };

  const handleKakaoPayLinkChange = (value) => {
    setKakaoPayLink(value);
    if (value.trim() && !useKakaoPay) {
      setUseKakaoPay(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">계좌 정보</h2>
          <p className="text-xs text-gray-500">
            계좌를 등록하면 하객이 번호를 바로 복사할 수 있어요.
          </p>
        </div>

        {accounts.length > 0 ? (
          <div className="space-y-2">
            {accounts.map((account, index) => (
              <div
                key={`${account.number}-${index}`}
                className="rounded-xl border border-gray-200 p-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-xs text-gray-500">{account.label}</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {account.bank} {account.number}
                  </p>
                  <p className="text-xs text-gray-500">예금주 {account.holder}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeAccount(index)}
                  className="text-xs px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500 rounded-xl bg-gray-50 p-3">
            아직 등록된 계좌가 없습니다. 계좌를 넣지 않아도 초대장은 만들 수 있어요.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <LabeledInput
            label="표시명"
            placeholder="예) 신랑측 아버지"
            value={form.label}
            onChange={(v) => handleChange('label', v)}
          />
          <LabeledSelect
            label="은행"
            value={form.bank}
            onChange={(v) => handleChange('bank', v)}
            options={BANK_OPTIONS}
          />
          <LabeledInput
            label="계좌번호"
            placeholder="예) 110-123-456789"
            value={form.number}
            onChange={(v) => handleChange('number', v)}
          />
          <LabeledInput
            label="예금주"
            placeholder="예) 홍길동"
            value={form.holder}
            onChange={(v) => handleChange('holder', v)}
          />
        </div>

        <button
          type="button"
          disabled={!canAdd}
          onClick={handleAdd}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors ${
            canAdd
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          + 계좌 추가하기
        </button>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
        <button
          type="button"
          onClick={() => setUseKakaoPay(!useKakaoPay)}
          aria-pressed={useKakaoPay}
          className="w-full text-left rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-800">카카오페이 송금 링크 사용</p>
            <span className={`text-xs font-semibold ${useKakaoPay ? 'text-blue-600' : 'text-gray-400'}`}>
              {useKakaoPay ? 'ON' : 'OFF'}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            링크를 넣으면 초대장에서 바로 송금 버튼을 보여줄 수 있어요.
          </p>
        </button>

        {useKakaoPay && (
          <LabeledInput
            label="카카오페이 링크"
            placeholder="https://qr.kakaopay.com/..."
            value={kakaoPayLink}
            onChange={handleKakaoPayLinkChange}
          />
        )}
      </div>
    </div>
  );
}

function LabeledInput({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400"
      />
    </div>
  );
}

function LabeledSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
