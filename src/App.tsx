import { useState } from "react";
import { MotionConfig } from "motion/react";
import { SmoothScroll } from "./components/SmoothScroll";
import { LiquidNavbar } from "./components/LiquidNavbar";
import { HeroGlass } from "./components/HeroGlass";
import { LiveGlassStudio, SCENES, type LightingScene } from "./components/LiveGlassStudio";
import { GlassBentoSection } from "./components/GlassBentoSection";
import { OpticsParallaxSection } from "./components/OpticsParallaxSection";
import { AccessSection } from "./components/AccessSection";

export function App() {
  const [activeScene, setActiveScene] = useState<LightingScene>("morning");
  const currentScene = SCENES.find((s) => s.id === activeScene) ?? SCENES[0];

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />

      {/* Fixed luminous atmospheric backdrop refracted behind all Liquid Glass surfaces */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 transition-all duration-1000"
        style={{
          background: `${currentScene.tint}, linear-gradient(180deg, #DDE8F6 0%, #E7EFF9 50%, #D9E5F4 100%)`,
        }}
      />

      <LiquidNavbar />

      <main className="overflow-x-clip w-full max-w-full text-[#0B0F17]">
        <HeroGlass />
        <LiveGlassStudio activeScene={activeScene} onSceneChange={setActiveScene} />
        <GlassBentoSection />
        <OpticsParallaxSection />
        <AccessSection />
      </main>
    </MotionConfig>
  );
}

export default App;
