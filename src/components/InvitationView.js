'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import MapSection from './MapSection';
import QRSection from './QRSection';
import AccountSection from './AccountSection';
import RSVPSection from './RSVPSection';

export default function InvitationView({ data, isPreview = false }) {
  const {
    type, info, wedding, baby, accounts,
    selectedDesign, photos, showQR, useRSVP,
    photoProtection, useKakaoPay, kakaoPayLink
  } = data;

  const design = selectedDesign || {
    fontColor: '#333333',
    accentColor: '#e8a0bf',
    name: '기본',
  };

  // 날짜 포맷
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${days[d.getDay()]}요일`;
  };

  // D-day 계산
  const calcDday = (dateStr) => {
    if (!dateStr) return '';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr);
    target.setHours(0, 0, 0, 0);
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'D-Day';
    if (diff > 0) return `D-${diff}`;
    return `D+${Math.abs(diff)}`;
  };

  const blockImageAction = (e) => {
    if (!photoProtection) return;
    e.preventDefault();
  };

  const normalizedKakaoPayLink = kakaoPayLink
    ? (/^https?:\/\//i.test(kakaoPayLink) ? kakaoPayLink : `https://${kakaoPayLink}`)
    : '';

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(180deg, ${design.accentColor}11 0%, white 30%, white 70%, ${design.accentColor}11 100%)`,
      }}
    >
      {/* ===== 메인 섹션 ===== */}
      <section className="text-center pt-16 pb-12 px-6">
        {/* 장식 라인 */}
        <div className="w-12 h-0.5 mx-auto mb-6" style={{ backgroundColor: design.accentColor }} />

        {/* 제목 */}
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: design.fontColor }}
        >
          {info.title || '초대합니다'}
        </h1>

        {/* 결혼식: 신랑·신부 이름 */}
        {type === 'wedding' && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="text-xl font-medium" style={{ color: design.fontColor }}>
              {wedding.groomName || '신랑'}
            </span>
            <span style={{ color: design.accentColor }} className="text-2xl">&</span>
            <span className="text-xl font-medium" style={{ color: design.fontColor }}>
              {wedding.brideName || '신부'}
            </span>
          </div>
        )}

        {/* 돌잔치: 아기 이름 */}
        {type === 'baby' && (
          <p className="text-xl font-medium mt-4" style={{ color: design.fontColor }}>
            {baby.babyName || '우리 아기'}의 첫 번째 생일
          </p>
        )}

        {/* 날짜 */}
        {info.date && (
          <div className="mt-6">
            <p className="text-sm" style={{ color: design.fontColor + 'aa' }}>
              {formatDate(info.date)}
            </p>
            <p
              className="inline-block mt-2 px-4 py-1 rounded-full text-sm font-bold"
              style={{
                backgroundColor: design.accentColor + '22',
                color: design.accentColor,
              }}
            >
              {calcDday(info.date)}
            </p>
          </div>
        )}

        <div className="w-12 h-0.5 mx-auto mt-8" style={{ backgroundColor: design.accentColor }} />
      </section>

      {/* ===== 메인 사진 (첫번째 사진) ===== */}
      {photos.length > 0 && (
        <section className="px-6 pb-12">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={photos[0].preview}
              alt="메인 사진"
              className="w-full aspect-[4/5] object-cover"
              onContextMenu={blockImageAction}
              onDragStart={blockImageAction}
            />
          </div>
        </section>
      )}

      {/* ===== 인사말 ===== */}
      {info.greetingMessage && (
        <section className="px-6 pb-12">
          <div className="bg-white/80 rounded-2xl p-8 text-center shadow-sm">
            <p
              className="text-sm leading-7 whitespace-pre-line"
              style={{ color: design.fontColor }}
            >
              {info.greetingMessage}
            </p>
          </div>
        </section>
      )}

      {/* ===== 결혼식: 혼주 정보 ===== */}
      {type === 'wedding' && (
        <section className="px-6 pb-12">
          <div className="bg-white/80 rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div>
                <p className="text-xs mb-2" style={{ color: design.accentColor }}>신랑측</p>
                <p style={{ color: design.fontColor }}>
                  {wedding.groomFatherName && <span>{wedding.groomFatherName} · </span>}
                  {wedding.groomMotherName && <span>{wedding.groomMotherName}</span>}
                </p>
                <p className="font-bold mt-1" style={{ color: design.fontColor }}>
                  의 아들 {wedding.groomName}
                </p>
              </div>
              <div>
                <p className="text-xs mb-2" style={{ color: design.accentColor }}>신부측</p>
                <p style={{ color: design.fontColor }}>
                  {wedding.brideFatherName && <span>{wedding.brideFatherName} · </span>}
                  {wedding.brideMotherName && <span>{wedding.brideMotherName}</span>}
                </p>
                <p className="font-bold mt-1" style={{ color: design.fontColor }}>
                  의 딸 {wedding.brideName}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== 예식/행사 정보 ===== */}
      <section className="px-6 pb-12">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold" style={{ color: design.fontColor }}>
            {type === 'wedding' ? '예식 안내' : '행사 안내'}
          </h2>
        </div>
        <div className="bg-white/80 rounded-2xl p-6 shadow-sm text-center space-y-3">
          <p className="text-sm" style={{ color: design.fontColor }}>
            {formatDate(info.date)}
          </p>
          {info.time && (
            <p className="text-sm" style={{ color: design.fontColor }}>
              {info.time}
            </p>
          )}
          <div className="w-8 h-0.5 mx-auto" style={{ backgroundColor: design.accentColor + '44' }} />
          <p className="font-bold" style={{ color: design.fontColor }}>
            {info.location}
          </p>
          <p className="text-xs" style={{ color: design.fontColor + '88' }}>
            {info.address} {info.detailAddress}
          </p>
        </div>
      </section>

      {/* ===== 지도 ===== */}
      {info.address && (
        <section className="px-6 pb-12">
          <MapSection address={info.address} locationName={info.location} />
          {(info.transportation || info.parkingInfo) && (
            <div className="grid gap-3 mt-4">
              {info.transportation && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-xs font-semibold mb-1" style={{ color: design.accentColor }}>
                    대중교통 안내
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{info.transportation}</p>
                </div>
              )}
              {info.parkingInfo && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-xs font-semibold mb-1" style={{ color: design.accentColor }}>
                    주차 안내
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{info.parkingInfo}</p>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* ===== 갤러리 ===== */}
      {photos.length > 1 && (
        <section className="pb-12">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold" style={{ color: design.fontColor }}>
              갤러리
            </h2>
          </div>
          <div className="px-6">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              spaceBetween={12}
              slidesPerView={1}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              {photos.map((photo, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={photo.preview}
                    alt={`갤러리 ${index + 1}`}
                    className="w-full aspect-[4/5] object-cover"
                    onContextMenu={blockImageAction}
                    onDragStart={blockImageAction}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* ===== 연락처 ===== */}
      <section className="px-6 pb-12">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold" style={{ color: design.fontColor }}>연락하기</h2>
        </div>
        <div className="space-y-3">
          {type === 'wedding' ? (
            <>
              <ContactCard label="신랑" name={wedding.groomName} phone={wedding.groomPhone} color={design.accentColor} />
              <ContactCard label="신부" name={wedding.brideName} phone={wedding.bridePhone} color={design.accentColor} />
              {wedding.groomFatherPhone && <ContactCard label="신랑 아버지" name={wedding.groomFatherName} phone={wedding.groomFatherPhone} color={design.accentColor} />}
              {wedding.groomMotherPhone && <ContactCard label="신랑 어머니" name={wedding.groomMotherName} phone={wedding.groomMotherPhone} color={design.accentColor} />}
              {wedding.brideFatherPhone && <ContactCard label="신부 아버지" name={wedding.brideFatherName} phone={wedding.brideFatherPhone} color={design.accentColor} />}
              {wedding.brideMotherPhone && <ContactCard label="신부 어머니" name={wedding.brideMotherName} phone={wedding.brideMotherPhone} color={design.accentColor} />}
            </>
          ) : type === 'baby' ? (
            <ContactCard label="부모" name={baby.parentNames} phone={baby.parentPhone} color={design.accentColor} />
          ) : (
            <ContactCard label="연락처" name="" phone={info.phone} color={design.accentColor} />
          )}
        </div>
      </section>

      {/* ===== 계좌번호 ===== */}
      {accounts.length > 0 && (
        <section className="px-6 pb-12">
          <AccountSection accounts={accounts} design={design} />
        </section>
      )}

      {/* ===== 카카오페이 ===== */}
      {useKakaoPay && normalizedKakaoPayLink && (
        <section className="px-6 pb-12">
          <div className="bg-white/90 rounded-2xl p-6 shadow-sm text-center">
            <h2 className="text-lg font-bold mb-2" style={{ color: design.fontColor }}>
              간편 송금
            </h2>
            <p className="text-sm mb-4" style={{ color: design.fontColor + 'aa' }}>
              카카오페이 링크로 편하게 마음을 전하실 수 있어요.
            </p>
            <a
              href={normalizedKakaoPayLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-sm text-yellow-900 bg-yellow-300 hover:bg-yellow-400 transition-colors"
            >
              카카오페이 송금하기
            </a>
          </div>
        </section>
      )}

      {/* ===== QR코드 ===== */}
      {showQR && (
        <section className="px-6 pb-12">
          <QRSection design={design} isPreview={isPreview} />
        </section>
      )}

      {/* ===== 참석여부 ===== */}
      {useRSVP && (
        <section className="px-6 pb-12">
          <RSVPSection design={design} isPreview={isPreview} />
        </section>
      )}

      {/* ===== 엔딩 ===== */}
      <section className="text-center py-16 px-6">
        <div className="w-12 h-0.5 mx-auto mb-6" style={{ backgroundColor: design.accentColor }} />
        <p className="text-sm" style={{ color: design.fontColor + '88' }}>
          소중한 분들을 초대합니다
        </p>
        <div className="w-12 h-0.5 mx-auto mt-6" style={{ backgroundColor: design.accentColor }} />
      </section>
    </div>
  );
}

// 연락처 카드
function ContactCard({ label, name, phone, color }) {
  if (!phone) return null;

  return (
    <div className="bg-white/80 rounded-2xl p-4 shadow-sm flex items-center justify-between">
      <div>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: color + '22', color: color }}
        >
          {label}
        </span>
        {name && <span className="text-sm font-medium text-gray-800 ml-2">{name}</span>}
      </div>
      <div className="flex gap-2">
        <a
          href={`tel:${phone}`}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: color + '22' }}
        >
          <svg className="w-5 h-5" style={{ color: color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
        <a
          href={`sms:${phone}`}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: color + '22' }}
        >
          <svg className="w-5 h-5" style={{ color: color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
