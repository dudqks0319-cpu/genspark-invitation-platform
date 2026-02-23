import { create } from 'zustand';

// 비유: 사용자가 입력한 정보를 임시로 기억해두는 메모장
const useInvitationStore = create((set) => ({
  // 초대장 종류
  type: '',

  // 기본 정보
  info: {
    title: '',
    greetingMessage: '',
    date: '',
    time: '',
    location: '',
    address: '',
    detailAddress: '',
    transportation: '',
    parkingInfo: '',
    phone: '',
  },

  // 결혼식 전용
  wedding: {
    groomName: '',
    brideName: '',
    groomPhone: '',
    bridePhone: '',
    groomFatherName: '',
    groomMotherName: '',
    brideFatherName: '',
    brideMotherName: '',
    groomFatherPhone: '',
    groomMotherPhone: '',
    brideFatherPhone: '',
    brideMotherPhone: '',
  },

  // 돌잔치 전용
  baby: {
    babyName: '',
    parentNames: '',
    parentPhone: '',
  },

  // 계좌 정보
  accounts: [],

  // 디자인 선택
  selectedDesign: null,
  isPremium: false,

  // 갤러리 사진
  photos: [],

  // QR코드 표시 여부
  showQR: true,

  // RSVP 사용 여부
  useRSVP: true,

  // 사진 보호 (롱프레스/우클릭 방지)
  photoProtection: false,

  // 카카오페이 링크
  useKakaoPay: false,
  kakaoPayLink: '',

  // 액션들 (정보를 변경하는 함수들)
  setType: (type) => set({ type }),
  setInfo: (info) =>
    set((state) => ({
      info: { ...state.info, ...info },
    })),
  setWedding: (wedding) =>
    set((state) => ({
      wedding: { ...state.wedding, ...wedding },
    })),
  setBaby: (baby) =>
    set((state) => ({
      baby: { ...state.baby, ...baby },
    })),
  addAccount: (account) =>
    set((state) => ({
      accounts: [...state.accounts, account],
    })),
  removeAccount: (index) =>
    set((state) => ({
      accounts: state.accounts.filter((_, i) => i !== index),
    })),
  setSelectedDesign: (design) => set({ selectedDesign: design }),
  setIsPremium: (isPremium) => set({ isPremium }),

  addPhoto: (photo) =>
    set((state) => ({
      photos: [...state.photos, photo],
    })),
  removePhoto: (index) =>
    set((state) => ({
      photos: state.photos.filter((_, i) => i !== index),
    })),
  setShowQR: (showQR) => set({ showQR }),
  setUseRSVP: (useRSVP) => set({ useRSVP }),
  setPhotoProtection: (photoProtection) => set({ photoProtection }),
  setUseKakaoPay: (useKakaoPay) => set({ useKakaoPay }),
  setKakaoPayLink: (kakaoPayLink) => set({ kakaoPayLink }),

  // 전체 초기화
  reset: () =>
    set({
      type: '',
      info: {
        title: '',
        greetingMessage: '',
        date: '',
        time: '',
        location: '',
        address: '',
        detailAddress: '',
        transportation: '',
        parkingInfo: '',
        phone: '',
      },
      wedding: {
        groomName: '',
        brideName: '',
        groomPhone: '',
        bridePhone: '',
        groomFatherName: '',
        groomMotherName: '',
        brideFatherName: '',
        brideMotherName: '',
        groomFatherPhone: '',
        groomMotherPhone: '',
        brideFatherPhone: '',
        brideMotherPhone: '',
      },
      baby: {
        babyName: '',
        parentNames: '',
        parentPhone: '',
      },
      accounts: [],
      selectedDesign: null,
      isPremium: false,
      photos: [],
      showQR: true,
      useRSVP: true,
      photoProtection: false,
      useKakaoPay: false,
      kakaoPayLink: '',
    }),
}));

export default useInvitationStore;
