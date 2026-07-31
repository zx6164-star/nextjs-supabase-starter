---
description: Supabase 테이블/RLS 정책 마이그레이션을 작성합니다
---

다음 요구사항으로 Supabase 마이그레이션을 작성하세요: $ARGUMENTS

1. `supabase/migrations/<timestamp>_<설명>.sql` 파일 생성
2. 테이블 정의에 `id uuid primary key default gen_random_uuid()`, `user_id uuid references auth.users`, `created_at timestamptz default now()` 기본 포함
3. 반드시 `alter table ... enable row level security;` 추가
4. RLS 정책은 최소 4개 작성: select/insert/update/delete 각각 `auth.uid() = user_id` 기준으로 본인 데이터만 접근 가능하게 제한
5. `types/database.ts`에 대응하는 TypeScript 타입 갱신
6. 마이그레이션 적용 후 Supabase MCP나 대시보드에서 RLS가 실제로 걸리는지 확인 (다른 사용자로 접근 시 차단되는지)
