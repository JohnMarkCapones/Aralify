## 2.1 Technical Design Document (TDD)

### 2.1.1 NestJS Module & Class Structure

#### High-level modules

**Auth Module**

- `AuthModule`
- `AuthController`
- `AuthService`
- `JwtStrategy`, `GoogleStrategy`, `GithubStrategy`, `FacebookStrategy`
- `AuthRepository` (user auth-related persistence)
- DTOs: `RegisterDto`, `LoginDto`, `ResetPasswordDto`, `VerifyEmailDto`, `ChangePasswordDto`

**Users Module**

- `UsersModule`
- `UsersController`
- `UsersService`
- `UsersRepository`
- DTOs: `CreateUserDto`, `UpdateUserProfileDto`, `UpdateUserSettingsDto`, `UpdatePrivacySettingsDto`
- Entities/Models: `UserEntity`, `UserSettingsEntity`, `PrivacySettingsEntity`

**Courses Module**

- `CoursesModule`
- `CoursesController`
- `CoursesService`
- `CoursesRepository`
- DTOs: `CreateCourseDto`, `UpdateCourseDto`
- Entities: `CourseEntity`, `LevelEntity`, `LessonEntity`

**Lessons Module**

- `LessonsModule`
- `LessonsController`
- `LessonsService`
- `LessonsRepository`
- DTOs: `StartLessonDto`, `CompleteLessonDto`
- Entities: `LessonEntity`, `QuizEntity`, `ChallengeEntity`

**Progress Module**

- `ProgressModule`
- `ProgressController`
- `ProgressService`
- `ProgressRepository`
- Entities: `UserProgressEntity`, `LevelUnlockEntity`, `StreakHistoryEntity`

**Quizzes Module**

- `QuizzesModule`
- `QuizzesController`
- `QuizzesService`
- `QuizzesRepository`
- Entities: `QuizEntity`, `QuizAttemptEntity`

**Challenges Module**

- `ChallengesModule`
- `ChallengesController`
- `ChallengesService`
- `ChallengesRepository`
- `CodeExecutionService` (Judge0 integration)

**Gamification Module**

- `GamificationModule`
- `GamificationController`
- `GamificationService`
- Sub-services: `XpService`, `AchievementsService`, `StreaksService`
- Repositories: `GamificationRepository`, `LeaderboardRepository`

**Social Module**

- `SocialModule`
- `SocialController`
- `SocialService`
- `SocialRepository`
- Entities: `FollowEntity`, `ActivityEntity`

**Comments Module**

- `CommentsModule`
- `CommentsController`
- `CommentsService`
- `CommentsRepository`
- Entities: `CommentEntity`, `CommentLikeEntity`

**Leaderboards Module**

- `LeaderboardsModule`
- `LeaderboardsController`
- `LeaderboardsService`
- `LeaderboardsRepository`

**Notifications Module**

- `NotificationsModule`
- `NotificationsController`
- `NotificationsService`
- `NotificationsRepository`

**Admin Module**

- `AdminModule`
- Controllers: `AdminCoursesController`, `AdminLessonsController`, `AdminUsersController`, `AdminAnalyticsController`, `AdminModerationController`, `AdminConfigController`
- Services: `AdminCoursesService`, `AdminLessonsService`, `AdminUsersService`, `AdminAnalyticsService`, `AdminModerationService`, `AdminConfigService`

#### Common layer

- `common/decorators`: `CurrentUser`, `Roles`, `Public`
- `common/guards`: `JwtAuthGuard`, `RolesGuard`, `ThrottlerGuard`
- `common/interceptors`: `TransformInterceptor`, `LoggingInterceptor`
- `common/filters`: `HttpExceptionFilter`
- `common/pipes`: `ValidationPipe`
- `common/dto`: `PaginationDto`, `BaseResponseDto`
- `common/exceptions`: custom exception classes (see 2.2.1)

### 2.1.2 Service Layer Architecture

**Controller → Service → Repository**

- Controllers are thin: HTTP concerns only (routing, params, DTO validation).
- Services encapsulate **business rules** per bounded context:
  - `AuthService`: login, register, token rotation, OAuth linking.
  - `LessonsService`: lesson retrieval, start/complete flows.
  - `GamificationService` + `XpService` + `AchievementsService`: XP calculations, streak updates, achievement evaluation.
  - `LeaderboardsService`: builds leaderboards from `leaderboard_snapshots`.
- Repositories provide a clean data access API over Prisma:
  - One repository per aggregate root (`UsersRepository`, `CoursesRepository`, …).
  - Services never use Prisma client directly.

**Cross-service orchestration**

- For multi-step flows, one “orchestrator” service coordinates multiple domain services:
  - Example: `LearningFlowService` orchestrates `LessonsService`, `ProgressService`, `GamificationService`, `SocialService` for “lesson completed” flow.
- Long-running or heavy work (e.g., leaderboard snapshots) is delegated to Bull queues with dedicated processors.

### 2.1.3 Repository Pattern Implementation

**Base repository**

- `BaseRepository<TEntity>`:
  - Common operations: `findById`, `findMany`, `create`, `update`, `delete`, transaction helpers.
  - Wraps Prisma models; generic over table/entity.

**Feature repositories**

- Each domain repository extends `BaseRepository` and adds domain-specific queries:
  - `UsersRepository`:
    - `findByEmail`, `findByUsername`, `searchUsers`, `getUserStats`.
  - `ProgressRepository`:
    - `getCourseProgress`, `getLevelProgress`, `upsertUserProgress`, `getHeatmap`.
  - `GamificationRepository`:
    - `createXpTransaction`, `getUserGamificationProfile`, `getStreakStats`.
  - `LeaderboardsRepository`:
    - `getGlobalLeaderboard`, `getFriendsLeaderboard`, `saveSnapshot`, `getAroundUser`.

**Transactions**

- Use Prisma transactions for multi-table updates:
  - Example: finishing lesson → within one transaction:
    - Update `user_progress`.
    - Insert `xp_transactions`.
    - Update `users.xp_total`, `users.level`.
    - Insert `streak_history`.
    - Possibly insert `user_achievements`, `activities`.

### 2.1.4 DTO / Entity Mapping Strategy

**DTOs**

- Input DTOs: validation-only (`class-validator`) and transformation (`class-transformer`).
- Controllers accept only DTOs, never raw `any`.

**Output DTOs / entities**

- `*Entity` classes annotated with `@Expose()` / `@Exclude()` define public shape.
- Mapped via `class-transformer` in `TransformInterceptor`.

**Mapping rules**

- Services return **domain models or raw Prisma results** internally.
- Controllers never directly expose Prisma models; instead:
  - Map to `*Entity` via `plainToInstance`.
  - Wrap in standard response format:
    ```json
    {
      "success": true,
      "data": "<Entity or array>",
      "message": "Operation successful",
      "meta": {}
    }
    ```
- For lists with pagination:
  - Return `{ "items": [<Entity>], "pagination": <PaginationMeta> }` in `data`.

---

## 2.2 Sequence Diagrams for Critical Flows

### 2.2.1 User Registration Flow (OAuth + Email)

#### Email/password registration

1. Client → `POST /api/v1/auth/register` with `RegisterDto`.
2. `AuthController` validates DTO, calls `AuthService.register`.
3. `AuthService`:
   - Checks uniqueness via `UsersRepository`.
   - Hashes password (bcrypt).
   - Creates user + profile + default settings.
   - Generates email verification token, saves in DB.
   - Enqueues “send verification email” job to Bull (`EmailQueue`).
   - Generates access + refresh tokens.
4. `EmailProcessor` uses Resend/SendGrid to send verification email.
5. `AuthService` returns tokens + user to controller.
6. `AuthController` returns standardized success response.

#### OAuth (Google/GitHub)

1. Client → `GET /api/v1/auth/oauth/google`.
2. `AuthController` delegates to `GoogleStrategy` (Passport) for redirect.
3. User authenticates with provider, redirected to `/oauth/google/callback`.
4. `GoogleStrategy.validate`:
   - Retrieves profile, email.
   - Uses `UsersRepository` to find or create user.
   - Links OAuth account to existing user on same email.
5. `AuthService` generates tokens.
6. Controller redirects back to client with tokens (e.g., via query or cookie).

### 2.2.2 Lesson Completion → XP Award → Achievement Check

1. Client → `POST /api/v1/lessons/{id}/complete` with `CompleteLessonDto` (time, score).
2. `LessonsController`:
   - Validates user via `JwtAuthGuard`.
   - Validates DTO.
   - Calls `LearningFlowService.completeLesson`.
3. `LearningFlowService.completeLesson`:
   - Uses `LessonsService` to verify lesson exists and user has access.
   - Calls `ProgressService.markLessonCompleted`:
     - Updates `user_progress`.
     - Unlocks next level (via `ProgressRepository` and `LevelUnlock`).
   - Calls `GamificationService.awardLessonXp`:
     - Computes XP (base × difficulty multiplier, hint penalties).
     - Inserts `xp_transactions`, updates user XP and level.
   - Calls `StreaksService.updateStreak` (uses `streak_history`).
   - Calls `AchievementsService.evaluateForUser`:
     - Checks completion, streak, mastery, social criteria.
     - Inserts new `user_achievements` if unlocked.
   - Inserts `activities` rows for feed (lesson completed, achievement earned).
4. `LearningFlowService` aggregates result:
   - `xp_earned`, `level_unlocked`, `next_level`, `achievements`.
5. `LessonsController` returns unified response.

### 2.2.3 Code Execution Flow (Client → API → Judge0)

1. Client (Monaco) → `POST /api/v1/challenges/{id}/execute` with `code`, `language`.
2. `ChallengesController.executeCode`:
   - Enforced by `JwtAuthGuard`, `@Throttle(10, 60)`.
   - Validates DTO (language whitelist, size limits).
   - Calls `CodeExecutionService.executeTestRun`.
3. `CodeExecutionService`:
   - Validates challenge exists via `ChallengesRepository`.
   - Prepares Judge0 payload (language ID, source code, stdin).
   - Checks user’s execution rate in Redis (rate-limiting, simple circuit breaker).
   - Calls Judge0 API via `HttpService` with timeout and retry policy.
4. Judge0 executes code and returns result.
5. `CodeExecutionService`:
   - Maps Judge0 response to internal `ExecutionResult` model.
   - For challenge execution: runs local test-case evaluation (compare outputs).
6. `ChallengesController`:
   - Returns `stdout`, `stderr`, `test_results`, `passed`, `failed`, `status`.

### 2.2.4 Streak Calculation (Daily Cron Job)

1. Scheduled Bull job (e.g., `@Cron('0 0 * * *')` or Bull repeatable job) runs in **Gamification worker**.
2. Job fetches all users with recent activity (e.g., last 2 days) using `StreaksService`.
3. For each user:
   - Read last `streak_history` records.
   - Determine if user had qualifying activity today (from `streak_history`).
   - If yes:
     - Increment `streak_current`, update `streak_longest`, write new `streak_history`.
     - Award streak XP via `XpService` if milestone hit.
   - If no and yesterday had activity:
     - Reset `streak_current` to 0.
4. Any milestone achievements are created via `AchievementsService`.
5. Metrics/logs pushed for number of active streaks, resets, etc.

### 2.2.5 Leaderboard Generation (Weekly Snapshot)

1. Weekly Bull job (`LeaderboardsSnapshotJob`) runs (e.g., Monday 00:05 UTC).
2. `LeaderboardsService.generateWeeklySnapshot`:
   - Queries `xp_transactions` in last week grouped by user.
   - Sorts by XP earned.
   - Builds `rankings` array with `user_id`, `rank`, `xp`, `change`.
   - Inserts `leaderboard_snapshots` with `period_type = 'weekly'`.
3. For global all-time, separate daily or weekly snapshot jobs aggregate total `xp_total`.
4. Optionally enqueue notification jobs to top-ranked users.
5. Read endpoints (`GET /leaderboards/weekly`, `/around-user`) read from snapshots only (no heavy runtime aggregations).

---

## 2.2 Error Handling Strategy

### 2.2.1 Exception Hierarchy

**Base**

- `AppException` extends `HttpException`
  - Fields: `code` (string), `details?: Record<string, unknown>`.

**Domain / HTTP-specific**

- `AuthException` (e.g., `INVALID_CREDENTIALS`, `TOKEN_EXPIRED`)
- `ValidationException` (wraps `class-validator` errors)
- `NotFoundException` (resource-level, returns 404)
- `ConflictException` (e.g., duplicate email/username)
- `RateLimitExceededException`
- `ExternalServiceException` (Judge0, email, storage failures)

All thrown exceptions are converted by `HttpExceptionFilter` to the standard error format already defined in `System-Architecture.md` / `ARALIFY_API_ENDPOINTS.md`.

### 2.2.2 Error Response Formats (Standardized)

- **Success**: already defined (`success: true`, `data`, `message`, `meta`).
- **Error** (from `HttpExceptionFilter`):

  ```json
  {
    "success": false,
    "error": {
      "code": "SOME_ERROR_CODE",
      "message": "Human-readable message",
      "details": {}
    }
  }
  ```

- Validation errors:
  - `code: "VALIDATION_ERROR"`.
  - `details` contains per-field arrays (compatible with existing docs).

### 2.2.3 Retry Logic for External Services

**Judge0**

- Use short timeout (e.g., 3–5 seconds).
- Retries: at most 2 retries with exponential backoff (e.g., 200ms, 500ms) for idempotent “execute” operations.
- On repeated failure:
  - Throw `ExternalServiceException` with `code = "CODE_EXECUTION_UNAVAILABLE"`.
  - Controller returns 503 or 502 depending on failure type.

**Email provider (Resend/SendGrid)**

- Enqueued via Bull; worker has retry configuration (e.g., 5 attempts with exponential backoff).
- Failures logged and moved to dead-letter queue for manual inspection.

**Storage / Redis**

- Short timeouts and small retry count (1–2) to avoid cascading failures.

### 2.2.4 Circuit Breaker Patterns

- Implemented around **Judge0** and any other critical external HTTP services:
  - Use a small in-memory/Redis-based circuit breaker:
    - Track failure rate over a sliding window.
    - On threshold exceeded:
      - Open circuit for a cool-down period (e.g., 30–60s).
      - Fast-fail requests with `CODE_EXECUTION_UNAVAILABLE` instead of waiting on timeouts.
- Health endpoints (`/health/detailed`) expose Judge0 status to ops.
- For non-critical features (e.g., analytics):
  - On failure, log and **do not** block main user request path.

---

## 2.2 Logging & Monitoring Strategy

### 2.2.1 Log Levels & Usage

- `DEBUG`: detailed developer logs (disabled in production by default).
- `INFO`: high-level events:
  - User registration, login, logout.
  - Lesson completion, challenge completion.
  - Leaderboard snapshot completion, cron jobs start/end.
- `WARN`:
  - Soft failures (e.g., email provider temporary errors, Judge0 timeout but retried successfully).
  - Suspicious usage patterns (e.g., near rate-limit).
- `ERROR`:
  - Unhandled exceptions.
  - External service failures after retries.
  - Data integrity problems.
- `FATAL`:
  - Process-level failures that require restart.

### 2.2.2 Structured Logging Format (JSON)

- All logs formatted as JSON lines suitable for ingestion by Sentry/PostHog/log pipeline:

  ```json
  {
    "timestamp": "ISO-8601",
    "level": "INFO",
    "message": "Lesson completed",
    "context": "LessonsService",
    "requestId": "uuid",
    "userId": "uuid",
    "path": "/api/v1/lessons/{id}/complete",
    "metadata": {
      "lessonId": "uuid",
      "difficulty": "hard",
      "xpAwarded": 300
    }
  }
  ```

- Use NestJS `Logger` or a Winston-based logger injected via DI.

### 2.2.3 Metrics to Track

**Auth**

- Login success/failure counts.
- OAuth vs email/password mix.

**Learning**

- Lessons started/completed per day.
- Drop-off points per lesson.
- Average time per lesson.

**Gamification**

- XP distribution.
- Streak distribution and resets.
- Achievements unlocked per day.

**Social**

- Comments created, likes, reports.
- Follows and unfollows.
