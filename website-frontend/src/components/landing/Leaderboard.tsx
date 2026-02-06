"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef } from "react";
import { Award, Star, Zap } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "CyberNinja", xp: 15400, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
  { rank: 2, name: "PixelQueen", xp: 14200, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" },
  { rank: 3, name: "CodeCrusher", xp: 12800, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" },
];

export function Leaderboard() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const skewX = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <section ref={containerRef} className="py-32 bg-primary/10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24 relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 left-1/2 -translate-x-1/2 opacity-10"
          >
            <Star size={200} className="fill-primary" />
          </motion.div>
          <h2 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter italic">HALL OF FAME</h2>
          <div className="inline-block bg-black text-white px-6 py-2 neo-brutal-border rotate-2 font-black text-xl">TOP PERFORMERS THIS WEEK</div>
        </div>

        <motion.div
          style={{ rotateX, skewX }}
          className="flex flex-col md:flex-row items-end justify-center gap-8 h-full min-h-[500px] perspective-1000"
        >
             {/* 2nd Place */}
            <motion.div
                whileHover={{ y: -20, scale: 1.05 }}
                className="w-full md:w-1/4 bg-white neo-brutal-border neo-brutal-shadow h-[350px] flex flex-col items-center justify-end p-8 relative rounded-3xl"
            >
                <div className="absolute -top-16">
                   <div className="p-2 bg-secondary rounded-full neo-brutal-border">
                        <Avatar className="w-24 h-24 border-3 border-black shadow-xl">
                                <AvatarImage src={leaderboardData[1].avatar} />
                                <AvatarFallback>2</AvatarFallback>
                        </Avatar>
                   </div>
                </div>
                <div className="text-center mb-8">
                    <Award className="mx-auto mb-2 text-secondary" size={32} />
                    <h3 className="text-3xl font-black">{leaderboardData[1].name}</h3>
                    <p className="font-mono text-xl font-bold bg-secondary/20 px-4 rounded-full">{leaderboardData[1].xp} XP</p>
                </div>
                <div className="absolute bottom-4 right-4 text-6xl font-black opacity-10">#2</div>
            </motion.div>

             {/* 1st Place */}
             <motion.div
                whileHover={{ y: -30, scale: 1.1 }}
                className="w-full md:w-1/3 bg-accent neo-brutal-border neo-brutal-shadow-lg h-[450px] flex flex-col items-center justify-end p-8 relative z-10 rounded-3xl"
            >
                 <div className="absolute -top-20">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-3 bg-white rounded-full neo-brutal-border"
                    >
                        <Avatar className="w-32 h-32 border-4 border-black shadow-2xl">
                                <AvatarImage src={leaderboardData[0].avatar} />
                                <AvatarFallback>1</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl rotate-12">👑</div>
                    </motion.div>
                </div>
                <div className="text-center mb-12">
                    <Star className="mx-auto mb-2 fill-black" size={48} />
                    <h3 className="text-4xl font-black">{leaderboardData[0].name}</h3>
                    <p className="font-mono text-2xl font-black bg-black text-white px-6 py-1 rounded-full">{leaderboardData[0].xp} XP</p>
                </div>
                <div className="absolute top-10 right-10 flex gap-2">
                    <Zap className="fill-black" />
                    <Zap className="fill-black" />
                </div>
                <div className="absolute bottom-6 left-6 text-8xl font-black opacity-20">#1</div>
            </motion.div>

             {/* 3rd Place */}
             <motion.div
                whileHover={{ y: -20, scale: 1.05 }}
                className="w-full md:w-1/4 bg-muted neo-brutal-border neo-brutal-shadow h-[300px] flex flex-col items-center justify-end p-8 relative rounded-3xl"
            >
                <div className="absolute -top-16">
                   <div className="p-2 bg-primary rounded-full neo-brutal-border">
                        <Avatar className="w-20 h-20 border-3 border-black shadow-xl">
                                <AvatarImage src={leaderboardData[2].avatar} />
                                <AvatarFallback>3</AvatarFallback>
                        </Avatar>
                   </div>
                </div>
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-black">{leaderboardData[2].name}</h3>
                    <p className="font-mono text-lg font-bold bg-primary/20 px-4 rounded-full">{leaderboardData[2].xp} XP</p>
                </div>
                <div className="absolute bottom-4 right-4 text-5xl font-black opacity-10">#3</div>
            </motion.div>
        </motion.div>

        {/* Geometry Floating Particles */}
        <div className="flex justify-center gap-12 mt-20">
             {[1,2,3,4,5].map(i => (
                 <motion.div
                    key={i}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 5 + i, repeat: Infinity }}
                    className={`w-8 h-8 neo-brutal-border ${i % 2 === 0 ? 'rounded-full' : 'rotate-45'} bg-primary opacity-20`}
                 />
             ))}
        </div>
      </div>
    </section>
  );
}
