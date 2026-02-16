"use client";

import { useState } from "react";
import { Bell, Save } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { SectionCard, NeoToggle } from "../_components/settings-ui";

export default function SettingsNotificationsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [challengeAlerts, setChallengeAlerts] = useState(true);
  const [leaderboardChanges, setLeaderboardChanges] = useState(false);
  const [newFollowers, setNewFollowers] = useState(true);

  return (
    <>
      <SectionCard title="Email Notifications" icon={<Bell size={18} className="text-primary" />}>
        <div className="space-y-1 divide-y-2 divide-border">
          <NeoToggle
            enabled={emailNotifications}
            onToggle={() => setEmailNotifications(!emailNotifications)}
            label="Email Notifications"
            description="Receive updates about course progress and new content."
          />
          <NeoToggle
            enabled={weeklyDigest}
            onToggle={() => setWeeklyDigest(!weeklyDigest)}
            label="Weekly Digest"
            description="Summary of your weekly learning progress and leaderboard changes."
          />
          <NeoToggle
            enabled={courseUpdates}
            onToggle={() => setCourseUpdates(!courseUpdates)}
            label="Course Updates"
            description="Get notified when new lessons or courses are added."
          />
        </div>
      </SectionCard>

      <SectionCard title="Push Notifications" icon={<Bell size={18} className="text-primary" />}>
        <div className="space-y-1 divide-y-2 divide-border">
          <NeoToggle
            enabled={pushNotifications}
            onToggle={() => setPushNotifications(!pushNotifications)}
            label="Push Notifications"
            description="Receive browser push notifications."
          />
          <NeoToggle
            enabled={streakReminders}
            onToggle={() => setStreakReminders(!streakReminders)}
            label="Streak Reminders"
            description="Daily reminder to keep your learning streak alive."
          />
          <NeoToggle
            enabled={challengeAlerts}
            onToggle={() => setChallengeAlerts(!challengeAlerts)}
            label="Challenge Alerts"
            description="Get notified when new daily or weekly challenges drop."
          />
          <NeoToggle
            enabled={leaderboardChanges}
            onToggle={() => setLeaderboardChanges(!leaderboardChanges)}
            label="Leaderboard Changes"
            description="Notify when your rank changes on the leaderboard."
          />
          <NeoToggle
            enabled={newFollowers}
            onToggle={() => setNewFollowers(!newFollowers)}
            label="New Followers"
            description="Get notified when someone follows your profile."
          />
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <NeoButton variant="primary" size="md" className="rounded-xl">
          <Save size={16} className="mr-2" /> Save Preferences
        </NeoButton>
      </div>
    </>
  );
}
