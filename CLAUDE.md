# TaskFlow — Supabase 기반 할 일 관리 앱

Next.js + Supabase 공식 스타터 위에 구축하는 개인용 할 일 관리 앱.

## 프로젝트 문서

@docs/PRD.md
@docs/ROADMAP.md
@docs/next-js.md
@docs/supabase.md
@docs/coding-style.md

## 기술 스택
- **Frontend**: Next.js (App Router), TypeScript
- **인증/DB**: Supabase (Auth + Postgres, `@supabase/ssr`)
- **Styling**: Tailwind CSS, shadcn/ui
- **배포**: Vercel

## 폴더 구조
```
nextjs-supabase-starter/
├── app/
│   ├── auth/              # 로그인/회원가입/비밀번호 재설정
│   ├── protected/         # 로그인 필수 페이지 (tasks 등 신규 기능은 이 하위에 추가)
│   └── page.tsx           # 랜딩 페이지
├── components/
│   ├── ui/                # shadcn/ui 기본 컴포넌트
│   └── *.tsx              # 인증 폼, 헤더 등
├── lib/
│   └── supabase/
│       ├── client.ts      # 클라이언트 컴포넌트용
│       └── server.ts      # 서버 컴포넌트용
├── supabase/
│   └── migrations/        # DB 스키마 변경 이력
├── types/
│   └── database.ts        # Supabase 테이블 타입
└── docs/                  # PRD, 로드맵, 기술 가이드
```

## 핵심 규칙
1. **RLS 없는 테이블 금지** — 새 테이블은 반드시 RLS 정책과 함께 커밋 ([[docs/supabase.md]] 참고)
2. **서버 컴포넌트 우선** — 상호작용 필요한 부분만 최소 단위로 클라이언트 컴포넌트 분리
3. **골격 → 공통(DB/RLS) → 핵심 기능 → 확장** 순서로 개발 ([[docs/ROADMAP.md]] 참고)
4. `.env.local`은 절대 커밋하지 않음 (이미 `.gitignore`에 포함)

## 개발 도구
- 커스텀 커맨드: `/add-page`, `/db-migration`, `/review-security`
- 서브에이전트: `code-reviewer`, `debugger`, `db-schema-reviewer`
- MCP 서버: `context7`(라이브러리 문서 조회), `supabase`(스키마/DB 조회), `playwright`(브라우저 테스트)

## 환경 변수
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```
`.env.example` 참고. Supabase MCP를 쓰려면 `SUPABASE_PROJECT_REF`, `SUPABASE_ACCESS_TOKEN` 환경 변수도 셸에 설정 필요 (`.mcp.json`에서 `${}`로 참조, 하드코딩 금지).
