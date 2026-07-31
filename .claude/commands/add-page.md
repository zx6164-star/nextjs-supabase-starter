---
description: Supabase 연동 페이지를 새로 추가합니다
---

다음 순서로 새 페이지를 추가하세요: $ARGUMENTS

1. `app/<경로>/page.tsx` 생성 — 서버 컴포넌트 기본, 데이터 조회가 필요하면 `lib/supabase/server.ts`의 `createClient()` 사용
2. 인증이 필요한 페이지라면 `app/protected/` 하위에 배치하고 `app/protected/layout.tsx`의 가드를 따름
3. 클라이언트 상호작용(폼 제출, 상태 변경)이 필요하면 별도 `"use client"` 컴포넌트로 분리해 `components/`에 배치
4. Tailwind CSS로 스타일링, 기존 `components/ui/*` (shadcn/ui) 우선 재사용
5. 완료 후 `npm run build`로 타입 에러와 빌드 성공 여부 확인
