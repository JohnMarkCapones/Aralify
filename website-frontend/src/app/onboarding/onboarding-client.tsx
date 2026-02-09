"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { NeoButton } from "@/components/ui/neo-button";
import { OnboardingProgress } from "./components/onboarding-progress";
import { WelcomeStep } from "./steps/welcome-step";
import { PersonalizationStep } from "./steps/personalization-step";
import { LanguagesStep } from "./steps/languages-step";
import { SkillLevelStep } from "./steps/skill-level-step";
import { GoalsStep } from "./steps/goals-step";
import { CommitmentStep } from "./steps/commitment-step";
import { CelebrationStep } from "./steps/celebration-step";

const STORAGE_KEY = "aralify-onboarding";
const TOTAL_STEPS = 7;

interface OnboardingData {
  displayName: string;
  avatarPreset: string;
  selectedLanguages: string[];
  skillLevel: string;
  selectedGoals: string[];
  dailyMins: number;
  currentStep: number;
}

const defaultData: OnboardingData = {
  displayName: "",
  avatarPreset: "",
  selectedLanguages: [],
  skillLevel: "",
  selectedGoals: [],
  dailyMins: 30,
  currentStep: 0,
};

function loadSavedData(emailPrefix: string): OnboardingData {
  if (typeof window === "undefined") return { ...defaultData, displayName: emailPrefix };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as OnboardingData;
      return {
        ...defaultData,
        ...parsed,
        displayName: parsed.displayName || emailPrefix,
      };
    }
  } catch {
    // ignore
  }
  return { ...defaultData, displayName: emailPrefix };
}

interface OnboardingClientProps {
  userEmail: string;
  token?: string;
}

export function OnboardingClient({ userEmail, token }: OnboardingClientProps) {
  const router = useRouter();
  const emailPrefix = userEmail.split("@")[0] || "";
  const [data, setData] = useState<OnboardingData>(() =>
    loadSavedData(emailPrefix)
  );
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { currentStep } = data;

  // Save to localStorage on each change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  const update = useCallback(
    <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 0:
        return true; // welcome
      case 1:
        return data.displayName.trim().length > 0;
      case 2:
        return data.selectedLanguages.length > 0;
      case 3:
        return data.skillLevel !== "";
      case 4:
        return data.selectedGoals.length > 0;
      case 5:
        return data.dailyMins > 0;
      case 6:
        return true; // celebration
      default:
        return true;
    }
  };

  const goNext = () => {
    if (currentStep < TOTAL_STEPS - 1 && canProceed()) {
      setDirection(1);
      setData((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setData((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const handleSkip = async () => {
    setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiUrl && token) {
        await fetch(`${apiUrl}/api/v1/users/onboarding/skip`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch {
      // continue even if API fails
    }
    localStorage.removeItem(STORAGE_KEY);
    router.push("/dashboard");
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiUrl && token) {
        await fetch(`${apiUrl}/api/v1/users/onboarding/complete`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            displayName: data.displayName.trim(),
            avatarPreset: data.avatarPreset || undefined,
            interestedLanguages: data.selectedLanguages,
            skillLevel: data.skillLevel,
            learningGoals: data.selectedGoals,
            dailyCommitmentMins: data.dailyMins,
          }),
        });
      }
    } catch {
      // continue even if API fails
    }
    localStorage.removeItem(STORAGE_KEY);
    router.push("/dashboard");
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={goNext} />;
      case 1:
        return (
          <PersonalizationStep
            displayName={data.displayName}
            setDisplayName={(v) => update("displayName", v)}
            avatarPreset={data.avatarPreset}
            setAvatarPreset={(v) => update("avatarPreset", v)}
          />
        );
      case 2:
        return (
          <LanguagesStep
            selectedLanguages={data.selectedLanguages}
            setSelectedLanguages={(v) => update("selectedLanguages", v)}
          />
        );
      case 3:
        return (
          <SkillLevelStep
            skillLevel={data.skillLevel}
            setSkillLevel={(v) => update("skillLevel", v)}
          />
        );
      case 4:
        return (
          <GoalsStep
            selectedGoals={data.selectedGoals}
            setSelectedGoals={(v) => update("selectedGoals", v)}
          />
        );
      case 5:
        return (
          <CommitmentStep
            dailyMins={data.dailyMins}
            setDailyMins={(v) => update("dailyMins", v)}
          />
        );
      case 6:
        return (
          <CelebrationStep
            onFinish={handleComplete}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  const showNavigation = currentStep > 0 && currentStep < 6;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Skip button */}
      {currentStep < 6 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={handleSkip}
          disabled={isSubmitting}
          className="fixed top-4 right-4 z-50 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors font-display font-bold uppercase tracking-wider"
        >
          Skip <X className="w-4 h-4" />
        </motion.button>
      )}

      {/* Progress bar */}
      {currentStep > 0 && currentStep < 6 && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
          <OnboardingProgress currentStep={currentStep} />
        </div>
      )}

      {/* Step content */}
      <div className="flex items-center justify-center min-h-screen pt-20 pb-24">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      {showNavigation && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <NeoButton
              variant="outline"
              size="sm"
              onClick={goBack}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </NeoButton>
            <NeoButton
              size="sm"
              onClick={goNext}
              disabled={!canProceed()}
              className={!canProceed() ? "opacity-50 cursor-not-allowed" : ""}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-1" />
            </NeoButton>
          </div>
        </div>
      )}
    </div>
  );
}
