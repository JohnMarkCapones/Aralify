"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Mail, Lock, Trash2, AlertTriangle, Github } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { SectionCard } from "../_components/settings-ui";

export default function SettingsAccountPage() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <>
      <SectionCard title="Account" icon={<Shield size={18} className="text-primary" />}>
        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="block font-display font-black text-xs uppercase tracking-widest mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
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

          {/* Password */}
          <div className="flex items-center justify-between p-5 bg-muted/30 neo-brutal-border rounded-xl">
            <div>
              <p className="font-display font-black text-sm uppercase tracking-wider">Password</p>
              <p className="text-xs font-medium text-muted-foreground mt-0.5">Last changed 30 days ago</p>
            </div>
            <NeoButton variant="outline" size="sm" className="rounded-xl">
              <Lock size={14} className="mr-2" /> Change Password
            </NeoButton>
          </div>

          {/* Connected Accounts */}
          <div>
            <label className="block font-display font-black text-xs uppercase tracking-widest mb-3">
              Connected Accounts
            </label>
            <div className="space-y-3">
              {[
                { name: "Google", icon: <Mail size={16} />, connected: true, email: "juan.delacruz@gmail.com" },
                { name: "GitHub", icon: <Github size={16} />, connected: false, email: "" },
              ].map((account) => (
                <div key={account.name} className="flex items-center justify-between p-4 bg-muted/30 neo-brutal-border rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">{account.icon}</div>
                    <div>
                      <p className="font-bold text-sm">{account.name}</p>
                      <p className="text-xs font-medium text-muted-foreground">
                        {account.connected ? account.email : "Not connected"}
                      </p>
                    </div>
                  </div>
                  <NeoButton variant={account.connected ? "muted" : "outline"} size="sm" className="rounded-xl">
                    {account.connected ? "Disconnect" : "Connect"}
                  </NeoButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Danger Zone */}
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
                    <NeoButton variant="muted" size="sm" className="rounded-xl" onClick={() => setShowDeleteConfirm(false)}>
                      Cancel
                    </NeoButton>
                    <NeoButton variant="primary" size="sm" className="rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                      <Trash2 size={14} className="mr-2" /> Permanently Delete
                    </NeoButton>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
