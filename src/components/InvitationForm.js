'use client';

import { useState } from 'react';
import useInvitationStore from '@/store/useInvitationStore';

export default function InvitationForm({ type }) {
  const { info, setInfo, wedding, setWedding, baby, setBaby } = useInvitationStore();

  // 인사말 추천
  const greetingTemplates = {
    wedding: [
      '서로가 마주보며 다져온 사랑을\n이제 함께 한 곳을 바라보며 걸어가고자 합니다.\n저희 두 사람이 사랑의 이름으로 지켜나갈 수 있도록\n축복해 주시면 감사하겠습니다.',
      '서로 다른 두 사람이 만나\n사랑이라는 이름으로 하나가 되려 합니다.\n바쁘시더라도 오셔서 축복해 주시면\n더없는 기쁨으로 간직하겠습니다.',
    ],
    baby: [
      '사랑스러운 우리 아이가\n세상에 온 지 벌써 365일!\n첫 번째 생일을 함께 축하해주세요.',
      '하루하루 무럭무럭 자라는\n우리 아기의 첫 번째 생일잔치에\n귀한 걸음 해주시면 감사하겠습니다.',
    ],
    seventieth: [
      '한평생 자식들을 위해 헌신하신\n부모님의 칠순을 맞이하여\n감사의 마음을 전하고자 합니다.\n함께 자리해 주시면 감사하겠습니다.',
      '존경하는 부모님의 칠순 잔치에\n함께 자리하시어 축하해 주시면\n큰 기쁨이 되겠습니다.',
    ],
    housewarming: [
      '새로운 보금자리에 둥지를 틀었습니다.\n따뜻한 마음으로 놀러와주세요!\n맛있는 음식 준비하고 기다릴게요.',
      '드디어 이사했어요!\n새 집 구경도 하고 맛있는 것도 먹고\n즐거운 시간 보내요.',
    ],
    party: [
      '결혼 전 소중한 사람들과\n특별한 시간을 보내고 싶습니다.\n함께 해주시면 감사하겠습니다.',
      '곧 결혼하는 예비 신부(신랑)를 위한\n특별한 파티에 초대합니다!\n즐거운 시간 함께 해요.',
    ],
  };

  const [showGreetingOptions, setShowGreetingOptions] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">정보 입력</h2>
      <p className="text-sm text-gray-500 mb-4">
        필수 정보부터 입력해 주세요. 세부 옵션은 다음 단계에서 언제든 바꿀 수 있어요.
      </p>

      {/* 공통: 제목 */}
      <InputField
        label="초대장 제목"
        placeholder={type === 'wedding' ? '결혼합니다' : '초대합니다'}
        value={info.title}
        onChange={(v) => setInfo({ title: v })}
      />

      {/* 결혼식 전용 */}
      {type === 'wedding' && (
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-700">신랑·신부 정보</h3>
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="신랑 이름"
              placeholder="홍길동"
              value={wedding.groomName}
              onChange={(v) => setWedding({ groomName: v })}
            />
            <InputField
              label="신부 이름"
              placeholder="김영희"
              value={wedding.brideName}
              onChange={(v) => setWedding({ brideName: v })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="신랑 연락처"
              placeholder="010-0000-0000"
              value={wedding.groomPhone}
              onChange={(v) => setWedding({ groomPhone: v })}
              inputType="tel"
            />
            <InputField
              label="신부 연락처"
              placeholder="010-0000-0000"
              value={wedding.bridePhone}
              onChange={(v) => setWedding({ bridePhone: v })}
              inputType="tel"
            />
          </div>

          <div className="border-t border-gray-100 pt-4 mt-4">
            <h3 className="font-bold text-gray-700 mb-3">혼주 정보</h3>
            <p className="text-xs text-gray-400 mb-3">신랑측</p>
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="아버지 성함"
                placeholder="홍판서"
                value={wedding.groomFatherName}
                onChange={(v) => setWedding({ groomFatherName: v })}
              />
              <InputField
                label="어머니 성함"
                placeholder="김부인"
                value={wedding.groomMotherName}
                onChange={(v) => setWedding({ groomMotherName: v })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <InputField
                label="아버지 연락처"
                placeholder="010-0000-0000"
                value={wedding.groomFatherPhone}
                onChange={(v) => setWedding({ groomFatherPhone: v })}
                inputType="tel"
              />
              <InputField
                label="어머니 연락처"
                placeholder="010-0000-0000"
                value={wedding.groomMotherPhone}
                onChange={(v) => setWedding({ groomMotherPhone: v })}
                inputType="tel"
              />
            </div>

            <p className="text-xs text-gray-400 mb-3 mt-4">신부측</p>
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="아버지 성함"
                placeholder="김대감"
                value={wedding.brideFatherName}
                onChange={(v) => setWedding({ brideFatherName: v })}
              />
              <InputField
                label="어머니 성함"
                placeholder="박부인"
                value={wedding.brideMotherName}
                onChange={(v) => setWedding({ brideMotherName: v })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <InputField
                label="아버지 연락처"
                placeholder="010-0000-0000"
                value={wedding.brideFatherPhone}
                onChange={(v) => setWedding({ brideFatherPhone: v })}
                inputType="tel"
              />
              <InputField
                label="어머니 연락처"
                placeholder="010-0000-0000"
                value={wedding.brideMotherPhone}
                onChange={(v) => setWedding({ brideMotherPhone: v })}
                inputType="tel"
              />
            </div>
          </div>
        </div>
      )}

      {/* 돌잔치 전용 */}
      {type === 'baby' && (
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-700">아기·부모 정보</h3>
          <InputField
            label="아기 이름"
            placeholder="홍아기"
            value={baby.babyName}
            onChange={(v) => setBaby({ babyName: v })}
          />
          <InputField
            label="부모 이름"
            placeholder="홍길동 · 김영희"
            value={baby.parentNames}
            onChange={(v) => setBaby({ parentNames: v })}
          />
          <InputField
            label="부모 연락처"
            placeholder="010-0000-0000"
            value={baby.parentPhone}
            onChange={(v) => setBaby({ parentPhone: v })}
            inputType="tel"
          />
        </div>
      )}

      {/* 공통: 인사말 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <label className="font-bold text-gray-700">인사말</label>
          <button
            onClick={() => setShowGreetingOptions(!showGreetingOptions)}
            className="text-xs text-blue-500 font-medium"
          >
            추천 문구 보기
          </button>
        </div>

        {showGreetingOptions && (
          <div className="mb-3 space-y-2">
            {(greetingTemplates[type] || []).map((tmpl, i) => (
              <button
                key={i}
                onClick={() => {
                  setInfo({ greetingMessage: tmpl });
                  setShowGreetingOptions(false);
                }}
                className="w-full text-left p-3 bg-blue-50 rounded-xl text-sm text-blue-800 hover:bg-blue-100 transition-colors"
              >
                {tmpl}
              </button>
            ))}
          </div>
        )}

        <textarea
          className="w-full p-4 border border-gray-200 rounded-xl text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          rows={5}
          placeholder="초대 인사말을 입력해주세요"
          value={info.greetingMessage}
          onChange={(e) => setInfo({ greetingMessage: e.target.value })}
        />
      </div>

      {/* 공통: 날짜/시간 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-700">날짜 · 시간</h3>
        <InputField
          label="날짜"
          value={info.date}
          onChange={(v) => setInfo({ date: v })}
          inputType="date"
        />
        <InputField
          label="시간"
          value={info.time}
          onChange={(v) => setInfo({ time: v })}
          inputType="time"
        />
      </div>

      {/* 공통: 장소 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-700">장소</h3>
        <InputField
          label="장소 이름"
          placeholder="OO웨딩홀 3층"
          value={info.location}
          onChange={(v) => setInfo({ location: v })}
        />
        <InputField
          label="주소"
          placeholder="서울시 강남구 테헤란로 123"
          value={info.address}
          onChange={(v) => setInfo({ address: v })}
        />
        <InputField
          label="상세주소 (선택)"
          placeholder="3층 그랜드홀"
          value={info.detailAddress}
          onChange={(v) => setInfo({ detailAddress: v })}
        />
        <InputField
          label="교통 안내 (선택)"
          placeholder="예) 2호선 강남역 4번 출구 도보 7분"
          value={info.transportation || ''}
          onChange={(v) => setInfo({ transportation: v })}
        />
        <InputField
          label="주차 안내 (선택)"
          placeholder="예) 건물 지하 주차장 2시간 무료"
          value={info.parkingInfo || ''}
          onChange={(v) => setInfo({ parkingInfo: v })}
        />
        <p className="text-xs text-gray-400">
          주소를 입력하면 지도가 자동으로 표시되고, 교통/주차 안내를 적으면 하객이 더 쉽게 찾아와요.
        </p>
      </div>

      {/* 공통: 연락처 (결혼식 외) */}
      {type !== 'wedding' && type !== 'baby' && (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <InputField
            label="연락처"
            placeholder="010-0000-0000"
            value={info.phone}
            onChange={(v) => setInfo({ phone: v })}
            inputType="tel"
          />
        </div>
      )}

      {/* 공통: 사진 갤러리 */}
      <PhotoUploader />
    </div>
  );
}

// 사진 업로더 컴포넌트
function PhotoUploader() {
  const {
    photos,
    addPhoto,
    removePhoto,
    photoProtection,
    setPhotoProtection,
  } = useInvitationStore();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    const availableSlots = Math.max(20 - photos.length, 0);
    if (availableSlots === 0) {
      e.target.value = '';
      return;
    }

    files.slice(0, availableSlots).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        addPhoto({
          file: file,
          preview: reader.result,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    });
    // input 초기화
    e.target.value = '';
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="font-bold text-gray-700 mb-1">사진 갤러리</h3>
      <p className="text-xs text-gray-400 mb-4">최대 20장까지 업로드할 수 있어요</p>
      {photos.length === 0 && (
        <p className="text-xs text-gray-500 mb-4">
          사진이 없어도 초대장은 완성됩니다. 필요하면 나중에 추가해도 돼요.
        </p>
      )}

      <div className="grid grid-cols-3 gap-2">
        {/* 업로드된 사진들 */}
        {photos.map((photo, index) => (
          <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
            <img
              src={photo.preview}
              alt={photo.name}
              className="w-full h-full object-cover"
              onContextMenu={(e) => photoProtection && e.preventDefault()}
              onDragStart={(e) => photoProtection && e.preventDefault()}
            />
            <button
              onClick={() => removePhoto(index)}
              className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center"
            >
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}

        {/* 추가 버튼 */}
        {photos.length < 20 && (
          <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs text-gray-400 mt-1">{photos.length}/20</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>

      <button
        type="button"
        aria-pressed={photoProtection}
        onClick={() => setPhotoProtection(!photoProtection)}
        className="mt-4 w-full rounded-xl border border-gray-200 p-3 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">사진 확대/저장 방지</span>
          <span
            className={`text-xs font-semibold ${photoProtection ? 'text-blue-600' : 'text-gray-400'}`}
          >
            {photoProtection ? 'ON' : 'OFF'}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          받는 분이 사진을 길게 눌러 저장하는 것을 줄여줘요.
        </p>
      </button>
    </div>
  );
}

// 재사용 입력 필드
function InputField({ label, placeholder, value, onChange, inputType = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400"
      />
    </div>
  );
}
