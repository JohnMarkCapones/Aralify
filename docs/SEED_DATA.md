# Aralify Seed Data

Sample data for all 31 database tables. Use this for development and testing.

---

## 1. Users & Authentication

### Users

| id | email | username | displayName | locale | xpTotal | level | streakCurrent | role |
|----|-------|----------|-------------|--------|---------|-------|---------------|------|
| user_001 | juan@example.com | juandelacruz | Juan Dela Cruz | fil | 2500 | 5 | 7 | USER |
| user_002 | maria@example.com | maria_dev | Maria Santos | en | 8500 | 12 | 30 | USER |
| user_003 | admin@aralify.com | admin | Admin User | en | 0 | 1 | 0 | ADMIN |
| user_004 | mod@aralify.com | moderator | Mod User | en | 1200 | 3 | 5 | MODERATOR |
| user_005 | newbie@example.com | newbie_coder | New Learner | fil | 100 | 1 | 1 | USER |

### UserSessions

| id | userId | token | deviceInfo | ipAddress | expiresAt |
|----|--------|-------|------------|-----------|-----------|
| sess_001 | user_001 | jwt_token_abc123 | Chrome/Windows | 192.168.1.1 | 2026-02-28 |
| sess_002 | user_002 | jwt_token_def456 | Safari/iOS | 192.168.1.2 | 2026-02-28 |
| sess_003 | user_001 | jwt_token_ghi789 | Mobile App/Android | 192.168.1.3 | 2026-02-28 |

### PasswordResetTokens

| id | userId | token | expiresAt | usedAt |
|----|--------|-------|-----------|--------|
| prt_001 | user_005 | reset_token_xyz | 2026-01-31T23:59:59Z | null |

### OAuthAccounts

| id | userId | provider | providerId |
|----|--------|----------|------------|
| oauth_001 | user_001 | google | google_12345 |
| oauth_002 | user_002 | github | github_67890 |
| oauth_003 | user_002 | google | google_11111 |

---

## 2. Courses & Content

### Courses

| id | slug | language | titleEn | titleFil | descriptionEn | iconUrl | color | estimatedHours | isPublished |
|----|------|----------|---------|----------|---------------|---------|-------|----------------|-------------|
| course_001 | python-basics | python | Python Basics | Batayan ng Python | Learn Python from scratch | /icons/python.svg | #3776AB | 20 | true |
| course_002 | javascript-fundamentals | javascript | JavaScript Fundamentals | Batayan ng JavaScript | Master JavaScript basics | /icons/js.svg | #F7DF1E | 25 | true |
| course_003 | web-development | html | Web Development | Pagbuo ng Web | Build websites from scratch | /icons/web.svg | #E34F26 | 30 | true |
| course_004 | data-structures | python | Data Structures | Istruktura ng Data | Learn DS with Python | /icons/ds.svg | #4B8BBE | 40 | false |

### Levels

| id | courseId | slug | titleEn | titleFil | orderIndex | isPublished |
|----|----------|------|---------|----------|------------|-------------|
| level_001 | course_001 | variables | Variables & Data Types | Mga Variable at Uri ng Data | 0 | true |
| level_002 | course_001 | control-flow | Control Flow | Daloy ng Kontrol | 1 | true |
| level_003 | course_001 | functions | Functions | Mga Function | 2 | true |
| level_004 | course_001 | loops | Loops & Iteration | Mga Loop | 3 | true |
| level_005 | course_002 | js-basics | JS Basics | Batayan ng JS | 0 | true |
| level_006 | course_002 | dom-manipulation | DOM Manipulation | Pagmamanipula ng DOM | 1 | true |
| level_007 | course_003 | html-basics | HTML Basics | Batayan ng HTML | 0 | true |

### Lessons

| id | levelId | difficulty | titleEn | titleFil | xpReward | estimatedTimeMinutes | isPublished |
|----|---------|------------|---------|----------|----------|----------------------|-------------|
| lesson_001 | level_001 | EASY | Introduction to Variables | Panimula sa mga Variable | 50 | 10 | true |
| lesson_002 | level_001 | MEDIUM | Working with Numbers | Paggamit ng mga Numero | 100 | 15 | true |
| lesson_003 | level_001 | HARD | Type Conversion Mastery | Pag-master ng Type Conversion | 150 | 20 | true |
| lesson_004 | level_002 | EASY | If Statements | Mga If Statement | 50 | 10 | true |
| lesson_005 | level_002 | MEDIUM | Else and Elif | Else at Elif | 100 | 15 | true |
| lesson_006 | level_002 | HARD | Nested Conditions | Nested na Kondisyon | 150 | 20 | true |
| lesson_007 | level_003 | EASY | Creating Functions | Paggawa ng mga Function | 50 | 10 | true |
| lesson_008 | level_003 | MEDIUM | Parameters & Return | Mga Parameter at Return | 100 | 15 | true |
| lesson_009 | level_003 | HARD | Advanced Functions | Advanced na mga Function | 150 | 20 | true |
| lesson_010 | level_005 | EASY | JavaScript Variables | Mga Variable sa JavaScript | 50 | 10 | true |
| lesson_011 | level_005 | MEDIUM | JS Data Types | Mga Uri ng Data sa JS | 100 | 15 | true |
| lesson_012 | level_007 | EASY | HTML Structure | Istruktura ng HTML | 50 | 10 | true |

---

## 3. Progress Tracking

### UserCourseProgress

| id | userId | courseId | completionPercentage | masteryPercentage | totalXpEarned | timeSpentSeconds | startedAt |
|----|--------|----------|----------------------|-------------------|---------------|------------------|-----------|
| ucp_001 | user_001 | course_001 | 45.5 | 33.3 | 750 | 7200 | 2026-01-01 |
| ucp_002 | user_001 | course_002 | 10.0 | 5.0 | 100 | 1800 | 2026-01-15 |
| ucp_003 | user_002 | course_001 | 100.0 | 100.0 | 2500 | 36000 | 2025-12-01 |
| ucp_004 | user_002 | course_002 | 75.0 | 60.0 | 1500 | 18000 | 2025-12-15 |
| ucp_005 | user_005 | course_001 | 5.0 | 0.0 | 50 | 600 | 2026-01-30 |

### UserLevelUnlocks

| id | userId | levelId | unlockedAt |
|----|--------|---------|------------|
| ulu_001 | user_001 | level_001 | 2026-01-01 |
| ulu_002 | user_001 | level_002 | 2026-01-05 |
| ulu_003 | user_001 | level_005 | 2026-01-15 |
| ulu_004 | user_002 | level_001 | 2025-12-01 |
| ulu_005 | user_002 | level_002 | 2025-12-05 |
| ulu_006 | user_002 | level_003 | 2025-12-10 |
| ulu_007 | user_002 | level_004 | 2025-12-15 |
| ulu_008 | user_005 | level_001 | 2026-01-30 |

### UserLessonProgress

| id | userId | lessonId | status | score | xpEarned | timeSpentSeconds | completedAt |
|----|--------|----------|--------|-------|----------|------------------|-------------|
| ulp_001 | user_001 | lesson_001 | COMPLETED | 100 | 50 | 480 | 2026-01-02 |
| ulp_002 | user_001 | lesson_002 | COMPLETED | 85 | 100 | 720 | 2026-01-03 |
| ulp_003 | user_001 | lesson_003 | IN_PROGRESS | null | 0 | 300 | null |
| ulp_004 | user_001 | lesson_004 | COMPLETED | 90 | 50 | 540 | 2026-01-06 |
| ulp_005 | user_002 | lesson_001 | COMPLETED | 100 | 50 | 360 | 2025-12-01 |
| ulp_006 | user_002 | lesson_002 | COMPLETED | 100 | 100 | 600 | 2025-12-02 |
| ulp_007 | user_002 | lesson_003 | COMPLETED | 95 | 150 | 900 | 2025-12-03 |
| ulp_008 | user_005 | lesson_001 | IN_PROGRESS | null | 0 | 300 | null |

---

## 4. Quizzes & Challenges

### Quizzes

| id | lessonId | questionType | questionEn | questionFil | correctAnswer | orderIndex |
|----|----------|--------------|------------|-------------|---------------|------------|
| quiz_001 | lesson_001 | MULTIPLE_CHOICE | What keyword is used to create a variable in Python? | Anong keyword ang ginagamit sa paggawa ng variable sa Python? | {"answer": "No keyword needed"} | 0 |
| quiz_002 | lesson_001 | TRUE_FALSE | Python is a statically typed language. | Ang Python ay isang statically typed na wika. | {"answer": false} | 1 |
| quiz_003 | lesson_002 | CODE_OUTPUT | What is the output of: print(5 + 3) | Ano ang output ng: print(5 + 3) | {"answer": "8"} | 0 |
| quiz_004 | lesson_002 | FILL_BLANK | To convert a string to integer, use ___() | Para i-convert ang string sa integer, gamitin ang ___() | {"answer": "int"} | 1 |
| quiz_005 | lesson_004 | MULTIPLE_CHOICE | Which operator checks equality? | Aling operator ang nag-check ng pagkakapantay? | {"answer": "=="} | 0 |

**Quiz Options Example (quiz_001):**
```json
{
  "options": [
    {"id": "a", "text": "var"},
    {"id": "b", "text": "let"},
    {"id": "c", "text": "const"},
    {"id": "d", "text": "No keyword needed"}
  ]
}
```

### QuizAttempts

| id | userId | quizId | answer | isCorrect | score | timeTakenSeconds | hintsUsed |
|----|--------|--------|--------|-----------|-------|------------------|-----------|
| qa_001 | user_001 | quiz_001 | {"answer": "No keyword needed"} | true | 100 | 15 | 0 |
| qa_002 | user_001 | quiz_002 | {"answer": true} | false | 0 | 8 | 0 |
| qa_003 | user_001 | quiz_002 | {"answer": false} | true | 100 | 5 | 1 |
| qa_004 | user_002 | quiz_001 | {"answer": "No keyword needed"} | true | 100 | 10 | 0 |
| qa_005 | user_005 | quiz_001 | {"answer": "var"} | false | 0 | 30 | 0 |

### CodeChallenges

| id | lessonId | titleEn | titleFil | language | starterCode | solutionCode |
|----|----------|---------|----------|----------|-------------|--------------|
| cc_001 | lesson_001 | Create a Variable | Gumawa ng Variable | python | # Create a variable named 'greeting' | greeting = "Hello, World!" |
| cc_002 | lesson_002 | Calculate Sum | Kalkulahin ang Kabuuan | python | # Calculate the sum of a and b | result = a + b |
| cc_003 | lesson_003 | Type Converter | Tagapag-convert ng Uri | python | # Convert the string to int | num = int(string_num) |
| cc_004 | lesson_007 | Hello Function | Function na Hello | python | # Create a function that returns greeting | def greet(name):\n    return f"Hello, {name}!" |

**Test Cases Example (cc_002):**
```json
{
  "testCases": [
    {"input": {"a": 5, "b": 3}, "expected": 8},
    {"input": {"a": 10, "b": -5}, "expected": 5},
    {"input": {"a": 0, "b": 0}, "expected": 0}
  ]
}
```

### ChallengeSubmissions

| id | userId | challengeId | code | status | testsPassed | testsTotal | executionTimeMs | xpEarned |
|----|--------|-------------|------|--------|-------------|------------|-----------------|----------|
| cs_001 | user_001 | cc_001 | greeting = "Hello!" | ACCEPTED | 3 | 3 | 45 | 50 |
| cs_002 | user_001 | cc_002 | result = a - b | WRONG_ANSWER | 1 | 3 | 38 | 0 |
| cs_003 | user_001 | cc_002 | result = a + b | ACCEPTED | 3 | 3 | 42 | 100 |
| cs_004 | user_002 | cc_001 | greeting = "Hi there!" | ACCEPTED | 3 | 3 | 35 | 50 |
| cs_005 | user_005 | cc_001 | greeting = 123 | WRONG_ANSWER | 0 | 3 | 40 | 0 |

---

## 5. Gamification

### XpTransactions

| id | userId | amount | sourceType | sourceId | description | multiplier |
|----|--------|--------|------------|----------|-------------|------------|
| xp_001 | user_001 | 50 | LESSON_COMPLETE | lesson_001 | Completed: Introduction to Variables | 1.0 |
| xp_002 | user_001 | 200 | LESSON_COMPLETE | lesson_002 | Completed: Working with Numbers (Medium) | 2.0 |
| xp_003 | user_001 | 100 | QUIZ_CORRECT | quiz_001 | Quiz: Variable keyword | 1.0 |
| xp_004 | user_001 | 50 | STREAK_BONUS | null | 7-day streak bonus | 1.0 |
| xp_005 | user_002 | 450 | LESSON_COMPLETE | lesson_003 | Completed: Type Conversion Mastery (Hard) | 3.0 |
| xp_006 | user_002 | 500 | ACHIEVEMENT | ach_001 | Achievement: First Steps | 1.0 |
| xp_007 | user_005 | 50 | DAILY_LOGIN | null | Daily login bonus | 1.0 |

### Achievements

| id | slug | nameEn | nameFil | category | xpReward | isSecret |
|----|------|--------|---------|----------|----------|----------|
| ach_001 | first-steps | First Steps | Unang Hakbang | onboarding | 500 | false |
| ach_002 | week-warrior | Week Warrior | Mandirigma ng Linggo | streak | 1000 | false |
| ach_003 | course-master | Course Master | Master ng Kurso | completion | 2000 | false |
| ach_004 | speed-demon | Speed Demon | Mabilis na Demonyo | challenge | 750 | false |
| ach_005 | perfectionist | Perfectionist | Perpeksyunista | accuracy | 1500 | false |
| ach_006 | secret-explorer | Secret Explorer | Lihim na Manlalakbay | hidden | 2500 | true |

**Criteria Example (ach_002):**
```json
{
  "type": "streak",
  "threshold": 7,
  "comparison": "gte"
}
```

### UserAchievements

| id | userId | achievementId | earnedAt |
|----|--------|---------------|----------|
| ua_001 | user_001 | ach_001 | 2026-01-02 |
| ua_002 | user_001 | ach_002 | 2026-01-08 |
| ua_003 | user_002 | ach_001 | 2025-12-01 |
| ua_004 | user_002 | ach_002 | 2025-12-08 |
| ua_005 | user_002 | ach_003 | 2025-12-20 |
| ua_006 | user_002 | ach_005 | 2025-12-15 |

### Badges

| id | slug | nameEn | nameFil | rarity | iconUrl |
|----|------|--------|---------|--------|---------|
| badge_001 | python-novice | Python Novice | Baguhan sa Python | COMMON | /badges/python-novice.svg |
| badge_002 | python-intermediate | Python Intermediate | Intermediate sa Python | UNCOMMON | /badges/python-mid.svg |
| badge_003 | python-expert | Python Expert | Eksperto sa Python | RARE | /badges/python-expert.svg |
| badge_004 | streak-master | Streak Master | Master ng Streak | EPIC | /badges/streak-master.svg |
| badge_005 | code-legend | Code Legend | Alamat ng Code | LEGENDARY | /badges/legend.svg |
| badge_006 | js-novice | JS Novice | Baguhan sa JS | COMMON | /badges/js-novice.svg |

### UserBadges

| id | userId | badgeId | earnedAt | isDisplayed | displayOrder |
|----|--------|---------|----------|-------------|--------------|
| ub_001 | user_001 | badge_001 | 2026-01-05 | true | 1 |
| ub_002 | user_002 | badge_001 | 2025-12-02 | false | 0 |
| ub_003 | user_002 | badge_002 | 2025-12-10 | true | 1 |
| ub_004 | user_002 | badge_003 | 2025-12-20 | true | 2 |
| ub_005 | user_002 | badge_004 | 2026-01-01 | true | 3 |

### StreakHistory

| id | userId | date | activityCount | xpEarned | streakDay |
|----|--------|------|---------------|----------|-----------|
| sh_001 | user_001 | 2026-01-24 | 3 | 250 | 1 |
| sh_002 | user_001 | 2026-01-25 | 2 | 150 | 2 |
| sh_003 | user_001 | 2026-01-26 | 4 | 350 | 3 |
| sh_004 | user_001 | 2026-01-27 | 1 | 100 | 4 |
| sh_005 | user_001 | 2026-01-28 | 2 | 200 | 5 |
| sh_006 | user_001 | 2026-01-29 | 3 | 300 | 6 |
| sh_007 | user_001 | 2026-01-30 | 2 | 250 | 7 |
| sh_008 | user_002 | 2026-01-30 | 5 | 500 | 30 |

---

## 6. Social Features

### Follows

| id | followerId | followingId | createdAt |
|----|------------|-------------|-----------|
| fol_001 | user_001 | user_002 | 2026-01-10 |
| fol_002 | user_005 | user_001 | 2026-01-30 |
| fol_003 | user_005 | user_002 | 2026-01-30 |
| fol_004 | user_002 | user_001 | 2026-01-15 |

### Activities

| id | userId | activityType | entityType | entityId | isPublic |
|----|--------|--------------|------------|----------|----------|
| act_001 | user_001 | COURSE_STARTED | course | course_001 | true |
| act_002 | user_001 | LESSON_COMPLETED | lesson | lesson_001 | true |
| act_003 | user_001 | ACHIEVEMENT_EARNED | achievement | ach_001 | true |
| act_004 | user_001 | STREAK_MILESTONE | null | null | true |
| act_005 | user_002 | COURSE_COMPLETED | course | course_001 | true |
| act_006 | user_002 | BADGE_EARNED | badge | badge_003 | true |
| act_007 | user_005 | COURSE_STARTED | course | course_001 | true |

**Metadata Example (act_004):**
```json
{
  "streakDays": 7,
  "message": "7-day streak achieved!"
}
```

---

## 7. Comments

### Comments

| id | userId | lessonId | parentId | content | isEdited | isPinned |
|----|--------|----------|----------|---------|----------|----------|
| com_001 | user_001 | lesson_001 | null | Great explanation of variables! Very clear. | false | false |
| com_002 | user_002 | lesson_001 | null | Tip: Try using meaningful variable names like 'user_age' instead of 'x'. | false | true |
| com_003 | user_005 | lesson_001 | com_001 | Thanks! This helped me understand better. | false | false |
| com_004 | user_001 | lesson_002 | null | The integer conversion part was tricky for me at first. | true | false |
| com_005 | user_002 | lesson_002 | com_004 | Try using int() and float() - practice makes perfect! | false | false |

### CommentLikes

| id | userId | commentId | createdAt |
|----|--------|-----------|-----------|
| cl_001 | user_002 | com_001 | 2026-01-05 |
| cl_002 | user_005 | com_002 | 2026-01-30 |
| cl_003 | user_001 | com_002 | 2026-01-06 |
| cl_004 | user_001 | com_005 | 2026-01-08 |
| cl_005 | user_005 | com_001 | 2026-01-30 |

### CommentReports

| id | userId | commentId | reason | details | status | reviewedBy |
|----|--------|-----------|--------|---------|--------|------------|
| cr_001 | user_005 | com_004 | SPAM | Looks like spam content | DISMISSED | user_004 |

---

## 8. Leaderboards

### LeaderboardSnapshots

| id | leaderboardType | periodStart | periodEnd | rankings |
|----|-----------------|-------------|-----------|----------|
| lb_001 | GLOBAL_WEEKLY | 2026-01-20 | 2026-01-26 | (see below) |
| lb_002 | GLOBAL_MONTHLY | 2026-01-01 | 2026-01-31 | (see below) |
| lb_003 | COURSE_SPECIFIC | 2026-01-01 | 2026-01-31 | (see below) |

**Rankings Example (lb_001):**
```json
{
  "rankings": [
    {"rank": 1, "userId": "user_002", "xp": 1500, "username": "maria_dev"},
    {"rank": 2, "userId": "user_001", "xp": 750, "username": "juandelacruz"},
    {"rank": 3, "userId": "user_005", "xp": 100, "username": "newbie_coder"}
  ]
}
```

---

## 9. Notifications

### Notifications

| id | userId | type | title | message | isRead |
|----|--------|------|-------|---------|--------|
| notif_001 | user_001 | ACHIEVEMENT_EARNED | Achievement Unlocked! | You earned "First Steps"! | true |
| notif_002 | user_001 | STREAK_REMINDER | Keep your streak! | Don't forget to practice today! | false |
| notif_003 | user_001 | NEW_FOLLOWER | New Follower | newbie_coder started following you | true |
| notif_004 | user_002 | BADGE_EARNED | New Badge! | You earned "Python Expert"! | true |
| notif_005 | user_005 | LEVEL_UP | Level Up! | You reached Level 2! | false |
| notif_006 | user_001 | COMMENT_REPLY | New Reply | newbie_coder replied to your comment | false |

### PushSubscriptions

| id | userId | deviceToken | deviceType | deviceId | isActive |
|----|--------|-------------|------------|----------|----------|
| push_001 | user_001 | fcm_token_abc123 | ANDROID | device_001 | true |
| push_002 | user_001 | apns_token_xyz789 | IOS | device_002 | true |
| push_003 | user_002 | fcm_token_def456 | ANDROID | device_003 | true |
| push_004 | user_005 | apns_token_ghi012 | IOS | device_004 | true |

---

## 10. Settings

### UserSettings

| id | userId | theme | codeEditorTheme | fontSize | dailyGoalMins | difficultyPref |
|----|--------|-------|-----------------|----------|---------------|----------------|
| us_001 | user_001 | dark | monokai | 14 | 30 | MEDIUM |
| us_002 | user_002 | auto | vs-dark | 16 | 60 | HARD |
| us_003 | user_004 | light | github | 14 | 15 | EASY |
| us_004 | user_005 | auto | vs-dark | 18 | 15 | EASY |

### NotificationSettings

| id | userId | emailEnabled | pushEnabled | streakReminders | achievementNotifs | socialNotifs |
|----|--------|--------------|-------------|-----------------|-------------------|--------------|
| ns_001 | user_001 | true | true | true | true | true |
| ns_002 | user_002 | true | true | false | true | true |
| ns_003 | user_004 | false | true | false | true | false |
| ns_004 | user_005 | true | true | true | true | true |

### PrivacySettings

| id | userId | profileVisibility | showProgress | showActivity | allowMessages |
|----|--------|-------------------|--------------|--------------|---------------|
| ps_001 | user_001 | PUBLIC | true | true | EVERYONE |
| ps_002 | user_002 | PUBLIC | true | true | FRIENDS |
| ps_003 | user_004 | PRIVATE | false | false | NONE |
| ps_004 | user_005 | PUBLIC | true | true | EVERYONE |

---

## Data Relationships Summary

```
Users
├── UserSessions (1:N)
├── OAuthAccounts (1:N)
├── UserCourseProgress (1:N) → Courses
├── UserLevelUnlocks (1:N) → Levels
├── UserLessonProgress (1:N) → Lessons
├── QuizAttempts (1:N) → Quizzes
├── ChallengeSubmissions (1:N) → CodeChallenges
├── XpTransactions (1:N)
├── UserAchievements (1:N) → Achievements
├── UserBadges (1:N) → Badges
├── StreakHistory (1:N)
├── Follows (follower/following)
├── Activities (1:N)
├── Comments (1:N) → Lessons
├── Notifications (1:N)
├── Settings (1:1)
└── NotificationSettings (1:1)

Courses
├── Levels (1:N)
│   └── Lessons (1:N)
│       ├── Quizzes (1:N)
│       ├── CodeChallenges (1:N)
│       └── Comments (1:N)
└── UserCourseProgress (1:N)
```

---

## Notes

- All IDs use CUID format in actual implementation
- Dates shown in simplified format (actual: ISO 8601)
- JSON fields show structure examples
- Passwords are hashed (bcrypt) - not shown
- Tokens are JWT/UUID in production
