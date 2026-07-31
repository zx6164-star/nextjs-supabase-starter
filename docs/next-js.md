# Next.js 규칙

## App Router 원칙
- `app/` 하위 컴포넌트는 기본적으로 **서버 컴포넌트**. 브라우저 API, 이벤트 핸들러, `useState`/`useEffect`가 필요할 때만 파일 최상단에 `"use client"` 선언
- 데이터 조회는 서버 컴포넌트에서 직접 수행 (클라이언트에서 `useEffect`로 fetch하지 않음)
- 상호작용이 필요한 부분만 최소 단위로 클라이언트 컴포넌트로 분리해 `components/`에 배치

## 라우트 구조
- `app/auth/*` — 인증 관련 페이지 (로그인/회원가입/비밀번호 재설정)
- `app/protected/*` — 로그인 필수 페이지. `app/protected/layout.tsx`에서 세션 체크 후 미인증 시 `/auth/login`으로 리다이렉트
- 새 보호된 기능은 `app/protected/<기능명>/page.tsx`로 추가

## 데이터 페칭
- Supabase 조회는 서버 컴포넌트에서 `lib/supabase/server.ts`의 `createClient()` 사용
- 클라이언트 상호작용(폼 제출 등)은 `lib/supabase/client.ts`의 `createClient()` 사용
- 두 클라이언트를 컨텍스트에 맞지 않게 섞어 쓰지 않음

## 스타일링
- Tailwind CSS 유틸리티 클래스 우선
- 재사용 UI는 `components/ui/*` (shadcn/ui) 우선 사용, 없으면 `npx shadcn@latest add <component>`로 추가
