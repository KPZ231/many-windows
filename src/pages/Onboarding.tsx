import SplitText from "@/components/SplitText.jsx";
import OnboardingFlow from "@/components/onboarding/onboarding-flow";
import { AnimatePresence } from 'motion/react';
import { useState } from "react";

function Onboarding() {
  const [showNext, setShowNext] = useState(false);


  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {!showNext ? (
        <SplitText
          text="Welcome!"
          className="text-5xl font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={() => setShowNext(true)}
        />
      ) : (
        <AnimatePresence mode="wait">
          <OnboardingFlow></OnboardingFlow>
        </AnimatePresence>
      )}
    </div>
  );
}

export default Onboarding;
