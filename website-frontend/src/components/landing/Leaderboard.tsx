"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Star, Zap } from "lucide-react";
import { FloatingShapes, GradientOrbs } from "@/components/effects";

const leaderboardData = [
  { rank: 1, name: "CyberNinja", xp: 15400, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { rank: 2, name: "PixelQueen", xp: 14200, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" },
  { rank: 3, name: "CodeCrusher", xp: 12800, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" },
];

export function Leaderboard() {
  return (
    <section className="py-32 bg-primary/10 overflow-hidden relative">
      <GradientOrbs orbs={[
        { color: "bg-primary/15", size: 300, x: "10%", y: "20%", delay: 0, duration: 16 },
        { color: "bg-accent/10", size: 200, x: "80%", y: "60%", delay: 2, duration: 14 },
      ]} />
      <FloatingShapes shapes={[
        { type: "diamond", size: 30, x: "5%", y: "15%", color: "bg-accent", delay: 0, duration: 10 },
        { type: "circle", size: 20, x: "92%", y: "25%", color: "bg-primary", delay: 1, duration: 8 },
        { type: "cross", size: 22, x: "88%", y: "80%", color: "bg-secondary", delay: 2, duration: 12 },
        { type: "square", size: 18, x: "8%", y: "75%", color: "bg-primary", delay: 1.5, duration: 9, rotate: 45 },
      ]} />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter">LEADERBOARD</h2>
          <div className="inline-block bg-[hsl(222,47%,11%)] text-white px-6 py-2 neo-brutal-border rotate-1 font-black text-lg">TOP PERFORMERS THIS WEEK</div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-end justify-center gap-6 min-h-[420px] max-w-4xl mx-auto">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="w-full md:w-1/4 bg-card neo-brutal-border neo-brutal-shadow h-[320px] flex flex-col items-center justify-end p-6 relative rounded-2xl"
          >
            <div className="absolute -top-14">
              <div className="p-2 bg-secondary rounded-full neo-brutal-border">
                <Avatar className="w-20 h-20 border-3 border-border">
                  <AvatarImage src={leaderboardData[1].avatar} />
                  <AvatarFallback>2</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="text-center mb-6">
              <Award className="mx-auto mb-2 text-secondary" size={28} />
              <h3 className="text-2xl font-black">{leaderboardData[1].name}</h3>
              <p className="font-mono text-lg font-bold bg-secondary/20 px-4 rounded-full mt-1">{leaderboardData[1].xp.toLocaleString()} XP</p>
            </div>
            <div className="absolute bottom-4 right-4 text-5xl font-black opacity-10">#2</div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -12 }}
            className="w-full md:w-1/3 bg-accent neo-brutal-border neo-brutal-shadow-lg h-[400px] flex flex-col items-center justify-end p-6 relative z-10 rounded-2xl"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-16"
            >
              <div className="p-2.5 bg-card rounded-full neo-brutal-border">
                <Avatar className="w-28 h-28 border-4 border-border">
                  <AvatarImage src={leaderboardData[0].avatar} />
                  <AvatarFallback>1</AvatarFallback>
                </Avatar>
              </div>
            </motion.div>
            <div className="text-center mb-8">
              <Star className="mx-auto mb-2 fill-foreground" size={40} />
              <h3 className="text-3xl font-black">{leaderboardData[0].name}</h3>
              <p className="font-mono text-xl font-black bg-[hsl(222,47%,11%)] text-white px-6 py-1 rounded-full mt-1">{leaderboardData[0].xp.toLocaleString()} XP</p>
            </div>
            <div className="absolute top-8 right-8 flex gap-1">
              <Zap size={20} className="fill-foreground" />
              <Zap size={20} className="fill-foreground" />
            </div>
            <div className="absolute bottom-4 left-4 text-7xl font-black opacity-15">#1</div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8 }}
            className="w-full md:w-1/4 bg-muted neo-brutal-border neo-brutal-shadow h-[280px] flex flex-col items-center justify-end p-6 relative rounded-2xl"
          >
            <div className="absolute -top-14">
              <div className="p-2 bg-primary rounded-full neo-brutal-border">
                <Avatar className="w-18 h-18 border-3 border-border">
                  <AvatarImage src={leaderboardData[2].avatar} />
                  <AvatarFallback>3</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="text-center mb-4">
              <h3 className="text-xl font-black">{leaderboardData[2].name}</h3>
              <p className="font-mono text-base font-bold bg-primary/20 px-4 rounded-full mt-1">{leaderboardData[2].xp.toLocaleString()} XP</p>
            </div>
            <div className="absolute bottom-4 right-4 text-4xl font-black opacity-10">#3</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
