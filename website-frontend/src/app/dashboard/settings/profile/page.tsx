"use client";

import { useState } from "react";
import { Camera, Save, Github, Twitter, Linkedin, Globe, User } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { SectionCard } from "../_components/settings-ui";

export default function SettingsProfilePage() {
  const [displayName, setDisplayName] = useState("Juan Dela Cruz");
  const [bio, setBio] = useState(
    "Full-stack dev in training. Python enthusiast. Building cool stuff one lesson at a time."
  );
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [language, setLanguage] = useState("en");

  return (
    <>
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
              <p className="font-display font-black text-sm uppercase tracking-wider">Profile Photo</p>
              <p className="text-xs font-medium text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB.</p>
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
            <p className="text-xs font-medium text-muted-foreground mt-1">{bio.length}/200 characters</p>
          </div>

          {/* Language */}
          <div>
            <label className="block font-display font-black text-xs uppercase tracking-widest mb-2">
              Language Preference
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full h-12 px-4 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-shadow cursor-pointer"
            >
              <option value="en">English</option>
              <option value="fil">Filipino</option>
            </select>
          </div>
        </div>
      </SectionCard>

      {/* Social Links */}
      <SectionCard title="Social Links" icon={<Globe size={18} className="text-primary" />}>
        <div className="space-y-4">
          {[
            { label: "GitHub", icon: <Github size={16} />, value: github, onChange: setGithub, placeholder: "https://github.com/username" },
            { label: "Twitter", icon: <Twitter size={16} />, value: twitter, onChange: setTwitter, placeholder: "https://twitter.com/username" },
            { label: "LinkedIn", icon: <Linkedin size={16} />, value: linkedin, onChange: setLinkedin, placeholder: "https://linkedin.com/in/username" },
            { label: "Portfolio", icon: <Globe size={16} />, value: portfolio, onChange: setPortfolio, placeholder: "https://yoursite.com" },
          ].map((field) => (
            <div key={field.label}>
              <label className="block font-display font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                {field.icon} {field.label}
              </label>
              <input
                type="url"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                className="w-full h-12 px-4 bg-card neo-brutal-border neo-brutal-shadow-sm rounded-xl font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <NeoButton variant="primary" size="md" className="rounded-xl">
          <Save size={16} className="mr-2" /> Save Changes
        </NeoButton>
      </div>
    </>
  );
}
