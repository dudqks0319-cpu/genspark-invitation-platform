# 모바일 초대장 플랫폼

결혼식 · 돌잔치 · 칠순 · 집들이 · 파티 등 모바일 초대장을 만들고 카카오톡으로 공유할 수 있는 Next.js 초대장 플랫폼 샘플입니다.

## 주요 기능

- 5가지 초대장 종류: 결혼식, 돌잔치, 칠순/팔순, 집들이, 결혼전 모임
- 종류별 디자인 템플릿(무료/프리미엄)
- 지도, QR코드, 계좌번호, RSVP(참석/불참)
- 사진 갤러리 슬라이드(최대 20장)
- 카카오톡 공유 버튼

## 시작하기

```bash
npm install
npm run dev
```


## 🎨 Google Stitch MCP 연동

이 프로젝트는 Google Stitch MCP를 통해 AI 기반 UI 디자인 자동화를 지원합니다.

### MCP란?

MCP(Model Context Protocol)는 AI 에이전트가 외부 도구와 통신할 수 있도록 하는 오픈 프로토콜입니다.
Google Stitch MCP를 연결하면 Claude Code, Cursor 등의 AI 에디터에서 텍스트 프롬프트만으로
전문가급 UI 디자인을 자동 생성할 수 있습니다.

### 설치 방법

#### 1. Google Cloud CLI 설치

```bash
# macOS (Homebrew)
brew install --cask google-cloud-sdk

# 또는 직접 설치
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

#### 2. Google Cloud 인증

```bash
# Google Cloud 로그인
gcloud auth login

# 프로젝트 설정
gcloud config set project YOUR_PROJECT_ID
gcloud auth application-default set-quota-project YOUR_PROJECT_ID

# Stitch API 활성화
gcloud beta services mcp enable stitch.googleapis.com --project=YOUR_PROJECT_ID

# 인증 설정
gcloud auth application-default login
```

#### 3. MCP 서버 설정

프로젝트 루트의 `.mcp.json` 파일이 이미 구성되어 있습니다.

```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["-y", "stitch-mcp-auto"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "YOUR_GOOGLE_CLOUD_PROJECT_ID"
      }
    }
  }
}
```

**YOUR_GOOGLE_CLOUD_PROJECT_ID**를 실제 Google Cloud Project ID로 교체하세요.

### Claude Code에서 사용하기

```bash
# Claude Code에 MCP 서버 추가
claude mcp add stitch --config .mcp.json

# Claude Code 재시작 후 사용
# 예시: "로그인 화면 디자인 생성해줘"
```

### Cursor에서 사용하기

1. **Settings > MCP > Add New Server** 클릭
2. 다음 정보 입력:
   - Command: `npx`
   - Args: `-y stitch-mcp-auto`
   - Environment: `GOOGLE_CLOUD_PROJECT=YOUR_PROJECT_ID`

### 주요 기능

- ✨ **AI 디자인 생성**: 텍스트 프롬프트로 프로페셔널 UI 자동 생성
- 🎯 **디자인 일관성**: 기존 디자인 시스템 분석 및 일관된 스타일 유지
- 🔄 **반응형 변형**: 다양한 디바이스 대응 레이아웃 자동 생성
- 📦 **디자인 토큰**: CSS Variables, Tailwind Config 자동 추출
- ♿ **접근성 검사**: WCAG 기준 자동 검사 및 개선 제안

### 사용 예시

```
# Claude Code나 Cursor에서:
"초대장 플랫폼에 글라스모피즘 스타일의 프리미엄 결혼식 템플릿을 추가해줘.
그라디언트 메쉬 배경과 부드러운 그림자 효과를 적용해."
```

Stitch MCP가 자동으로:
1. 디자인 생성
2. 코드 생성 (React + Tailwind CSS)
3. 접근성 검사
4. 디자인 토큰 추출

### 트러블슈팅

**"Stitch API has not been used in project" 오류**
```bash
gcloud beta services mcp enable stitch.googleapis.com --project=YOUR_PROJECT_ID
```

**"Permission denied" 오류**
```bash
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="user:YOUR_EMAIL" \
  --role="roles/serviceusage.serviceUsageConsumer"
```

### 참고 자료

- [Google Stitch 공식 문서](https://stitch.withgoogle.com/docs/mcp/setup)
- [Stitch MCP GitHub](https://github.com/greensheep01201/stitch-mcp-auto)
- [MCP 프로토콜 스펙](https://modelcontextprotocol.io)

---

## 🎨 디자인 개선 사항 (Stitch 트렌드 반영)

### Glassmorphism 효과
- 반투명 배경 + 블러 효과로 현대적인 느낌 연출
- `backdrop-blur-md`, `bg-white/80` 활용

### 그라디언트 메쉬
- 부드러운 다중 그라디언트로 생동감 표현
- `linear-gradient()` 다층 구조

### 세련된 카드 UI
- 큰 border-radius (`rounded-2xl`, `rounded-3xl`)
- 미묘한 그림자 (`shadow-sm`, `shadow-lg`)
- 호버 시 부드러운 전환 효과

### 개선된 타이포그래피
- 명확한 계층 구조
- 가독성 높은 색상 대비
- 다국어 지원 폰트 스택
