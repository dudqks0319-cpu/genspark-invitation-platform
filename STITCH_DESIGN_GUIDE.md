# 🎨 Stitch 디자인 스타일 가이드

Stitch MCP를 활용해 생성할 수 있는 현대적인 UI 디자인 가이드입니다.

## 1. Glassmorphism (글라스모피즘)

초대장 배경이나 카드 요소에 투명도와 블러 효과를 적용하여 세련된 느낌을 줍니다.

- **Background**: `bg-white/70` 또는 `bg-white/80`
- **Blur**: `backdrop-blur-md` 또는 `backdrop-blur-lg`
docs: Stitch 디자인 스타일 가이드 추가 (STITCH_DESIGN_GUIDE.md)- **Shadow**: `shadow-xl`

## 2. Gradient Mesh (그라디언트 메쉬)

단순한 배경 대신 여러 색상이 섞인 부드러운 배경을 사용합니다.

```css
background: radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%),
            radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%),
            radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
```

## 3. Bento Grid (벤토 그리드)

다양한 크기의 카드를 조화롭게 배치하여 정보를 한눈에 보여줍니다.

- **Layout**: `grid grid-cols-1 md:grid-cols-3 gap-4`
- **Card**: `rounded-3xl p-6 bg-white shadow-sm hover:shadow-md transition-all`

## 4. Typography (타이포그래피)

- **Main Heading**: `text-4xl font-extrabold tracking-tight`
- **Body**: `text-base text-gray-600 leading-relaxed`
- **Accent**: `text-indigo-600 font-semibold`

## 5. Micro-interactions (마이크로 인터랙션)

- **Hover**: `hover:scale-[1.02] active:scale-[0.98]`
- **Transition**: `transition-all duration-300 ease-out`
