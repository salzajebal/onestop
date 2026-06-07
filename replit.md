# 퍼펙트론

대출 상담 신청 랜딩페이지 + 실시간 관리자 시스템

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — API 서버 실행 (port 5000)
- `pnpm --filter @workspace/perfectron run dev` — 프론트엔드 실행
- `pnpm run typecheck` — 전체 타입체크
- `pnpm run build` — 빌드
- `pnpm --filter @workspace/api-spec run codegen` — OpenAPI 코드젠 재실행
- `pnpm --filter @workspace/db run push` — DB 스키마 반영 (개발용)
- Required env: `DATABASE_URL` — Postgres 연결 문자열

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + shadcn/ui
- API: Express 5 + WebSocket (ws)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — API 계약 (source of truth)
- `lib/db/src/schema/` — DB 스키마 (applications.ts, settings.ts)
- `artifacts/api-server/src/routes/` — API 라우트 (applications, settings, admin)
- `artifacts/api-server/src/lib/websocket.ts` — WebSocket 브로드캐스트
- `artifacts/api-server/src/lib/telegram.ts` — 텔레그램 봇 알림
- `artifacts/perfectron/src/pages/` — 페이지 (Home.tsx, Admin.tsx)
- `artifacts/perfectron/src/components/sections/` — 랜딩 섹션들

## Architecture decisions

- WebSocket 경로(/ws)를 artifact.toml paths에 명시해야 프록시를 통해 연결됨
- 관리자 세션은 인메모리 Set + httpOnly 쿠키로 관리 (재배포 시 로그아웃됨)
- 텔레그램 봇 토큰/채팅방 ID는 DB settings 테이블에 저장, 어드민에서 변경 가능
- 카카오톡 링크도 DB에서 동적으로 로드
- 기본 어드민 비밀번호: `perfectron2025` (ADMIN_PASSWORD 환경변수로 변경 가능)

## Product

- 랜딩페이지: 무직/연체/저신용/신불자 대상 대출 상담 신청 폼
- /admin: 비밀번호 보호된 관리자 패널 (신청 목록 실시간 조회, 설정 관리)
- 실시간 알림: WebSocket으로 새 신청 즉시 표시 + 텔레그램 봇 알림

## User preferences

- 모든 민감 설정(카카오링크, 텔레그램 토큰, 사업자정보)은 /admin에서 변경 가능
- 어드민 비밀번호는 ADMIN_PASSWORD 환경변수로 설정

## Gotchas

- 어드민 세션이 인메모리라 서버 재시작 시 재로그인 필요
- 텔레그램 채팅방 ID는 봇을 채팅방에 먼저 추가한 후 ID를 입력해야 함
- WebSocket 연결 URL은 `wss://[host]/ws` (https면 wss:, http면 ws:)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
