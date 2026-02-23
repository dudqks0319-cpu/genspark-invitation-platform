'use client';

import Link from 'next/link';

export default function Home() {
  const invitationTypes = [
    {
      id: 'wedding',
      title: '결혼식',
      emoji: '💍',
      description: '소중한 두 사람의 시작을 알려보세요',
      color: 'from-pink-400 to-rose-500',
    },
    {
      id: 'baby',
      title: '돌잔치',
      emoji: '👶',
      description: '아이의 첫 번째 생일을 함께해요',
      color: 'from-yellow-300 to-orange-400',
    },
    {
      id: 'seventieth',
      title: '칠순·팔순',
      emoji: '🎊',
      description: '어르신의 장수를 축하해요',
      color: 'from-red-400 to-red-600',
    },
    {
      id: 'housewarming',
      title: '집들이',
      emoji: '🏠',
      description: '새 보금자리에 초대합니다',
      color: 'from-green-400 to-emerald-500',
    },
    {
      id: 'party',
      title: '결혼전 모임',
      emoji: '🥂',
      description: '특별한 날을 함께 축하해요',
      color: 'from-purple-400 to-violet-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 헤더 */}
      <header className="text-center pt-16 pb-12 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          초대장을 만들어보세요
        </h1>
        <p className="text-lg text-gray-500">
          3분이면 완성! 예쁜 모바일 초대장
        </p>
      </header>

      {/* 초대장 종류 선택 */}
      <main className="max-w-md mx-auto px-4 pb-20">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          어떤 초대장을 만드시겠어요?
        </h2>

        <div className="space-y-4">
          {invitationTypes.map((type) => (
            <Link
              key={type.id}
              href={`/create?type=${type.id}`}
              className="block"
            >
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 flex items-center gap-4 border border-gray-100 hover:border-gray-200 active:scale-[0.98]">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center text-2xl shadow-sm`}
                >
                  {type.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">
                    {type.title}
                  </h3>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* 하단 안내 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            기본 디자인 무료 · 프리미엄 디자인 유료
          </p>
        </div>
      </main>
    </div>
  );
}
