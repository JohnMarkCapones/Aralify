================================================================================
CODEFORGE - COMPLETE API ENDPOINTS DOCUMENTATION
================================================================================

Version: 1.0
Date: January 2026
Base URL: https://api.codeforge.com/api/v1/

================================================================================
TABLE OF CONTENTS
================================================================================

1. Authentication Endpoints
2. User Management Endpoints
3. Course Endpoints
4. Level Endpoints
5. Lesson Endpoints
6. Progress Tracking Endpoints
7. Quiz Endpoints
8. Challenge Endpoints
9. Gamification Endpoints
10. Social Endpoints
11. Comment Endpoints
12. Leaderboard Endpoints
13. Notification Endpoints
14. Settings Endpoints
15. Search Endpoints
16. Admin - Course Management
17. Admin - Lesson Management
18. Admin - User Management
19. Admin - Analytics
20. Admin - Content Moderation
21. Admin - System Configuration
22. Health & System Endpoints

================================================================================
1. AUTHENTICATION ENDPOINTS
================================================================================

[1.1] POST /api/v1/auth/register
Purpose: Create a new user account with email and password
Authentication: Public (no auth required)
Input:
  - email: string (required, valid email format)
  - username: string (required, 3-20 chars, alphanumeric + underscore)
  - password: string (required, min 8 chars, must contain uppercase, lowercase, number)
  - display_name: string (required, max 50 chars)
Output:
  - user: User object (without password)
  - access_token: JWT string (15 min expiry)
  - refresh_token: JWT string (7 days expiry)
Notes: 
  - Password is hashed with bcrypt (cost factor 12)
  - Automatically creates user profile
  - Sends verification email

[1.2] POST /api/v1/auth/login
Purpose: Authenticate user with email and password
Authentication: Public
Input:
  - email: string (required)
  - password: string (required)
Output:
  - user: User object
  - access_token: JWT string
  - refresh_token: JWT string
Notes:
  - Rate limited to 5 attempts per minute
  - Account locked after 10 failed attempts
  - Returns last login timestamp

[1.3] POST /api/v1/auth/logout
Purpose: Revoke user's access token and end session
Authentication: Required (Bearer token)
Input: None (token from header)
Output:
  - success: boolean
  - message: string
Notes:
  - Blacklists the current access token
  - Invalidates refresh token

[1.4] POST /api/v1/auth/refresh
Purpose: Get new access token using refresh token
Authentication: Refresh token required
Input:
  - refresh_token: string (required)
Output:
  - access_token: JWT string (new)
  - refresh_token: JWT string (rotated)
Notes:
  - Old refresh token is invalidated
  - Returns new refresh token (token rotation)

[1.5] GET /api/v1/auth/oauth/google
Purpose: Redirect to Google OAuth consent screen
Authentication: Public
Input: None
Output: Redirect to Google OAuth
Notes:
  - Uses OAuth 2.0 authorization code flow
  - Requests email and profile scopes

[1.6] GET /api/v1/auth/oauth/google/callback
Purpose: Handle Google OAuth callback and create/login user
Authentication: Public (OAuth state validation)
Input:
  - code: string (OAuth authorization code)
  - state: string (CSRF protection)
Output:
  - user: User object
  - access_token: JWT string
  - refresh_token: JWT string
Notes:
  - Creates account if user doesn't exist
  - Links to existing account if email matches

[1.7] GET /api/v1/auth/oauth/github
Purpose: Redirect to GitHub OAuth consent screen
Authentication: Public
Input: None
Output: Redirect to GitHub OAuth
Notes:
  - Requests user:email scope

[1.8] GET /api/v1/auth/oauth/github/callback
Purpose: Handle GitHub OAuth callback
Authentication: Public (OAuth state validation)
Input:
  - code: string
  - state: string
Output:
  - user: User object
  - access_token: JWT string
  - refresh_token: JWT string

[1.9] GET /api/v1/auth/oauth/facebook
Purpose: Redirect to Facebook OAuth consent screen
Authentication: Public
Input: None
Output: Redirect to Facebook OAuth

[1.10] GET /api/v1/auth/oauth/facebook/callback
Purpose: Handle Facebook OAuth callback
Authentication: Public (OAuth state validation)
Input:
  - code: string
  - state: string
Output:
  - user: User object
  - access_token: JWT string
  - refresh_token: JWT string

[1.11] POST /api/v1/auth/forgot-password
Purpose: Send password reset email to user
Authentication: Public
Input:
  - email: string (required)
Output:
  - success: boolean
  - message: string
Notes:
  - Generates time-limited reset token (1 hour expiry)
  - Rate limited to 3 requests per hour per email
  - Always returns success (security - no email enumeration)

[1.12] POST /api/v1/auth/reset-password
Purpose: Reset user password using token from email
Authentication: Public (token validation)
Input:
  - token: string (required, from email link)
  - password: string (required, min 8 chars)
  - password_confirmation: string (required, must match)
Output:
  - success: boolean
  - message: string
Notes:
  - Token is single-use and expires after 1 hour
  - Invalidates all existing sessions

[1.13] POST /api/v1/auth/verify-email
Purpose: Verify user's email address
Authentication: Public (token validation)
Input:
  - token: string (required, from verification email)
Output:
  - success: boolean
  - message: string
Notes:
  - Marks user's email as verified
  - Token expires after 24 hours

[1.14] POST /api/v1/auth/resend-verification
Purpose: Resend email verification link
Authentication: Required (Bearer token)
Input: None
Output:
  - success: boolean
  - message: string
Notes:
  - Rate limited to 1 request per 5 minutes
  - Only works if email not already verified

[1.15] POST /api/v1/auth/change-password
Purpose: Change password for authenticated user
Authentication: Required (Bearer token)
Input:
  - current_password: string (required)
  - new_password: string (required, min 8 chars)
  - new_password_confirmation: string (required)
Output:
  - success: boolean
  - message: string
Notes:
  - Validates current password before changing
  - Invalidates all other sessions

================================================================================
2. USER MANAGEMENT ENDPOINTS
================================================================================

[2.1] GET /api/v1/user/profile
Purpose: Get authenticated user's full profile
Authentication: Required (Bearer token)
Input: None
Output:
  - id: uuid
  - email: string
  - username: string
  - display_name: string


  
  - avatar_url: string?
  - bio: string?
  - locale: string
  - timezone: string
  - xp_total: integer
  - level: integer
  - streak_current: integer
  - streak_longest: integer
  - created_at: timestamp
Notes:
  - Returns sensitive data (email) only for own profile

[2.2] PUT /api/v1/user/profile
Purpose: Update authenticated user's profile information
Authentication: Required (Bearer token)
Input:
  - display_name: string (optional, max 50 chars)
  - bio: string (optional, max 500 chars)
  - timezone: string (optional, valid timezone)
  - locale: string (optional, 'en' or 'fil')
Output:
  - user: Updated User object
Notes:
  - Username and email cannot be changed here
  - Validates timezone against IANA database

[2.3] PUT /api/v1/user/avatar
Purpose: Upload or update user's profile avatar
Authentication: Required (Bearer token)
Input:
  - avatar: file (required, image format, max 5MB)
Output:
  - avatar_url: string (CDN URL)
Notes:
  - Accepts: jpg, png, gif, webp
  - Automatically resized to 256x256
  - Old avatar is deleted from storage

[2.4] GET /api/v1/user/settings
Purpose: Get user's application settings
Authentication: Required (Bearer token)
Input: None
Output:
  - email_notifications: boolean
  - push_notifications: boolean
  - streak_reminders: boolean
  - achievement_notifications: boolean
  - social_notifications: boolean
  - theme: string ('light', 'dark', 'auto')
  - code_editor_theme: string
  - font_size: integer
Notes:
  - Returns all preference settings

[2.5] PUT /api/v1/user/settings
Purpose: Update user's application settings
Authentication: Required (Bearer token)
Input:
  - email_notifications: boolean (optional)
  - push_notifications: boolean (optional)
  - streak_reminders: boolean (optional)
  - achievement_notifications: boolean (optional)
  - social_notifications: boolean (optional)
  - theme: string (optional)
  - code_editor_theme: string (optional)
  - font_size: integer (optional, 12-24)
Output:
  - settings: Updated settings object
Notes:
  - Partial updates allowed
  - Changes take effect immediately

[2.6] DELETE /api/v1/user/account
Purpose: Permanently delete user account and all data
Authentication: Required (Bearer token)
Input:
  - password: string (required, confirmation)
Output:
  - success: boolean
  - message: string
Notes:
  - Soft delete (marked as deleted, kept 30 days)
  - Removes from leaderboards immediately
  - All user content (comments, etc.) anonymized
  - Cannot be undone after 30 days

[2.7] GET /api/v1/users/{username}
Purpose: Get public profile of any user by username
Authentication: Optional (public data, but more data if authenticated)
Input:
  - username: string (URL parameter)
Output:
  - id: uuid
  - username: string
  - display_name: string
  - avatar_url: string?
  - bio: string?
  - xp_total: integer
  - level: integer
  - streak_current: integer
  - streak_longest: integer
  - created_at: timestamp
  - badges: Badge[] (displayed badges only)
  - stats: UserStats object
Notes:
  - Email is never exposed
  - Shows public profile data only
  - Includes follow status if authenticated

[2.8] GET /api/v1/user/stats
Purpose: Get detailed statistics for authenticated user
Authentication: Required (Bearer token)
Input: None
Output:
  - total_lessons_completed: integer
  - total_quizzes_completed: integer
  - total_challenges_solved: integer
  - courses_completed: integer
  - average_mastery: decimal
  - time_spent_learning: integer (seconds)
  - best_streak: integer
  - achievements_earned: integer
  - badges_earned: integer
Notes:
  - Computed statistics across all activities

[2.9] GET /api/v1/users/{username}/stats
Purpose: Get public statistics for any user
Authentication: Public
Input:
  - username: string (URL parameter)
Output:
  - total_lessons_completed: integer
  - courses_completed: integer
  - achievements_earned: integer
  - badges_earned: integer (public badges only)
Notes:
  - Limited public statistics
  - More detailed stats available to followers

================================================================================
3. COURSE ENDPOINTS
================================================================================

[3.1] GET /api/v1/courses
Purpose: List all published courses
Authentication: Optional (shows progress if authenticated)
Input:
  - language: string (optional query param for filtering)
  - sort: string (optional, 'popular', 'newest', 'alphabetical')
Output:
  - courses: Course[] array
  - meta: pagination info
Notes:
  - Returns only published courses for non-admin
  - Includes user progress percentage if authenticated
  - Default sort by order_index

[3.2] GET /api/v1/courses/{slug}
Purpose: Get detailed course information with all levels
Authentication: Optional
Input:
  - slug: string (URL parameter, e.g., 'python-basics')
Output:
  - id: uuid
  - slug: string
  - language: string
  - title: i18n object {en, fil}
  - description: i18n object
  - icon_url: string
  - color: string
  - levels: Level[] (nested)
  - total_lessons: integer
  - estimated_hours: integer
  - is_published: boolean
  - user_progress: object (if authenticated)
Notes:
  - 404 if course not found or not published
  - Levels sorted by order_index
  - Progress includes completion percentage

[3.3] GET /api/v1/courses/{slug}/progress
Purpose: Get user's detailed progress in a specific course
Authentication: Required (Bearer token)
Input:
  - slug: string (URL parameter)
Output:
  - course_id: uuid
  - completion_percentage: decimal
  - mastery_percentage: decimal
  - levels_unlocked: integer
  - levels_completed: integer
  - lessons_completed: integer
  - total_xp_earned: integer
  - time_spent_seconds: integer
  - last_activity: timestamp
  - level_progress: LevelProgress[] array
Notes:
  - Returns 404 if course not found
  - Empty progress if user hasn't started

[3.4] GET /api/v1/courses/{slug}/levels
Purpose: Get all levels for a specific course
Authentication: Optional
Input:
  - slug: string (URL parameter)
Output:
  - levels: Level[] array
Notes:
  - Returns only published levels
  - Includes lock status if authenticated
  - Sorted by order_index

[3.5] POST /api/v1/courses/{slug}/start
Purpose: Mark course as started by user (tracking)
Authentication: Required (Bearer token)
Input:
  - slug: string (URL parameter)
Output:
  - success: boolean
  - course_progress: CourseProgress object
Notes:
  - Creates initial progress record
  - Unlocks first level
  - Creates activity feed entry

[3.6] GET /api/v1/courses/{slug}/certificate
Purpose: Get or generate completion certificate for course
Authentication: Required (Bearer token)
Input:
  - slug: string (URL parameter)
Output:
  - certificate_url: string (PDF URL)
  - issued_at: timestamp
  - verification_code: string
Notes:
  - Only available if course 100% completed
  - Generates PDF on first request
  - Includes unique verification code

================================================================================
4. LEVEL ENDPOINTS
================================================================================

[4.1] GET /api/v1/levels/{id}
Purpose: Get detailed information about a specific level
Authentication: Optional
Input:
  - id: uuid (URL parameter)
Output:
  - id: uuid
  - course_id: uuid
  - slug: string
  - title: i18n object
  - description: i18n object
  - order_index: integer
  - prerequisites: uuid[] (level IDs)
  - is_published: boolean
  - lessons: Lesson[] (3 tiers)
  - is_locked: boolean (if authenticated)
Notes:
  - Returns lock status based on prerequisites
  - Shows all 3 difficulty tiers
  - 404 if not published (non-admin)

[4.2] GET /api/v1/levels/{id}/lessons
Purpose: Get all lesson tiers for a level
Authentication: Optional
Input:
  - id: uuid (URL parameter)
  - difficulty: string (optional query, 'easy', 'medium', 'hard')
Output:
  - lessons: Lesson[] array (3 tiers or filtered)
  - level_info: Level object
Notes:
  - Can filter by difficulty
  - Includes user completion status if authenticated
  - Sorted by difficulty (easy, medium, hard)

[4.3] GET /api/v1/levels/{id}/progress
Purpose: Get user's progress for a specific level
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
Output:
  - level_id: uuid
  - is_unlocked: boolean
  - unlocked_at: timestamp?
  - easy_completed: boolean
  - medium_completed: boolean
  - hard_completed: boolean
  - mastery_percentage: integer (33%, 66%, or 100%)
  - total_xp_earned: integer
  - time_spent_seconds: integer
Notes:
  - Shows which tiers are completed
  - Calculates mastery based on tiers completed

[4.4] POST /api/v1/levels/{id}/unlock
Purpose: Unlock a level for the user (checks prerequisites)
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
Output:
  - success: boolean
  - level_unlock: LevelUnlock object
Notes:
  - Validates prerequisites are met
  - Returns error if prerequisites not completed
  - Automatically triggered by lesson completion

================================================================================
5. LESSON ENDPOINTS
================================================================================

[5.1] GET /api/v1/lessons/{id}
Purpose: Get complete lesson content with all sections
Authentication: Optional (progress shown if authenticated)
Input:
  - id: uuid (URL parameter)
Output:
  - id: uuid
  - level_id: uuid
  - difficulty: string
  - title: i18n object
  - content: jsonb (structured sections)
  - xp_reward: integer
  - time_limit_seconds: integer?
  - estimated_time_minutes: integer
  - is_published: boolean
  - quizzes: Quiz[] (nested)
  - challenges: Challenge[] (nested)
  - user_progress: object? (if authenticated)
Notes:
  - Returns structured content with multiple section types
  - Includes quizzes and challenges
  - Shows completion status if authenticated

[5.2] POST /api/v1/lessons/{id}/start
Purpose: Mark lesson as started and begin time tracking
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
Output:
  - success: boolean
  - lesson_progress: UserProgress object
  - started_at: timestamp
Notes:
  - Creates or updates progress record
  - Starts time tracking
  - Sets status to 'in_progress'

[5.3] POST /api/v1/lessons/{id}/complete
Purpose: Mark lesson as completed and award XP
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
  - time_spent_seconds: integer (required)
  - score: integer (optional, 0-100)
Output:
  - success: boolean
  - xp_earned: integer
  - level_unlocked: boolean
  - next_level: Level? (if unlocked)
  - achievements: Achievement[] (newly earned)
Notes:
  - Awards XP with difficulty multiplier
  - May unlock next level
  - May trigger achievements
  - Updates streak if applicable
  - Creates activity feed entry

[5.4] GET /api/v1/lessons/{id}/quizzes
Purpose: Get all quiz questions for a lesson
Authentication: Optional
Input:
  - id: uuid (URL parameter)
Output:
  - quizzes: Quiz[] array
  - total_count: integer
Notes:
  - Returns questions without correct answers (for unauthenticated)
  - Includes user's previous attempts if authenticated
  - Ordered by order_index

[5.5] GET /api/v1/lessons/{id}/challenges
Purpose: Get all code challenges for a lesson
Authentication: Optional
Input:
  - id: uuid (URL parameter)
Output:
  - challenges: Challenge[] array
  - total_count: integer
Notes:
  - Returns challenge descriptions and starter code
  - Does not include solution code
  - Shows completion status if authenticated

[5.6] GET /api/v1/lessons/{id}/hints
Purpose: Get available hints for a lesson
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
Output:
  - hints: Hint[] array
  - unlocked_count: integer
  - total_count: integer
Notes:
  - Progressive hints (unlock one at a time)
  - Shows only unlocked hints by default
  - Can request to unlock next hint

[5.7] POST /api/v1/lessons/{id}/hint-unlock
Purpose: Unlock the next hint for a lesson
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
Output:
  - hint: Hint object (newly unlocked)
  - hints_remaining: integer
Notes:
  - Unlocks hints sequentially
  - May reduce XP award for completion
  - Returns error if all hints already unlocked

================================================================================
6. PROGRESS TRACKING ENDPOINTS
================================================================================

[6.1] GET /api/v1/progress/courses/{slug}
Purpose: Get detailed progress for a specific course
Authentication: Required (Bearer token)
Input:
  - slug: string (URL parameter)
Output:
  - course: Course object
  - overall_progress: decimal (percentage)
  - mastery_percentage: decimal
  - levels: LevelProgress[] array
  - total_lessons_completed: integer
  - total_xp_earned: integer
  - time_spent_seconds: integer
  - started_at: timestamp
  - last_activity: timestamp
Notes:
  - Comprehensive course progress details
  - Includes per-level breakdown

[6.2] GET /api/v1/progress/levels/{id}
Purpose: Get completion status for a level
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
Output:
  - level: Level object
  - completion_status: object (easy, medium, hard)
  - mastery_percentage: integer
  - xp_earned: integer
  - lessons_progress: LessonProgress[] array
Notes:
  - Shows which tiers are completed
  - Individual lesson progress within level

[6.3] GET /api/v1/progress/mastery
Purpose: Get overall mastery statistics across all courses
Authentication: Required (Bearer token)
Input:
  - course_slug: string (optional query param)
Output:
  - overall_mastery: decimal
  - by_course: CourseMastery[] array
  - by_language: LanguageMastery[] array
  - total_lessons: integer
  - completed_lessons: integer
  - perfect_lessons: integer (100% score)
Notes:
  - Calculates mastery based on tier completion
  - Can filter by specific course

[6.4] POST /api/v1/progress/sync
Purpose: Sync offline progress from mobile app
Authentication: Required (Bearer token)
Input:
  - entries: ProgressEntry[] array
  - device_id: string
  - synced_at: timestamp
Output:
  - synced_count: integer
  - conflicts: Conflict[] array (if any)
  - updated_progress: UserProgress object
Notes:
  - Batch sync multiple progress entries
  - Conflict resolution: latest timestamp wins
  - Returns server state after sync
  - Used for offline mobile learning

[6.5] GET /api/v1/progress/recent
Purpose: Get user's recent learning activity
Authentication: Required (Bearer token)
Input:
  - limit: integer (optional, default 10, max 50)
  - offset: integer (optional, default 0)
Output:
  - activities: Activity[] array
  - has_more: boolean
Notes:
  - Returns recent lessons, quizzes, challenges
  - Ordered by timestamp descending
  - Includes XP earned per activity

[6.6] GET /api/v1/progress/dashboard
Purpose: Get overview dashboard data for user
Authentication: Required (Bearer token)
Input: None
Output:
  - current_streak: integer
  - total_xp: integer
  - level: integer
  - courses_in_progress: CourseProgress[] array
  - recent_achievements: Achievement[] array
  - next_milestone: Milestone object
  - recommended_lessons: Lesson[] array
Notes:
  - Aggregated data for dashboard display
  - Includes recommendations based on progress

[6.7] GET /api/v1/progress/heatmap
Purpose: Get activity heatmap data (for calendar visualization)
Authentication: Required (Bearer token)
Input:
  - start_date: date (optional, default 1 year ago)
  - end_date: date (optional, default today)
Output:
  - dates: DateActivity[] array
  - longest_streak: integer
  - current_streak: integer
Notes:
  - Used for contribution-style heatmap
  - Shows daily activity intensity
  - Includes XP earned per day

================================================================================
7. QUIZ ENDPOINTS
================================================================================

[7.1] GET /api/v1/quizzes/{id}
Purpose: Get quiz question details
Authentication: Optional
Input:
  - id: uuid (URL parameter)
Output:
  - id: uuid
  - lesson_id: uuid
  - question_type: string
  - question: i18n object
  - options: jsonb? (for multiple choice)
  - code_template: string? (for code questions)
  - hints: i18n[] array
  - previous_attempts: integer (if authenticated)
Notes:
  - Does NOT return correct answer
  - Options shuffled randomly
  - Includes code template for code-based questions

[7.2] POST /api/v1/quizzes/{id}/submit
Purpose: Submit quiz answer for evaluation
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
  - answer: jsonb (format varies by question type)
  - time_taken_seconds: integer
Output:
  - is_correct: boolean
  - score: integer (0-100)
  - feedback: string
  - correct_answer: jsonb (if incorrect)
  - explanation: i18n object
  - xp_earned: integer
Notes:
  - Validates answer based on question type
  - Awards XP only if correct
  - Returns explanation regardless of correctness
  - Tracks attempt count

[7.3] GET /api/v1/quizzes/{id}/results
Purpose: Get results and statistics for quiz attempts
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
Output:
  - quiz: Quiz object
  - total_attempts: integer
  - correct_attempts: integer
  - best_score: integer
  - average_time: integer (seconds)
  - last_attempt: QuizAttempt object
Notes:
  - Shows historical performance
  - Includes detailed breakdown

[7.4] POST /api/v1/quizzes/{id}/retry
Purpose: Reset quiz to allow retry
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
Output:
  - success: boolean
  - quiz: Quiz object (reset)
Notes:
  - Clears previous answer
  - Allows unlimited retries
  - Maintains attempt history

[7.5] GET /api/v1/quizzes/{id}/hint
Purpose: Get next available hint for quiz
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
  - hint_index: integer (which hint to get)
Output:
  - hint: i18n object
  - remaining_hints: integer
Notes:
  - Returns hints progressively
  - May reduce XP reward

================================================================================
8. CHALLENGE ENDPOINTS
================================================================================

[8.1] GET /api/v1/challenges/{id}
Purpose: Get code challenge details
Authentication: Optional
Input:
  - id: uuid (URL parameter)
Output:
  - id: uuid
  - lesson_id: uuid
  - title: i18n object
  - description: i18n object
  - starter_code: string
  - language: string
  - test_cases_count: integer
  - difficulty: string
  - time_limit: integer?
  - hints_available: integer
  - user_status: string? (if authenticated)
Notes:
  - Does NOT return solution code
  - Does NOT return test cases (only count)
  - Includes starter code template

[8.2] POST /api/v1/challenges/{id}/execute
Purpose: Execute code and run against test cases (test run)
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
  - code: string (required)
  - language: string (required)
Output:
  - stdout: string
  - stderr: string
  - execution_time: integer (ms)
  - memory_used: integer (bytes)
  - test_results: TestResult[] array
  - passed: integer
  - failed: integer
  - status: string ('success', 'error', 'timeout')
Notes:
  - Rate limited to 10 executions per minute
  - Runs code in sandboxed Judge0 environment
  - Returns test case results
  - Does NOT save progress or award XP

[8.3] POST /api/v1/challenges/{id}/submit
Purpose: Submit final solution and award XP if correct
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
  - code: string (required)
  - language: string (required)
  - time_spent_seconds: integer
Output:
  - success: boolean
  - all_tests_passed: boolean
  - test_results: TestResult[] array
  - xp_earned: integer
  - achievements: Achievement[] (if any earned)
  - solution_saved: boolean
Notes:
  - Must pass ALL test cases to earn XP
  - Saves submitted code
  - Awards XP with difficulty multiplier
  - May trigger achievements (e.g., "Zero Errors")

[8.4] GET /api/v1/challenges/{id}/hints
Purpose: Get available hints for challenge
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
Output:
  - hints: Hint[] array
  - unlocked_count: integer
  - total_count: integer
Notes:
  - Progressive hints (unlock one at a time)
  - Shows only unlocked hints

[8.5] POST /api/v1/challenges/{id}/hint
Purpose: Unlock next hint for challenge
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
Output:
  - hint: i18n object
  - hints_remaining: integer
  - xp_penalty: integer
Notes:
  - Unlocks hints sequentially
  - May reduce XP reward

[8.6] GET /api/v1/challenges/{id}/solution
Purpose: Get official solution code (only after completing)
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
Output:
  - solution_code: string
  - explanation: i18n object
Notes:
  - Only available after user completes challenge
  - Shows model solution with explanation

[8.7] GET /api/v1/challenges/{id}/submissions
Purpose: Get user's submission history for challenge
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
Output:
  - submissions: Submission[] array
  - total_attempts: integer
  - best_submission: Submission object
Notes:
  - Shows all previous attempts
  - Includes code, results, and timestamp

================================================================================
9. GAMIFICATION ENDPOINTS
================================================================================

[9.1] GET /api/v1/gamification/profile
Purpose: Get user's complete gamification profile
Authentication: Required (Bearer token)
Input: None
Output:
  - xp_total: integer
  - xp_to_next_level: integer
  - level: integer
  - rank_title: string
  - badges: Badge[] array
  - achievements: Achievement[] array
  - streak_current: integer
  - streak_longest: integer
  - mastery_stats: MasteryStats object
Notes:
  - Comprehensive gamification overview
  - Used for profile display

[9.2] GET /api/v1/gamification/achievements
Purpose: Get all achievements with user progress
Authentication: Required (Bearer token)
Input:
  - category: string (optional, filter by category)
  - earned: boolean (optional, filter earned/unearned)
Output:
  - achievements: Achievement[] array
  - earned_count: integer
  - total_count: integer
  - by_category: CategoryStats object
Notes:
  - Shows both earned and unearned achievements
  - Includes progress toward unearned achievements
  - Secret achievements hidden until earned

[9.3] GET /api/v1/gamification/badges
Purpose: Get all badges earned by user
Authentication: Required (Bearer token)
Input:
  - rarity: string (optional, filter by rarity)
Output:
  - badges: Badge[] array
  - by_rarity: RarityStats object
  - displayed_badges: Badge[] (shown on profile)
Notes:
  - Only shows earned badges
  - Includes display order for profile

[9.4] POST /api/v1/gamification/badges/{id}/display
Purpose: Set badge to be displayed on profile
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
  - display_order: integer (optional, position)
Output:
  - success: boolean
  - displayed_badges: Badge[] array
Notes:
  - Max 5 badges can be displayed
  - Updates display order

[9.5] DELETE /api/v1/gamification/badges/{id}/display
Purpose: Remove badge from profile display
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
Output:
  - success: boolean
  - displayed_badges: Badge[] array

[9.6] GET /api/v1/gamification/streak
Purpose: Get detailed streak information
Authentication: Required (Bearer token)
Input: None
Output:
  - current_streak: integer
  - longest_streak: integer
  - last_activity_date: date
  - streak_milestones: Milestone[] array
  - next_milestone: Milestone object
  - is_at_risk: boolean (no activity today)
Notes:
  - Shows streak history and milestones
  - Indicates if streak is at risk

[9.7] POST /api/v1/gamification/daily-claim
Purpose: Claim daily login bonus
Authentication: Required (Bearer token)
Input: None
Output:
  - xp_earned: integer
  - streak_updated: boolean
  - new_streak: integer
  - bonus_applied: boolean
Notes:
  - Can only claim once per day
  - Updates streak counter
  - Awards streak bonus XP

[9.8] GET /api/v1/gamification/xp-history
Purpose: Get XP transaction history
Authentication: Required (Bearer token)
Input:
  - start_date: date (optional)
  - end_date: date (optional)
  - limit: integer (optional, default 50)
  - offset: integer (optional)
Output:
  - transactions: XpTransaction[] array
  - total_xp: integer
  - total_count: integer
Notes:
  - Shows all XP gains with source
  - Filterable by date range
  - Paginated results

[9.9] GET /api/v1/gamification/levels
Purpose: Get level system information
Authentication: Public
Input: None
Output:
  - levels: Level[] array (with XP requirements)
  - rank_titles: RankTitle[] array
Notes:
  - Shows XP requirements for each level
  - Public reference data

[9.10] GET /api/v1/gamification/milestones
Purpose: Get upcoming milestones for user
Authentication: Required (Bearer token)
Input: None
Output:
  - next_level: Milestone object
  - next_achievement: Achievement object
  - next_streak_milestone: Milestone object
  - course_completions: CourseMilestone[] array
Notes:
  - Shows progress toward next goals
  - Motivational data for user

================================================================================
10. SOCIAL ENDPOINTS
================================================================================

[10.1] POST /api/v1/social/follow/{userId}
Purpose: Follow another user
Authentication: Required (Bearer token)
Input:
  - userId: uuid (URL parameter)
Output:
  - success: boolean
  - follow: Follow object
Notes:
  - Cannot follow yourself
  - Duplicate follows ignored
  - Creates notification for followed user

[10.2] DELETE /api/v1/social/follow/{userId}
Purpose: Unfollow a user
Authentication: Required (Bearer token)
Input:
  - userId: uuid (URL parameter)
Output:
  - success: boolean
Notes:
  - Removes follow relationship
  - No notification sent

[10.3] GET /api/v1/social/followers
Purpose: Get list of users following you
Authentication: Required (Bearer token)
Input:
  - limit: integer (optional, default 20)
  - offset: integer (optional)
Output:
  - followers: User[] array
  - total_count: integer
  - has_more: boolean
Notes:
  - Ordered by follow date (newest first)
  - Includes mutual follow status

[10.4] GET /api/v1/social/following
Purpose: Get list of users you're following
Authentication: Required (Bearer token)
Input:
  - limit: integer (optional, default 20)
  - offset: integer (optional)
Output:
  - following: User[] array
  - total_count: integer
  - has_more: boolean
Notes:
  - Ordered by follow date (newest first)
  - Includes mutual follow status

[10.5] GET /api/v1/social/feed
Purpose: Get activity feed from followed users
Authentication: Required (Bearer token)
Input:
  - limit: integer (optional, default 20)
  - offset: integer (optional)
  - activity_type: string (optional, filter by type)
Output:
  - activities: Activity[] array
  - has_more: boolean
Notes:
  - Shows recent activities from followed users
  - Includes: lessons completed, achievements, level ups
  - Ordered by timestamp descending

[10.6] GET /api/v1/social/friends
Purpose: Get mutual follows (friends)
Authentication: Required (Bearer token)
Input: None
Output:
  - friends: User[] array
  - total_count: integer
Notes:
  - Users who follow you AND you follow back
  - Used for friends-only features

[10.7] GET /api/v1/users/{username}/followers
Purpose: Get followers of any user (public)
Authentication: Optional
Input:
  - username: string (URL parameter)
  - limit: integer (optional)
  - offset: integer (optional)
Output:
  - followers: User[] array
  - total_count: integer
Notes:
  - Public endpoint
  - Limited to 100 results for non-owner

[10.8] GET /api/v1/users/{username}/following
Purpose: Get users that a user is following (public)
Authentication: Optional
Input:
  - username: string (URL parameter)
  - limit: integer (optional)
  - offset: integer (optional)
Output:
  - following: User[] array
  - total_count: integer

[10.9] GET /api/v1/social/suggestions
Purpose: Get suggested users to follow
Authentication: Required (Bearer token)
Input:
  - limit: integer (optional, default 10)
Output:
  - suggestions: User[] array
  - reason: string (why suggested)
Notes:
  - Based on similar learning paths
  - Excludes already followed users
  - Algorithm considers: courses, level, activity

================================================================================
11. COMMENT ENDPOINTS
================================================================================

[11.1] GET /api/v1/lessons/{id}/comments
Purpose: Get all comments for a lesson
Authentication: Optional
Input:
  - id: uuid (URL parameter)
  - sort: string (optional, 'newest', 'oldest', 'popular')
  - limit: integer (optional, default 20)
  - offset: integer (optional)
Output:
  - comments: Comment[] array (with nested replies)
  - total_count: integer
  - has_more: boolean
Notes:
  - Returns top-level comments with replies nested
  - Excludes hidden comments (unless own comment)
  - Includes like status if authenticated

[11.2] POST /api/v1/lessons/{id}/comments
Purpose: Create a new comment on a lesson
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
  - content: string (required, max 1000 chars)
Output:
  - comment: Comment object
Notes:
  - Markdown formatting supported
  - Creates notification for lesson author
  - May trigger "Helpful" achievement

[11.3] PUT /api/v1/comments/{id}
Purpose: Update an existing comment
Authentication: Required (Bearer token, must be comment author)
Input:
  - id: uuid (URL parameter)
  - content: string (required)
Output:
  - comment: Comment object (updated)
Notes:
  - Only author can edit
  - Marks as edited with timestamp
  - Max 5 minutes after posting

[11.4] DELETE /api/v1/comments/{id}
Purpose: Delete a comment
Authentication: Required (Bearer token, must be author or admin)
Input:
  - id: uuid (URL parameter)
Output:
  - success: boolean
Notes:
  - Soft delete (marked as deleted)
  - Nested replies remain but show "[deleted]"
  - Moderators can hard delete

[11.5] POST /api/v1/comments/{id}/like
Purpose: Like a comment
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
Output:
  - success: boolean
  - likes_count: integer
Notes:
  - Toggle like (like if not liked, unlike if liked)
  - Creates notification for comment author
  - Duplicate likes ignored

[11.6] DELETE /api/v1/comments/{id}/like
Purpose: Unlike a comment
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
Output:
  - success: boolean
  - likes_count: integer

[11.7] POST /api/v1/comments/{id}/reply
Purpose: Reply to a comment
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter, parent comment)
  - content: string (required)
Output:
  - reply: Comment object (with parent_id set)
Notes:
  - Creates nested reply
  - Creates notification for parent comment author
  - Max nesting depth: 3 levels

[11.8] POST /api/v1/comments/{id}/report
Purpose: Report a comment for moderation
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter)
  - reason: string (required, predefined reasons)
  - details: string (optional, additional context)
Output:
  - success: boolean
  - report_id: uuid
Notes:
  - Creates moderation queue entry
  - Anonymous to comment author
  - Reasons: spam, harassment, inappropriate, other

================================================================================
12. LEADERBOARD ENDPOINTS
================================================================================

[12.1] GET /api/v1/leaderboards/global
Purpose: Get global all-time leaderboard
Authentication: Optional
Input:
  - limit: integer (optional, default 100, max 100)
  - offset: integer (optional)
Output:
  - rankings: User[] array with rank and XP
  - user_rank: integer (if authenticated)
  - total_users: integer
Notes:
  - Ordered by total XP descending
  - Shows top 100 publicly
  - Includes user's rank regardless of position

[12.2] GET /api/v1/leaderboards/friends
Purpose: Get leaderboard of friends only
Authentication: Required (Bearer token)
Input: None
Output:
  - rankings: User[] array with rank and XP
  - user_rank: integer
Notes:
  - Only includes mutual follows
  - Ordered by total XP
  - Always includes authenticated user

[12.3] GET /api/v1/leaderboards/weekly
Purpose: Get weekly leaderboard (resets Monday)
Authentication: Optional
Input:
  - limit: integer (optional, default 100)
Output:
  - rankings: User[] array
  - period_start: date
  - period_end: date
  - user_rank: integer (if authenticated)
Notes:
  - Based on XP earned this week
  - Resets every Monday 00:00 UTC
  - Archived after week ends

[12.4] GET /api/v1/leaderboards/monthly
Purpose: Get monthly leaderboard
Authentication: Optional
Input:
  - limit: integer (optional, default 100)
  - month: string (optional, YYYY-MM, default current)
Output:
  - rankings: User[] array
  - period_start: date
  - period_end: date
  - user_rank: integer (if authenticated)
Notes:
  - Based on XP earned this month
  - Historical months available

[12.5] GET /api/v1/leaderboards/course/{slug}
Purpose: Get leaderboard for specific course
Authentication: Optional
Input:
  - slug: string (URL parameter)
  - limit: integer (optional, default 100)
Output:
  - rankings: User[] array
  - course: Course object
  - user_rank: integer (if authenticated)
Notes:
  - Based on XP earned in course
  - Only users who started course

[12.6] GET /api/v1/leaderboards/rank
Purpose: Get current user's rank across all leaderboards
Authentication: Required (Bearer token)
Input: None
Output:
  - global_rank: integer
  - weekly_rank: integer
  - monthly_rank: integer
  - friends_rank: integer
  - course_ranks: CourseRank[] array
  - percentile: decimal
Notes:
  - Comprehensive rank information
  - Shows user's standing across all boards

[12.7] GET /api/v1/leaderboards/around-user
Purpose: Get leaderboard entries around user's position
Authentication: Required (Bearer token)
Input:
  - type: string (required, 'global', 'weekly', 'monthly')
  - radius: integer (optional, default 5, max 10)
Output:
  - rankings: User[] array
  - user_rank: integer
Notes:
  - Shows N users above and below user
  - Used for context in current position

================================================================================
13. NOTIFICATION ENDPOINTS
================================================================================

[13.1] GET /api/v1/notifications
Purpose: Get user's notifications
Authentication: Required (Bearer token)
Input:
  - unread: boolean (optional, filter unread only)
  - limit: integer (optional, default 20, max 50)
  - offset: integer (optional)
Output:
  - notifications: Notification[] array
  - unread_count: integer
  - has_more: boolean
Notes:
  - Ordered by created_at descending
  - Includes all notification types

[13.2] PUT /api/v1/notifications/{id}/read
Purpose: Mark notification as read
Authentication: Required (Bearer token, must be recipient)
Input:
  - id: uuid (URL parameter)
Output:
  - success: boolean
  - notification: Notification object

[13.3] PUT /api/v1/notifications/read-all
Purpose: Mark all notifications as read
Authentication: Required (Bearer token)
Input: None
Output:
  - success: boolean
  - marked_count: integer

[13.4] DELETE /api/v1/notifications/{id}
Purpose: Delete a notification
Authentication: Required (Bearer token, must be recipient)
Input:
  - id: uuid (URL parameter)
Output:
  - success: boolean

[13.5] DELETE /api/v1/notifications/clear
Purpose: Delete all read notifications
Authentication: Required (Bearer token)
Input: None
Output:
  - success: boolean
  - deleted_count: integer

[13.6] GET /api/v1/notifications/count
Purpose: Get count of unread notifications (for badge)
Authentication: Required (Bearer token)
Input: None
Output:
  - unread_count: integer
Notes:
  - Lightweight endpoint for polling
  - Used for notification badge

[13.7] POST /api/v1/notifications/subscribe
Purpose: Subscribe to push notifications (mobile)
Authentication: Required (Bearer token)
Input:
  - device_token: string (required, FCM/APNS token)
  - device_type: string (required, 'ios' or 'android')
  - device_id: string (optional)
Output:
  - success: boolean
  - subscription_id: uuid
Notes:
  - Registers device for push notifications
  - Multiple devices per user allowed

[13.8] DELETE /api/v1/notifications/unsubscribe
Purpose: Unsubscribe device from push notifications
Authentication: Required (Bearer token)
Input:
  - device_token: string (required)
Output:
  - success: boolean

================================================================================
14. SETTINGS ENDPOINTS
================================================================================

[14.1] GET /api/v1/settings/notifications
Purpose: Get notification preferences
Authentication: Required (Bearer token)
Input: None
Output:
  - email_enabled: boolean
  - push_enabled: boolean
  - preferences: NotificationPreferences object
Notes:
  - Granular control over notification types

[14.2] PUT /api/v1/settings/notifications
Purpose: Update notification preferences
Authentication: Required (Bearer token)
Input:
  - email_enabled: boolean (optional)
  - push_enabled: boolean (optional)
  - streak_reminders: boolean (optional)
  - achievement_notifications: boolean (optional)
  - social_notifications: boolean (optional)
  - comment_replies: boolean (optional)
  - new_followers: boolean (optional)
Output:
  - preferences: NotificationPreferences object
Notes:
  - Partial updates allowed

[14.3] GET /api/v1/settings/privacy
Purpose: Get privacy settings
Authentication: Required (Bearer token)
Input: None
Output:
  - profile_visibility: string ('public', 'friends', 'private')
  - show_progress: boolean
  - show_activity: boolean
  - allow_messages: string ('everyone', 'friends', 'none')
Output:
  - privacy: PrivacySettings object

[14.4] PUT /api/v1/settings/privacy
Purpose: Update privacy settings
Authentication: Required (Bearer token)
Input:
  - profile_visibility: string (optional)
  - show_progress: boolean (optional)
  - show_activity: boolean (optional)
  - allow_messages: string (optional)
Output:
  - privacy: PrivacySettings object

[14.5] GET /api/v1/settings/preferences
Purpose: Get learning preferences
Authentication: Required (Bearer token)
Input: None
Output:
  - daily_goal: integer (minutes)
  - difficulty_preference: string
  - code_editor_settings: object
  - language_preferences: string[]
Notes:
  - Learning-specific preferences

[14.6] PUT /api/v1/settings/preferences
Purpose: Update learning preferences
Authentication: Required (Bearer token)
Input:
  - daily_goal: integer (optional, 5-300 minutes)
  - difficulty_preference: string (optional)
  - code_editor_settings: object (optional)
  - language_preferences: string[] (optional)
Output:
  - preferences: LearningPreferences object

[14.7] POST /api/v1/settings/export-data
Purpose: Request export of all user data (GDPR)
Authentication: Required (Bearer token)
Input: None
Output:
  - export_id: uuid
  - status: string ('pending')
  - estimated_completion: timestamp
Notes:
  - Async process, generates downloadable archive
  - Email sent when ready

[14.8] GET /api/v1/settings/export-data/{id}
Purpose: Check status or download data export
Authentication: Required (Bearer token)
Input:
  - id: uuid (URL parameter, export_id)
Output:
  - status: string ('pending', 'completed', 'failed')
  - download_url: string? (if completed)
  - expires_at: timestamp
Notes:
  - Download URL expires after 7 days

================================================================================
15. SEARCH ENDPOINTS
================================================================================

[15.1] GET /api/v1/search
Purpose: Global search across all content
Authentication: Optional (more results if authenticated)
Input:
  - q: string (required, min 2 chars)
  - type: string (optional, 'all', 'courses', 'lessons', 'users')
  - limit: integer (optional, default 10 per type)
Output:
  - courses: Course[] array
  - lessons: Lesson[] array
  - users: User[] array
  - total_results: integer
Notes:
  - Full-text search
  - Respects privacy settings for user search
  - Results ordered by relevance

[15.2] GET /api/v1/search/courses
Purpose: Search courses only
Authentication: Optional
Input:
  - q: string (required)
  - language: string (optional, filter by programming language)
  - limit: integer (optional, default 20)
  - offset: integer (optional)
Output:
  - courses: Course[] array
  - total_count: integer
  - has_more: boolean
Notes:
  - Searches title, description, language

[15.3] GET /api/v1/search/lessons
Purpose: Search lessons only
Authentication: Optional
Input:
  - q: string (required)
  - course_slug: string (optional, filter by course)
  - difficulty: string (optional, filter by tier)
  - limit: integer (optional, default 20)
  - offset: integer (optional)
Output:
  - lessons: Lesson[] array
  - total_count: integer
  - has_more: boolean
Notes:
  - Searches title, content

[15.4] GET /api/v1/search/users
Purpose: Search users
Authentication: Optional
Input:
  - q: string (required, username or display_name)
  - limit: integer (optional, default 20)
  - offset: integer (optional)
Output:
  - users: User[] array
  - total_count: integer
  - has_more: boolean
Notes:
  - Respects privacy settings
  - Searches username and display_name

[15.5] GET /api/v1/search/autocomplete
Purpose: Get search suggestions as user types
Authentication: Optional
Input:
  - q: string (required, min 2 chars)
  - type: string (optional, default 'all')
Output:
  - suggestions: string[] array
  - results_count: integer
Notes:
  - Fast, lightweight endpoint
  - Returns top 5 suggestions

================================================================================
16. ADMIN - COURSE MANAGEMENT
================================================================================

[16.1] GET /api/v1/admin/courses
Purpose: List all courses (including unpublished)
Authentication: Required (Bearer token, admin role)
Input:
  - published: boolean (optional, filter)
  - limit: integer (optional)
  - offset: integer (optional)
Output:
  - courses: Course[] array
  - total_count: integer
Notes:
  - Shows unpublished courses
  - Includes additional admin metadata

[16.2] POST /api/v1/admin/courses
Purpose: Create new course
Authentication: Required (Bearer token, admin role)
Input:
  - slug: string (required, unique)
  - language: string (required)
  - title: i18n object (required)
  - description: i18n object (required)
  - icon_url: string (optional)
  - color: string (optional, hex color)
  - order_index: integer (optional)
Output:
  - course: Course object
Notes:
  - Created as unpublished by default
  - Slug must be unique

[16.3] PUT /api/v1/admin/courses/{id}
Purpose: Update course details
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
  - [any course fields to update]
Output:
  - course: Course object (updated)
Notes:
  - Partial updates allowed
  - Cannot change slug (would break links)

[16.4] DELETE /api/v1/admin/courses/{id}
Purpose: Delete a course
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
  - confirm: boolean (required, must be true)
Output:
  - success: boolean
Notes:
  - Soft delete (marked as deleted)
  - Cascades to levels and lessons
  - Cannot delete if users have progress

[16.5] POST /api/v1/admin/courses/{id}/publish
Purpose: Publish a course (make visible to users)
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
Output:
  - course: Course object (published)
Notes:
  - Validates course has at least 1 published level
  - Sets is_published = true

[16.6] POST /api/v1/admin/courses/{id}/unpublish
Purpose: Unpublish a course (hide from users)
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
Output:
  - course: Course object (unpublished)

[16.7] GET /api/v1/admin/courses/{id}/stats
Purpose: Get course statistics and analytics
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
Output:
  - total_enrollments: integer
  - active_learners: integer
  - completion_rate: decimal
  - average_time: integer (seconds)
  - popular_lessons: Lesson[] array
  - dropout_points: LessonStats[] array
Notes:
  - Detailed analytics for course improvement

================================================================================
17. ADMIN - LESSON MANAGEMENT
================================================================================

[17.1] POST /api/v1/admin/lessons
Purpose: Create new lesson
Authentication: Required (Bearer token, admin role)
Input:
  - level_id: uuid (required)
  - difficulty: string (required, 'easy', 'medium', 'hard')
  - title: i18n object (required)
  - content: jsonb (required, structured content)
  - xp_reward: integer (required)
  - time_limit_seconds: integer (optional)
  - order_index: integer (optional)
Output:
  - lesson: Lesson object
Notes:
  - Created as unpublished by default
  - Only one lesson per difficulty per level

[17.2] PUT /api/v1/admin/lessons/{id}
Purpose: Update lesson content
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
  - [any lesson fields to update]
Output:
  - lesson: Lesson object (updated)
Notes:
  - Partial updates allowed
  - Version history maintained

[17.3] DELETE /api/v1/admin/lessons/{id}
Purpose: Delete a lesson
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
  - confirm: boolean (required)
Output:
  - success: boolean
Notes:
  - Soft delete
  - Cannot delete if users have completed it

[17.4] POST /api/v1/admin/lessons/ai-generate
Purpose: Generate lesson content using AI
Authentication: Required (Bearer token, admin role)
Input:
  - base_lesson_id: uuid (optional, to create variants)
  - topic: string (required if no base)
  - difficulty: string (required)
  - language: string (required)
Output:
  - generated_content: jsonb
  - estimated_time: integer
  - suggested_xp: integer
Notes:
  - AI-assisted content generation
  - Requires admin review before publishing
  - Uses GPT-4 or similar

[17.5] POST /api/v1/admin/lessons/{id}/clone
Purpose: Clone lesson for difficulty variant
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
  - target_difficulty: string (required)
Output:
  - cloned_lesson: Lesson object
Notes:
  - Creates copy with new difficulty
  - Admin must adjust content appropriately

[17.6] GET /api/v1/admin/lessons/{id}/stats
Purpose: Get lesson statistics
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
Output:
  - total_attempts: integer
  - completion_rate: decimal
  - average_score: decimal
  - average_time: integer
  - common_mistakes: object
Notes:
  - Used for content improvement

[17.7] POST /api/v1/admin/quizzes
Purpose: Create quiz question
Authentication: Required (Bearer token, admin role)
Input:
  - lesson_id: uuid (required)
  - question_type: string (required)
  - question: i18n object (required)
  - options: jsonb (required for multiple choice)
  - correct_answer: jsonb (required)
  - hints: i18n[] (optional)
  - explanation: i18n object (required)
Output:
  - quiz: Quiz object

[17.8] POST /api/v1/admin/challenges
Purpose: Create code challenge
Authentication: Required (Bearer token, admin role)
Input:
  - lesson_id: uuid (required)
  - title: i18n object (required)
  - description: i18n object (required)
  - starter_code: string (required)
  - solution_code: string (required)
  - test_cases: jsonb[] (required)
Output:
  - challenge: Challenge object

================================================================================
18. ADMIN - USER MANAGEMENT
================================================================================

[18.1] GET /api/v1/admin/users
Purpose: List all users with admin details
Authentication: Required (Bearer token, admin role)
Input:
  - role: string (optional, filter by role)
  - status: string (optional, 'active', 'banned', 'deleted')
  - search: string (optional, search by username/email)
  - limit: integer (optional, default 50)
  - offset: integer (optional)
Output:
  - users: User[] array (with sensitive data)
  - total_count: integer
Notes:
  - Includes email, IP addresses, etc.
  - Paginated results

[18.2] GET /api/v1/admin/users/{id}
Purpose: Get detailed user information
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
Output:
  - user: User object (complete)
  - login_history: Login[] array
  - activity_summary: object
  - moderation_history: ModerationAction[] array
Notes:
  - Comprehensive user details for moderation

[18.3] POST /api/v1/admin/users/{id}/ban
Purpose: Ban a user account
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
  - reason: string (required)
  - duration: integer (optional, days, permanent if omitted)
  - notify_user: boolean (optional, default true)
Output:
  - success: boolean
  - ban: Ban object
Notes:
  - Logs admin action
  - Sends email to user if notify_user = true
  - User cannot login while banned

[18.4] POST /api/v1/admin/users/{id}/unban
Purpose: Unban a user account
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
  - reason: string (optional)
Output:
  - success: boolean
Notes:
  - Restores account access
  - Logs admin action

[18.5] PUT /api/v1/admin/users/{id}/role
Purpose: Change user's role
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
  - role: string (required, 'user', 'moderator', 'admin')
Output:
  - user: User object (updated)
Notes:
  - Logs role change
  - Super admin required to create admin users

[18.6] DELETE /api/v1/admin/users/{id}
Purpose: Hard delete user account (admin override)
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
  - confirm: boolean (required, must be true)
  - reason: string (required)
Output:
  - success: boolean
Notes:
  - Permanent deletion
  - Cannot be undone
  - Requires special admin permission

[18.7] POST /api/v1/admin/users/{id}/reset-password
Purpose: Force password reset for user
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
Output:
  - reset_token: string
  - reset_url: string
Notes:
  - Generates reset token
  - Invalidates all sessions
  - Sends email to user

[18.8] GET /api/v1/admin/users/{id}/activity
Purpose: Get detailed activity log for user
Authentication: Required (Bearer token, admin role)
Input:
  - id: uuid (URL parameter)
  - start_date: date (optional)
  - end_date: date (optional)
Output:
  - activities: Activity[] array
  - summary: ActivitySummary object
Notes:
  - Used for moderation and support

================================================================================
19. ADMIN - ANALYTICS
================================================================================

[19.1] GET /api/v1/admin/analytics/dashboard
Purpose: Get key metrics for admin dashboard
Authentication: Required (Bearer token, admin role)
Input:
  - period: string (optional, 'day', 'week', 'month', default 'week')
Output:
  - dau: integer (daily active users)
  - mau: integer (monthly active users)
  - new_users: integer
  - course_completions: integer
  - revenue: decimal (future)
  - top_courses: CourseStats[] array
  - engagement_rate: decimal
Notes:
  - High-level overview metrics
  - Updated hourly

[19.2] GET /api/v1/admin/analytics/courses
Purpose: Get course completion and engagement rates
Authentication: Required (Bearer token, admin role)
Input:
  - course_id: uuid (optional, specific course)
  - start_date: date (optional)
  - end_date: date (optional)
Output:
  - courses: CourseAnalytics[] array
  - averages: AverageStats object
Notes:
  - Completion rates by course
  - Dropout analysis
  - Time to completion

[19.3] GET /api/v1/admin/analytics/users
Purpose: Get user engagement metrics
Authentication: Required (Bearer token, admin role)
Input:
  - start_date: date (optional)
  - end_date: date (optional)
Output:
  - total_users: integer
  - active_users: integer
  - retention_rates: RetentionStats object
  - cohort_analysis: CohortData[] array
Notes:
  - User growth and retention
  - Cohort analysis

[19.4] GET /api/v1/admin/analytics/revenue
Purpose: Get revenue metrics (future feature)
Authentication: Required (Bearer token, admin role)
Input:
  - period: string (optional)
Output:
  - total_revenue: decimal
  - mrr: decimal (monthly recurring revenue)
  - subscriptions: SubscriptionStats object
Notes:
  - For premium tier launch

[19.5] GET /api/v1/admin/analytics/export
Purpose: Export analytics data as CSV
Authentication: Required (Bearer token, admin role)
Input:
  - report_type: string (required)
  - start_date: date (required)
  - end_date: date (required)
Output:
  - download_url: string
  - expires_at: timestamp
Notes:
  - Generates CSV file
  - Available for 24 hours

[19.6] GET /api/v1/admin/analytics/real-time
Purpose: Get real-time activity data
Authentication: Required (Bearer token, admin role)
Input: None
Output:
  - online_users: integer
  - active_sessions: integer
  - recent_activities: Activity[] array
Notes:
  - WebSocket alternative for polling
  - Updated every 10 seconds

================================================================================
20. ADMIN - CONTENT MODERATION
================================================================================

[20.1] GET /api/v1/admin/moderation/reports
Purpose: Get reported content queue
Authentication: Required (Bearer token, admin/moderator role)
Input:
  - status: string (optional, 'pending', 'reviewed', 'dismissed')
  - type: string (optional, 'comment', 'user', 'other')
  - limit: integer (optional)
  - offset: integer (optional)
Output:
  - reports: Report[] array
  - pending_count: integer
Notes:
  - Moderation queue
  - Ordered by created_at ascending (oldest first)

[20.2] PUT /api/v1/admin/moderation/reports/{id}
Purpose: Review and action a report
Authentication: Required (Bearer token, admin/moderator role)
Input:
  - id: uuid (URL parameter)
  - action: string (required, 'approve', 'dismiss', 'escalate')
  - notes: string (optional)
Output:
  - report: Report object (updated)
Notes:
  - Logs moderator action
  - Updates report status

[20.3] PUT /api/v1/admin/moderation/comments/{id}
Purpose: Moderate a comment (hide, pin, delete)
Authentication: Required (Bearer token, admin/moderator role)
Input:
  - id: uuid (URL parameter)
  - action: string (required, 'hide', 'pin', 'delete', 'restore')
  - reason: string (optional)
Output:
  - comment: Comment object (updated)
Notes:
  - Hide: soft hide (author can still see)
  - Pin: featured comment
  - Delete: permanent removal
  - Logs moderation action

[20.4] GET /api/v1/admin/moderation/comments
Purpose: Get all comments for moderation review
Authentication: Required (Bearer token, admin/moderator role)
Input:
  - reported: boolean (optional, only reported comments)
  - hidden: boolean (optional, only hidden comments)
  - limit: integer (optional)
  - offset: integer (optional)
Output:
  - comments: Comment[] array
  - total_count: integer
Notes:
  - Used for proactive moderation

[20.5] GET /api/v1/admin/moderation/users
Purpose: Get users flagged for review
Authentication: Required (Bearer token, admin/moderator role)
Input:
  - reason: string (optional, 'spam', 'abuse', 'suspicious')
Output:
  - users: User[] array
  - flags: Flag[] array
Notes:
  - Automated flagging system
  - Requires moderator review

[20.6] POST /api/v1/admin/moderation/bulk-action
Purpose: Perform bulk moderation action
Authentication: Required (Bearer token, admin role)
Input:
  - item_ids: uuid[] (required)
  - item_type: string (required, 'comment', 'user')
  - action: string (required)
  - reason: string (optional)
Output:
  - success: boolean
  - processed_count: integer
  - failed_items: uuid[] array
Notes:
  - Bulk operations for efficiency
  - Logs each action individually

================================================================================
21. ADMIN - SYSTEM CONFIGURATION
================================================================================

[21.1] GET /api/v1/admin/config
Purpose: Get system configuration
Authentication: Required (Bearer token, admin role)
Input: None
Output:
  - config: Config object (all settings)
Notes:
  - System-wide settings

[21.2] PUT /api/v1/admin/config
Purpose: Update system configuration
Authentication: Required (Bearer token, admin role)
Input:
  - [configuration keys to update]
Output:
  - config: Config object (updated)
Notes:
  - Partial updates allowed
  - Some settings require restart

[21.3] GET /api/v1/admin/achievements
Purpose: List all achievements (for management)
Authentication: Required (Bearer token, admin role)
Input: None
Output:
  - achievements: Achievement[] array
Notes:
  - Includes secret achievements

[21.4] POST /api/v1/admin/achievements
Purpose: Create new achievement
Authentication: Required (Bearer token, admin role)
Input:
  - slug: string (required, unique)
  - name: i18n object (required)
  - description: i18n object (required)
  - icon_url: string (required)
  - category: string (required)
  - xp_reward: integer (required)
  - criteria: jsonb (required, evaluation rules)
  - is_secret: boolean (optional)
Output:
  - achievement: Achievement object

[21.5] GET /api/v1/admin/badges
Purpose: List all badges
Authentication: Required (Bearer token, admin role)
Input: None
Output:
  - badges: Badge[] array

[21.6] POST /api/v1/admin/badges
Purpose: Create new badge
Authentication: Required (Bearer token, admin role)
Input:
  - slug: string (required, unique)
  - name: i18n object (required)
  - description: i18n object (required)
  - icon_url: string (required)
  - rarity: string (required)
  - criteria: jsonb (required)
Output:
  - badge: Badge object

================================================================================
22. HEALTH & SYSTEM ENDPOINTS
================================================================================

[22.1] GET /api/v1/health
Purpose: Health check endpoint
Authentication: Public
Input: None
Output:
  - status: string ('healthy', 'degraded', 'down')
  - timestamp: timestamp
  - version: string
Notes:
  - Used by load balancers and monitoring
  - Returns 200 if healthy, 503 if down

[22.2] GET /api/v1/health/detailed
Purpose: Detailed health check with component status
Authentication: Required (Bearer token, admin role)
Input: None
Output:
  - status: string
  - components: Component[] array
    - database: status
    - redis: status
    - judge0: status
    - storage: status
  - uptime: integer (seconds)
Notes:
  - Detailed system health
  - Admin only

[22.3] GET /api/v1/version
Purpose: Get API version information
Authentication: Public
Input: None
Output:
  - version: string
  - build: string
  - environment: string
Notes:
  - Version info for debugging

[22.4] GET /api/v1/status
Purpose: Get system status and maintenance mode
Authentication: Public
Input: None
Output:
  - operational: boolean
  - maintenance_mode: boolean
  - message: string? (if maintenance)
  - estimated_restore: timestamp? (if maintenance)
Notes:
  - Used to show maintenance page

================================================================================
SUMMARY
================================================================================

Total Endpoints: 220+

Breakdown by Module:
- Authentication: 15 endpoints
- User Management: 9 endpoints
- Courses: 6 endpoints
- Levels: 4 endpoints
- Lessons: 7 endpoints
- Progress: 7 endpoints
- Quizzes: 5 endpoints
- Challenges: 7 endpoints
- Gamification: 10 endpoints
- Social: 9 endpoints
- Comments: 8 endpoints
- Leaderboards: 7 endpoints
- Notifications: 8 endpoints
- Settings: 8 endpoints
- Search: 5 endpoints
- Admin - Courses: 7 endpoints
- Admin - Lessons: 8 endpoints
- Admin - Users: 8 endpoints
- Admin - Analytics: 6 endpoints
- Admin - Moderation: 6 endpoints
- Admin - Config: 6 endpoints
- Health/System: 4 endpoints

Authentication Requirements:
- Public: ~30 endpoints
- User (authenticated): ~120 endpoints
- Admin/Moderator only: ~70 endpoints

Rate Limits (General):
- Public endpoints: 60 requests/minute
- Authenticated endpoints: 100 requests/minute
- Authentication endpoints: 5 requests/minute
- Code execution: 10 requests/minute
- Search: 20 requests/minute

All endpoints return JSON responses following the standard format:
{
  "success": boolean,
  "data": object | array,
  "message": string?,
  "meta": { pagination?, timestamp, ... }
}

Error responses include:
{
  "success": false,
  "error": {
    "code": string,
    "message": string,
    "details": object?
  }
}

================================================================================
END OF DOCUMENT
================================================================================
