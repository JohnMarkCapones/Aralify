# Aralify Database Schema

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                    USERS                                         │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    ┌───────────────────┐
                                    │       users       │
                                    ├───────────────────┤
                                    │ PK id             │
                                    │    email (unique) │
                                    │    username (uniq)│
                                    │    password_hash  │
                                    │    display_name   │
                                    │    avatar_url     │
                                    │    bio            │
                                    │    locale         │
                                    │    timezone       │
                                    │    xp_total       │
                                    │    level          │
                                    │    streak_current │
                                    │    streak_longest │
                                    │    role (enum)    │
                                    │    is_verified    │
                                    │    last_login_at  │
                                    │    created_at     │
                                    │    updated_at     │
                                    └─────────┬─────────┘
                                              │
              ┌───────────────────────────────┼───────────────────────────────┐
              │                               │                               │
              ▼                               ▼                               ▼
┌─────────────────────────┐    ┌─────────────────────────┐    ┌─────────────────────────┐
│  user_course_progress   │    │   user_level_unlocks    │    │  user_lesson_progress   │
├─────────────────────────┤    ├─────────────────────────┤    ├─────────────────────────┤
│ PK id                   │    │ PK id                   │    │ PK id                   │
│ FK user_id        ──────│────│ FK user_id        ──────│────│ FK user_id        ──────│
│ FK course_id      ──┐   │    │ FK level_id       ──┐   │    │ FK lesson_id      ──┐   │
│    completion_%     │   │    │    unlocked_at      │   │    │    status (enum)    │   │
│    mastery_%        │   │    └─────────────────────│───┘    │    score            │   │
│    total_xp_earned  │   │                          │        │    xp_earned        │   │
│    time_spent_secs  │   │                          │        │    time_spent_secs  │   │
│    started_at       │   │                          │        │    started_at       │   │
│    completed_at     │   │                          │        │    completed_at     │   │
│    last_activity_at │   │                          │        └──────────┬──────────┘   │
└──────────┬──────────┘   │                          │                   │              │
           │              │                          │                   │              │
           │              │                          │                   │              │
           │              │                          │                   │              │
           │              │                          │                   │              │
           ▼              │                          │                   ▼              │
                          │                          │                                  │
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                   CONTENT                                            │
└─────────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────┐         ┌───────────────────┐         ┌───────────────────┐
│      courses      │         │      levels       │         │      lessons      │
├───────────────────┤         ├───────────────────┤         ├───────────────────┤
│ PK id             │ ◄─────  │ PK id             │ ◄─────  │ PK id             │
│    slug (unique)  │    │    │ FK course_id ─────┘    │    │ FK level_id ──────┘
│    language       │    │    │    slug           │    │    │    difficulty     │
│    title_en       │    │    │    title_en       │    │    │    title_en       │
│    title_fil      │    │    │    title_fil      │    │    │    title_fil      │
│    description_en │    │    │    description_en │    │    │    content (JSON) │
│    description_fil│    │    │    description_fil│    │    │    xp_reward      │
│    icon_url       │    │    │    order_index    │    │    │    time_limit_sec │
│    color          │    │    │    is_published   │    │    │    est_time_mins  │
│    order_index    │    │    │    created_at     │    │    │    order_index    │
│    estimated_hours│    │    │    updated_at     │    │    │    is_published   │
│    is_published   │    │    └───────────────────┘    │    │    created_at     │
│    created_at     │    │              ▲              │    │    updated_at     │
│    updated_at     │    │              │              │    └───────────────────┘
└───────────────────┘    │              │              │              ▲
         ▲               │              │              │              │
         │               │              └──────────────│──────────────┘
         │               │                             │
         └───────────────┴─────────────────────────────┘
```

## Tables Overview

### Core Tables

| Table | Description | Key Relationships |
|-------|-------------|-------------------|
| `users` | User accounts and profiles | Has many progress records |
| `courses` | Programming courses (Python, JS, etc.) | Has many levels |
| `levels` | Chapters within a course | Belongs to course, has many lessons |
| `lessons` | Individual lessons with 3 difficulty tiers | Belongs to level |

### Progress/Junction Tables

| Table | Description | Key Relationships |
|-------|-------------|-------------------|
| `user_course_progress` | Tracks user's overall course progress | User ↔ Course |
| `user_level_unlocks` | Tracks which levels user has unlocked | User ↔ Level |
| `user_lesson_progress` | Tracks completion of individual lessons | User ↔ Lesson |

## Enums

### UserRole
```
USER       - Regular learner
MODERATOR  - Can moderate content
ADMIN      - Full access
```

### Difficulty
```
EASY    - 1x XP multiplier
MEDIUM  - 2x XP multiplier
HARD    - 3x XP multiplier
```

### LessonStatus
```
NOT_STARTED  - User hasn't begun
IN_PROGRESS  - User is working on it
COMPLETED    - User finished
```

## Relationships Summary

```
User (1) ──────< (N) UserCourseProgress (N) >────── (1) Course
User (1) ──────< (N) UserLevelUnlock    (N) >────── (1) Level
User (1) ──────< (N) UserLessonProgress (N) >────── (1) Lesson

Course (1) ────< (N) Level (1) ────< (N) Lesson
```

## Data Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                              │
└──────────────────────────────────────────────────────────────────┘

  User signs up
       │
       ▼
  Browses courses ──────────────────────────────────────────────┐
       │                                                        │
       ▼                                                        │
  Starts course ◄───────────────────────────────────────────────┤
       │                                                        │
       │  Creates: UserCourseProgress                           │
       │  Unlocks: First Level (UserLevelUnlock)                │
       │                                                        │
       ▼                                                        │
  Selects difficulty (EASY/MEDIUM/HARD)                         │
       │                                                        │
       ▼                                                        │
  Completes lesson ◄────────────────────────────────────────────┤
       │                                                        │
       │  Creates/Updates: UserLessonProgress                   │
       │  Awards: XP (with difficulty multiplier)               │
       │  Updates: UserCourseProgress (completion %)            │
       │                                                        │
       ▼                                                        │
  Level complete? ──── No ──────────────────────────────────────┤
       │                                                        │
       │ Yes                                                    │
       ▼                                                        │
  Unlock next level (UserLevelUnlock) ──────────────────────────┘
       │
       ▼
  Course complete?
       │
       │ Yes
       ▼
  Issue certificate (future)
```

## Indexes (Automatic from Prisma)

| Table | Index | Type |
|-------|-------|------|
| users | email | Unique |
| users | username | Unique |
| courses | slug | Unique |
| levels | (course_id, slug) | Unique Composite |
| lessons | (level_id, difficulty) | Unique Composite |
| user_course_progress | (user_id, course_id) | Unique Composite |
| user_level_unlocks | (user_id, level_id) | Unique Composite |
| user_lesson_progress | (user_id, lesson_id) | Unique Composite |

## Cascade Deletes

```
Course deleted  →  Levels deleted      →  Lessons deleted
User deleted    →  All progress records deleted
Level deleted   →  Lessons deleted, Level unlocks deleted
Lesson deleted  →  Lesson progress deleted
```
