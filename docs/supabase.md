# Supabase 사용 가이드

## 클라이언트 사용 구분
| 위치 | 사용 함수 | 파일 |
|------|----------|------|
| 서버 컴포넌트, 서버 액션 | `createClient()` | `lib/supabase/server.ts` |
| 클라이언트 컴포넌트 (`"use client"`) | `createClient()` | `lib/supabase/client.ts` |

두 함수는 이름은 같지만 다른 모듈이므로 import 경로를 반드시 확인할 것.

## 인증 (Auth)
- 쿠키 기반 세션 관리는 `@supabase/ssr`이 자동 처리
- 보호된 페이지는 `app/protected/layout.tsx` 패턴을 따라 세션 체크 후 리다이렉트
- 인증 관련 UI 변경 시 `components/login-form.tsx`, `sign-up-form.tsx`, `forgot-password-form.tsx` 참고

## Row Level Security (RLS) — 필수
- **모든 신규 테이블은 생성 즉시 RLS를 활성화한다.** 예외 없음
- 기본 정책 템플릿:
  ```sql
  alter table tasks enable row level security;

  create policy "본인 데이터만 조회" on tasks
    for select using (auth.uid() = user_id);

  create policy "본인 이름으로만 생성" on tasks
    for insert with check (auth.uid() = user_id);

  create policy "본인 데이터만 수정" on tasks
    for update using (auth.uid() = user_id);

  create policy "본인 데이터만 삭제" on tasks
    for delete using (auth.uid() = user_id);
  ```
- RLS 정책 없이 배포된 테이블은 다른 사용자가 전체 데이터를 읽을 수 있는 심각한 보안 결함이 됨

## 환경 변수
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`는 `.env.local`에서 관리 (커밋 금지)
- `service_role` 키는 절대 클라이언트 코드나 `NEXT_PUBLIC_*` 변수로 노출하지 않음

## 마이그레이션
- 스키마 변경은 `supabase/migrations/`에 SQL 파일로 기록 (타임스탬프 접두사)
- 마이그레이션 작성 시 `/db-migration` 커스텀 커맨드 사용
