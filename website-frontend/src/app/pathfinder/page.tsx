"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { PageShell } from "@/components/layout/PageShell";
import { recommendationApi, type AssessmentPayload } from "@/lib/api";
import { MotivationStep } from "./components/motivation-step";
import { DreamProjectStep } from "./components/dream-project-step";
import { SubjectInterestsStep } from "./components/subject-interests-step";
import { PersonalityStep } from "./components/personality-step";
import { IndustryStep } from "./components/industry-step";
import { WorkStyleStep } from "./components/work-style-step";
import { MathComfortStep } from "./components/math-comfort-step";
import { DailyRoutineStep } from "./components/daily-routine-step";
import { TimeHorizonStep } from "./components/time-horizon-step";
import { BackgroundStep } from "./components/background-step";
import { ContentPreferenceStep } from "./components/content-preference-step";
import { AnalyticalStep } from "./components/analytical-step";
import { ContextStep } from "./components/context-step";

const TOTAL_STEPS = 14; // welcome + 13 quiz steps

interface QuizData {
  motivation: string[];
  dreamProject: string[];
  subjectInterests: string[];
  personalityType: string;
  industryInterests: string[];
  workStyle: string;
  mathComfort: string;
  dailyRoutine: string;
  timeHorizon: string;
  background: string;
  contentPreference: string;
  analyticalScore: number;
  contextProfile: string;
}

const defaultData: QuizData = {
  motivation: [],
  dreamProject: [],
  subjectInterests: [],
  personalityType: "",
  industryInterests: [],
  workStyle: "",
  mathComfort: "",
  dailyRoutine: "",
  timeHorizon: "",
  background: "",
  contentPreference: "",
  analyticalScore: 50,
  contextProfile: "",
};

export default function PathfinderPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<QuizData>(defaultData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(
    <K extends keyof QuizData>(key: K, value: QuizData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return true; // welcome
      case 1: return data.motivation.length > 0;
      case 2: return data.dreamProject.length > 0;
      case 3: return data.subjectInterests.length > 0;
      case 4: return data.personalityType !== "";
      case 5: return data.industryInterests.length > 0;
      case 6: return data.workStyle !== "";
      case 7: return data.mathComfort !== "";
      case 8: return data.dailyRoutine !== "";
      case 9: return data.timeHorizon !== "";
      case 10: return data.background !== "";
      case 11: return data.contentPreference !== "";
      case 12: return true; // analytical always valid (slider default 50)
      case 13: return data.contextProfile !== "";
      default: return true;
    }
  };

  const goNext = async () => {
    if (step < TOTAL_STEPS - 1 && canProceed()) {
      setDirection(1);
      setStep((s) => s + 1);
    } else if (step === TOTAL_STEPS - 1 && canProceed()) {
      await handleSubmit();
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    const payload: AssessmentPayload = {
      motivation: data.motivation,
      dreamProject: data.dreamProject,
      subjectInterests: data.subjectInterests,
      personalityType: data.personalityType || undefined,
      industryInterests: data.industryInterests,
      workStyle: data.workStyle,
      mathComfort: data.mathComfort || undefined,
      dailyRoutine: data.dailyRoutine || undefined,
      timeHorizon: data.timeHorizon,
      background: data.background,
      contentPreference: data.contentPreference || undefined,
      analyticalScore: data.analyticalScore,
      contextProfile: data.contextProfile,
    };

    try {
      const result = await recommendationApi.submitAssessment(payload);
      // Store results for the results page
      sessionStorage.setItem("pathfinder-results", JSON.stringify(result));
      router.push("/pathfinder/results");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const progress = step / (TOTAL_STEPS - 1);

  return (
    <PageShell>
      <div className="min-h-[80vh] relative">
        {/* Progress bar */}
        {step > 0 && (
          <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm border-b-2 border-border">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center gap-4">
                <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Step {step}/{TOTAL_STEPS - 1}
                </span>
                <div className="flex-1 h-3 bg-muted rounded-full neo-brutal-border overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs font-black text-primary">
                  {Math.round(progress * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step content */}
        <div className="flex items-center justify-center min-h-[60vh] py-12">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full"
            >
              {step === 0 && <WelcomeStep onStart={goNext} />}
              {step === 1 && (
                <MotivationStep
                  selected={data.motivation}
                  setSelected={(v) => update("motivation", v)}
                />
              )}
              {step === 2 && (
                <DreamProjectStep
                  selected={data.dreamProject}
                  setSelected={(v) => update("dreamProject", v)}
                />
              )}
              {step === 3 && (
                <SubjectInterestsStep
                  selected={data.subjectInterests}
                  setSelected={(v) => update("subjectInterests", v)}
                />
              )}
              {step === 4 && (
                <PersonalityStep
                  selected={data.personalityType}
                  setSelected={(v) => update("personalityType", v)}
                />
              )}
              {step === 5 && (
                <IndustryStep
                  selected={data.industryInterests}
                  setSelected={(v) => update("industryInterests", v)}
                />
              )}
              {step === 6 && (
                <WorkStyleStep
                  selected={data.workStyle}
                  setSelected={(v) => update("workStyle", v)}
                />
              )}
              {step === 7 && (
                <MathComfortStep
                  selected={data.mathComfort}
                  setSelected={(v) => update("mathComfort", v)}
                />
              )}
              {step === 8 && (
                <DailyRoutineStep
                  selected={data.dailyRoutine}
                  setSelected={(v) => update("dailyRoutine", v)}
                />
              )}
              {step === 9 && (
                <TimeHorizonStep
                  selected={data.timeHorizon}
                  setSelected={(v) => update("timeHorizon", v)}
                />
              )}
              {step === 10 && (
                <BackgroundStep
                  selected={data.background}
                  setSelected={(v) => update("background", v)}
                />
              )}
              {step === 11 && (
                <ContentPreferenceStep
                  selected={data.contentPreference}
                  setSelected={(v) => update("contentPreference", v)}
                />
              )}
              {step === 12 && (
                <AnalyticalStep
                  score={data.analyticalScore}
                  setScore={(v) => update("analyticalScore", v)}
                />
              )}
              {step === 13 && (
                <ContextStep
                  selected={data.contextProfile}
                  setSelected={(v) => update("contextProfile", v)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Error */}
        {error && (
          <div className="container mx-auto px-4 mb-4">
            <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-300 dark:border-red-800 rounded-xl p-4 text-center text-sm font-medium text-red-700 dark:text-red-400">
              {error}
            </div>
          </div>
        )}

        {/* Navigation */}
        {step > 0 && (
          <div className="sticky bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t-2 border-border">
            <div className="max-w-2xl mx-auto flex items-center justify-between">
              <NeoButton variant="outline" size="sm" onClick={goBack}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </NeoButton>
              <NeoButton
                size="sm"
                onClick={goNext}
                disabled={!canProceed() || isSubmitting}
                className={!canProceed() ? "opacity-50 cursor-not-allowed" : ""}
              >
                {isSubmitting
                  ? "Analyzing..."
                  : step === TOTAL_STEPS - 1
                    ? "See My Results"
                    : "Next"}
                {!isSubmitting && <ArrowRight className="w-4 h-4 ml-1" />}
              </NeoButton>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}

function WelcomeStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="inline-flex items-center justify-center w-24 h-24 bg-primary text-primary-foreground rounded-3xl neo-brutal-border neo-brutal-shadow mb-8"
      >
        <Compass size={48} />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-4"
      >
        PATHFINDER
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg font-medium text-muted-foreground mb-2 max-w-lg mx-auto"
      >
        Not sure where to start? Answer 13 quick questions and our AI will recommend the perfect career path for you.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-muted-foreground mb-8"
      >
        Takes about 3-4 minutes
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <NeoButton size="lg" onClick={onStart}>
          START QUIZ <ArrowRight className="w-5 h-5 ml-2" />
        </NeoButton>
      </motion.div>
    </div>
  );
}
