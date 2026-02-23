import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: '모바일 초대장 | 쉽고 예쁜 초대장 만들기',
  description: '결혼식, 돌잔치, 칠순, 집들이 등 모바일 초대장을 무료로 만들어보세요',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* 카카오 SDK */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
