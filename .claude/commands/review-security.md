---
description: 배포 전 인증/RLS 보안 점검을 수행합니다
---

배포 전 다음 항목을 점검하고 문제를 발견하면 파일:라인과 함께 보고하세요.

1. 모든 Supabase 테이블에 RLS가 활성화되어 있는가 (`enable row level security` 누락 여부)
2. `service_role` 키가 클라이언트 코드(`"use client"` 파일, `lib/supabase/client.ts`)에 노출되지 않았는가
3. `app/protected/*` 페이지가 실제로 세션 체크 후 미인증 시 리다이렉트하는가
4. 서버 액션/라우트 핸들러에서 사용자 입력을 그대로 쿼리에 사용하는 곳은 없는가
5. `.env.local`이 커밋 이력에 포함된 적 없는가 (`git log --all --full-history -- .env.local`)
6. API 키, 토큰 등이 코드에 하드코딩되어 있지 않은가
