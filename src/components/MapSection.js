'use client';

import { useEffect, useRef, useState } from 'react';

export default function MapSection({ address, locationName }) {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // 카카오맵 SDK 로드
    // API키가 없을 때는 구글맵 임베드로 대체
    if (!address) return;

    const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

    if (KAKAO_KEY) {
      // 카카오맵 사용
      loadKakaoMap(KAKAO_KEY);
    } else {
      // API키 없으면 구글맵 임베드 (무료)
      setMapLoaded(true);
    }
  }, [address]);

  const loadKakaoMap = (key) => {
    if (window.kakao && window.kakao.maps) {
      initKakaoMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&libraries=services&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        initKakaoMap();
      });
    };
    document.head.appendChild(script);
  };

  const initKakaoMap = () => {
    if (!mapRef.current) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: coords,
          level: 3,
        });

        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${locationName || address}</div>`,
        });
        infowindow.open(map, marker);

        setMapLoaded(true);
      }
    });
  };

  // 네비 앱으로 길찾기
  const openNavi = (app) => {
    const encodedAddress = encodeURIComponent(address);
    const encodedName = encodeURIComponent(locationName || address);

    switch (app) {
      case 'kakao':
        window.open(`https://map.kakao.com/link/search/${encodedAddress}`);
        break;
      case 'naver':
        window.open(`https://map.naver.com/v5/search/${encodedAddress}`);
        break;
      default:
        window.open(`https://www.google.com/maps/search/${encodedAddress}`);
    }
  };

  // 주소 복사
  const copyAddress = () => {
    navigator.clipboard.writeText(address).then(() => {
      alert('주소가 복사되었습니다!');
    });
  };

  const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">오시는 길</h2>
      </div>

      {/* 지도 영역 */}
      <div className="rounded-2xl overflow-hidden shadow-sm mb-4">
        {KAKAO_KEY ? (
          <div ref={mapRef} className="w-full h-64 bg-gray-100" />
        ) : (
          // API키 없을 때 구글맵 임베드
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed&z=16`}
            className="w-full h-64 border-0"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>

      {/* 주소 표시 + 복사 */}
      <div className="bg-white/80 rounded-2xl p-4 shadow-sm mb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-800">{locationName}</p>
            <p className="text-xs text-gray-500 mt-1">{address}</p>
          </div>
          <button
            onClick={copyAddress}
            className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs text-gray-600 font-medium"
          >
            주소복사
          </button>
        </div>
      </div>

      {/* 네비앱 바로가기 */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => openNavi('kakao')}
          className="bg-white/80 rounded-xl py-3 shadow-sm text-center"
        >
          <div className="text-xl mb-1">🗺️</div>
          <p className="text-xs text-gray-600 font-medium">카카오맵</p>
        </button>
        <button
          onClick={() => openNavi('naver')}
          className="bg-white/80 rounded-xl py-3 shadow-sm text-center"
        >
          <div className="text-xl mb-1">🟢</div>
          <p className="text-xs text-gray-600 font-medium">네이버지도</p>
        </button>
        <button
          onClick={() => openNavi('default')}
          className="bg-white/80 rounded-xl py-3 shadow-sm text-center"
        >
          <div className="text-xl mb-1">📍</div>
          <p className="text-xs text-gray-600 font-medium">구글지도</p>
        </button>
      </div>
    </div>
  );
}
