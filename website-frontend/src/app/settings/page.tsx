"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  User,
  Shield,
  Bell,
  Palette,
  Eye,
  Camera,
  Save,
  Lock,
  Mail,
  Trash2,
  AlertTriangle,
  Sun,
  Moon,
  Monitor,
  ChevronRight,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { NeoButton } from "@/components/ui/neo-button";
import { GridPattern, DotPattern, FloatingShapes } from "@/components/effects";
import { useMounted } from "@/hooks/use-mounted";

// ── Types ──────────────────────────────────────────────────────────────────

type SettingsSection = "profile" | "account" | "notifications" | "appearance" | "privacy";

// ── Toggle Switch ──────────────────────────────────────────────────────────

function NeoToggle({
  enabled,
  onToggle,
  label,
  description,
}: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm">{label}</p>
        {description && (
          <p className="text-xs font-medium text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full neo-brutal-border transition-colors duration-200 ${
          enabled ? "bg-primary" : "bg-muted"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`inline-block h-5 w-5 rounded-full neo-brutal-border bg-white shadow-sm ${
            enabled ? "ml-7" : "ml-1"
          }`}
        />
      </button>
    </div>
  );
}

// ── Section Card ───────────────────────────────────────────────────────────

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden"
    >
      <div className="flex items-center gap-3 px-6 py-4 border-b-3 border-border bg-muted/30">
        <div className="p-2 bg-primary/10 rounded-xl">{icon}</div>
        <h2 className="font-display font-black text-lg uppercase tracking-tight">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

// ── Nav Items ──────────────────────────────────────────────────────────────

const NAV_ITEMS: { id: SettingsSection; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "Profile", icon: <User size={18} /> },
  { id: "account", label: "Account", icon: <Shield size={18} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
  { id: "appearance", label: "Appearance", icon: <Palette size={18} /> },
  { id: "privacy", label: "Privacy", icon: <Eye size={18} /> },
];

// ── Page Component ─────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  // Active sidebar section
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile");

  // Profile fields
  const [displayName, setDisplayName] = useState("Juan Dela Cruz");
  const [bio, setBio] = useState(
    "Full-stack dev in training. Python enthusiast. Building cool stuff one lesson at a time."
  );

  // Notification toggles
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // Privacy toggles
  const [profilePublic, setProfilePublic] = useState(true);
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true);

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const scrollToSection = (section: SettingsSection) => {
    setActiveSection(section);
    const el = document.getElementById(`settings-${section}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <PageShell>
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <section className="relative bg-card border-b-4 border-border overflow-hidden">
        <DotPattern />
        <FloatingShapes
          shapes={[
            { type: "circle", size: 30, x: "90%", y: "20%", color: "bg-primary", delay: 0, duration: 10 },
            { type: "square", size: 20, x: "5%", y: "60%", color: "bg-secondary", delay: 1, duration: 8, rotate: 45 },
            { type: "diamond", size: 24, x: "80%", y: "70%", color: "bg-accent", delay: 2, duration: 9 },
          ]}
        />
        <div className="container mx-auto px-4 py-12 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter"
          >
            Settings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-medium mt-2 text-lg"
          >
            Manage your profile, account preferences, and privacy.
          </motion.p>
        </div>
      </section>

      {/* ── Sidebar + Content ────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Left Sidebar ───────────────────────────────────────────── */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-28">
              <nav className="bg-card neo-brutal-border neo-brutal-shadow rounded-2xl overflow-hidden">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-3 px-5 py-4 text-left font-bold text-sm transition-all border-b-2 border-border last:border-b-0 ${
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    {item.icon}
                    <span className="flex-1 font-display uppercase tracking-wider text-xs">
                      {item.label}
                    </span>
                    <ChevronRight
                      size={14}
                      className={`transition-transform ${
                        activeSection === item.id ? "translate-x-0.5" : "opacity-0"
                      }`}
                    />
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Main Content ───────────────────────────────────────────── */}
          <main className="flex-1 space-y-8 min-w-0">
            {/* ── Profile Section ────────────────────────────────────── */}
            <div id="settings-profile">
              <SectionCard title="Profile" icon={<User size={18} className="text-primary" />}>
                <div className="space-y-6">
                  {/* Avatar Upload */}
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full neo-brutal-border overflow-hidden bg-primary/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=juandev-aralify"
                          alt="Your avatar"
                          className="w-full h-full"
                        />
                      </div>
                      <button
                        type="button"
                        className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                      >
                        <Camera size={24} className="text-white" />
                      </button>
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="font-display font-black text-sm uppercase tracking-wider">
                        Profile Photo
                      </p>
                      <p className="text-xs font-medium text-muted-foreground mt-1">
                        JPG, PNG or GIF. Max 2MB.
                      </p>
                      <NeoButton variant="outline" size="sm" className="mt-3 rounded-xl">
                        <Camera size={14} className="mr-2" /> Upload Photo
                      </NeoButton>
                    </div>
                  </div>

                  {/* Display Name */}
                  <div>
                    <label className="block font-display font-black text-xs uppercase tracking-widest mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full h-12 px-4 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block font-display font-black text-xs uppercase tracking-widest mb-2">
                      Bio
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl font-medium resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                    />
                    <p className="text-xs font-medium text-muted-foreground mt-1">
                      {bio.length}/200 characters
                    </p>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <NeoButton variant="primary" size="md" className="rounded-xl">
                      <Save size={16} className="mr-2" /> Save Changes
                    </NeoButton>
                  </div>
                </div>
              </SectionCard>
            </div>

            {/* ── Account Section ─────────────────────────────────────── */}
            <div id="settings-account">
              <SectionCard title="Account" icon={<Shield size={18} className="text-primary" />}>
                <div className="space-y-6">
                  {/* Email (readonly) */}
                  <div>
                    <label className="block font-display font-black text-xs uppercase tracking-widest mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <input
                        type="email"
                        value="juan.delacruz@email.com"
                        readOnly
                        className="w-full h-12 pl-11 pr-4 bg-muted/50 neo-brutal-border neo-brutal-shadow-sm rounded-xl font-medium text-muted-foreground cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs font-medium text-muted-foreground mt-1">
                      Contact support to change your email address.
                    </p>
                  </div>

                  {/* Change Password */}
                  <div className="flex items-center justify-between p-5 bg-muted/30 neo-brutal-border rounded-xl">
                    <div>
                      <p className="font-display font-black text-sm uppercase tracking-wider">
                        Password
                      </p>
                      <p className="text-xs font-medium text-muted-foreground mt-0.5">
                        Last changed 30 days ago
                      </p>
                    </div>
                    <NeoButton variant="outline" size="sm" className="rounded-xl">
                      <Lock size={14} className="mr-2" /> Change Password
                    </NeoButton>
                  </div>
                </div>
              </SectionCard>
            </div>

            {/* ── Notifications Section ───────────────────────────────── */}
            <div id="settings-notifications">
              <SectionCard
                title="Notifications"
                icon={<Bell size={18} className="text-primary" />}
              >
                <div className="space-y-1 divide-y-2 divide-border">
                  <NeoToggle
                    enabled={emailNotifications}
                    onToggle={() => setEmailNotifications(!emailNotifications)}
                    label="Email Notifications"
                    description="Receive updates about course progress and new content."
                  />
                  <NeoToggle
                    enabled={streakReminders}
                    onToggle={() => setStreakReminders(!streakReminders)}
                    label="Streak Reminders"
                    description="Daily reminder to keep your learning streak alive."
                  />
                  <NeoToggle
                    enabled={weeklyDigest}
                    onToggle={() => setWeeklyDigest(!weeklyDigest)}
                    label="Weekly Digest"
                    description="Summary of your weekly learning progress and leaderboard changes."
                  />
                </div>
              </SectionCard>
            </div>

            {/* ── Appearance Section ──────────────────────────────────── */}
            <div id="settings-appearance">
              <SectionCard
                title="Appearance"
                icon={<Palette size={18} className="text-primary" />}
              >
                <div>
                  <p className="font-display font-black text-xs uppercase tracking-widest mb-4">
                    Theme
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {(
                      [
                        { id: "light", label: "Light", icon: <Sun size={20} /> },
                        { id: "dark", label: "Dark", icon: <Moon size={20} /> },
                        { id: "system", label: "System", icon: <Monitor size={20} /> },
                      ] as const
                    ).map((option) => {
                      const isActive = mounted && theme === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setTheme(option.id)}
                          className={`flex flex-col items-center gap-2 p-5 rounded-2xl neo-brutal-border transition-all cursor-pointer ${
                            isActive
                              ? "bg-primary text-primary-foreground neo-brutal-shadow"
                              : "bg-card hover:bg-muted/50 neo-brutal-shadow-sm"
                          }`}
                        >
                          {option.icon}
                          <span className="font-display font-black text-xs uppercase tracking-wider">
                            {option.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </SectionCard>
            </div>

            {/* ── Privacy Section ─────────────────────────────────────── */}
            <div id="settings-privacy">
              <SectionCard title="Privacy" icon={<Eye size={18} className="text-primary" />}>
                <div className="space-y-1 divide-y-2 divide-border">
                  <NeoToggle
                    enabled={profilePublic}
                    onToggle={() => setProfilePublic(!profilePublic)}
                    label="Public Profile"
                    description="Allow other learners to view your profile and stats."
                  />
                  <NeoToggle
                    enabled={showOnLeaderboard}
                    onToggle={() => setShowOnLeaderboard(!showOnLeaderboard)}
                    label="Show on Leaderboard"
                    description="Display your rank and XP on public leaderboards."
                  />
                </div>
              </SectionCard>
            </div>

            {/* ── Danger Zone ─────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-destructive/5 neo-brutal-border border-destructive/30 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-6 py-4 border-b-3 border-destructive/20 bg-destructive/10">
                <div className="p-2 bg-destructive/20 rounded-xl">
                  <AlertTriangle size={18} className="text-destructive" />
                </div>
                <h2 className="font-display font-black text-lg uppercase tracking-tight text-destructive">
                  Danger Zone
                </h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-sm">Delete Account</p>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">
                      Permanently delete your account, progress, and all data. This cannot be undone.
                    </p>
                  </div>
                  <NeoButton
                    variant="primary"
                    size="sm"
                    className="rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground shrink-0"
                    onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                  >
                    <Trash2 size={14} className="mr-2" /> Delete Account
                  </NeoButton>
                </div>

                <AnimatePresence>
                  {showDeleteConfirm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 p-5 bg-destructive/10 neo-brutal-border border-destructive/30 rounded-xl">
                        <p className="font-bold text-sm text-destructive mb-4">
                          Are you sure? Type &quot;DELETE&quot; to confirm.
                        </p>
                        <input
                          type="text"
                          placeholder='Type "DELETE" to confirm'
                          className="w-full h-12 px-4 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-destructive transition-shadow mb-3"
                        />
                        <div className="flex gap-3 justify-end">
                          <NeoButton
                            variant="muted"
                            size="sm"
                            className="rounded-xl"
                            onClick={() => setShowDeleteConfirm(false)}
                          >
                            Cancel
                          </NeoButton>
                          <NeoButton
                            variant="primary"
                            size="sm"
                            className="rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                          >
                            <Trash2 size={14} className="mr-2" /> Permanently Delete
                          </NeoButton>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </PageShell>
  );
}
