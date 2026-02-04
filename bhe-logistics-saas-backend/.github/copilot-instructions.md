# Copilot / AI Agent Instructions — BHE Logistics SAAS Backend

This repository is a small NestJS backend starter. Below are focused, actionable notes to help AI coding agents be productive immediately.

1. Project overview

- Framework: NestJS (server-side TypeScript) with TypeORM for DB (PostgreSQL). Entry: [src/main.ts](src/main.ts#L1).
- App structure: `AppModule` in [src/app.module.ts](src/app.module.ts#L1) imports `FranchiseModule`; uses PostgreSQL DB with env vars (see .env).
- Multi-tenant setup: Franchise entity includes `tenantId` for tenant isolation; no full multi-DB yet, but entities support it.
- No external services beyond DB; avoid assuming integrations.

2. Key files and patterns

- HTTP controllers: placed under `controllers` array in modules (example: [src/app.controller.ts](src/app.controller.ts#L1)).
- Services/providers: injected via constructor and listed in `providers` (example: [src/app.service.ts](src/app.service.ts#L1)).
- TypeORM entities: defined with decorators, registered in module's `TypeOrmModule.forFeature()` (example: [src/franchise/franchise.entity.ts](src/franchise/franchise.entity.ts#L1)).
- Entrypoint boots Nest and listens on `process.env.PORT ?? 3000` ([src/main.ts](src/main.ts#L1)).

3. Build / dev / test workflows (exact commands)

- Install: `npm install`
- Dev server (watch): `npm run start:dev` (uses `nest start --watch`).
- Production build: `npm run build` then `npm run start:prod` (runs `node dist/main`).
- Unit tests: `npm run test` (Jest) — note Jest `rootDir` is `src` from package.json; unit tests live alongside sources (`*.spec.ts`).
- E2E tests: `npm run test:e2e` (uses `test/jest-e2e.json`).
- Lint/format: `npm run lint` and `npm run format`.

4. TypeScript / runtime details agents must respect

- `tsconfig.json` uses `module: nodenext` and `experimentalDecorators` + `emitDecoratorMetadata` — preserve decorator usage and ESM-aware imports.
- Output directory: `dist` (nest build). `start:prod` runs `node dist/main`.
- Environment variables: loaded via `@nestjs/config` (global in AppModule); DB config reads from `DB_*` env vars (see .env example).

5. Tests and CI considerations

- Jest config is embedded in `package.json` and expects `src` tests. When adding tests, place `*.spec.ts` in `src` or reference `test/jest-e2e.json` for e2e.

6. Common quick edits examples

- Add a new HTTP route: create `src/your.controller.ts`, export a class with `@Controller('name')`, add to module's `controllers`.
- Add injectable service: create `src/your.service.ts` with `@Injectable()` and add to module's `providers`.
- Add TypeORM entity: create `src/your.entity.ts` with `@Entity()`, columns with decorators, register in module's `TypeOrmModule.forFeature([YourEntity])` (see [src/franchise/franchise.entity.ts](src/franchise/franchise.entity.ts#L1)).

7. Conventions and constraints (observed)

- Single-module starter: avoid adding heavy multi-module refactors without user approval.
- Use the existing `npm` scripts and `nest` CLI for scaffolding; project includes `@nestjs/cli` in devDependencies.

8. When modifying package.json or build settings

- Keep `jest.rootDir` pointing to `src` when adjusting tests.
- If changing compilation target or module system, update `tsconfig.json` and verify `start:prod` behavior (dist path and import semantics).

9. What I could not infer (ask user)

- Intended external integrations (DBs, queues, auth providers) — none are present; confirm before adding.
- Preferred branching/PR conventions or CI pipelines — no CI config found.

If any section is unclear or you'd like me to include additional examples (e.g., adding a DB module, sample controller PR), tell me which area to expand.
