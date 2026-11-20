"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SunHorizon, Sun, MoonStars, Sparkle, SpeakerHigh, Wind } from "@phosphor-icons/react";
import { LiquidGlassSurface } from "./LiquidGlassSurface";

export type LightingScene = "morning" | "daylight" | "sunset" | "calm";

interface SceneConfig {
  id: LightingScene;
  label: string;
  kelvin: number;
  brightness: number;
  tint: string;
  description: string;
  icon: typeof SunHorizon;
}

export const SCENES: SceneConfig[] = [
  {
    id: "morning",
    label: "Утро",
    kelvin: 4200,
    brightness: 78,
    tint: "radial-gradient(circle at 24% 24%, rgba(56, 189, 248, 0.36), transparent 55%), radial-gradient(circle at 78% 72%, rgba(251, 191, 36, 0.28), transparent 55%)",
    description: "Мягкий рассветный баланс для естественного пробуждения.",
    icon: SunHorizon,
  },
  {
    id: "daylight",
    label: "День",
    kelvin: 5600,
    brightness: 94,
    tint: "radial-gradient(circle at 30% 20%, rgba(0, 113, 227, 0.34), transparent 58%), radial-gradient(circle at 80% 60%, rgba(125, 211, 252, 0.34), transparent 55%)",
    description: "Кристальная дневная чистота для работы и чтения.",
    icon: Sun,
  },
  {
    id: "sunset",
    label: "Закат",
    kelvin: 3000,
    brightness: 62,
    tint: "radial-gradient(circle at 25% 28%, rgba(251, 146, 60, 0.38), transparent 55%), radial-gradient(circle at 78% 74%, rgba(56, 189, 248, 0.26), transparent 58%)",
    description: "Тёплые янтарные отражения снимают зрительное напряжение.",
    icon: Sparkle,
  },
  {
    id: "calm",
    label: "Тишина",
    kelvin: 2700,
    brightness: 38,
    tint: "radial-gradient(circle at 28% 24%, rgba(99, 102, 241, 0.28), transparent 56%), radial-gradient(circle at 74% 72%, rgba(14, 165, 233, 0.3), transparent 56%)",
    description: "Приглушённое вечернее свечение с приоритетом тишины.",
    icon: MoonStars,
  },
];

interface LiveGlassStudioProps {
  activeScene: LightingScene;
  onSceneChange: (scene: LightingScene) => void;
}

export function LiveGlassStudio({ activeScene, onSceneChange }: LiveGlassStudioProps) {
  const currentConfig = SCENES.find((s) => s.id === activeScene) ?? SCENES[0];
  const [brightness, setBrightness] = useState(currentConfig.brightness);
  const [spatialAudio, setSpatialAudio] = useState(true);
  const [airFlow, setAirFlow] = useState(true);
  const prefersReduced = useReducedMotion();

  const handleSelectScene = (scene: SceneConfig) => {
    onSceneChange(scene.id);
    setBrightness(scene.brightness);
  };

  return (
    <section
      id="live-studio"
      className="relative mx-auto w-full max-w-[1360px] px-4 py-24 sm:px-6 md:py-32 lg:px-10"
    >
      <motion.div
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 max-w-2xl"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0071E3] mb-3">
          Живой интерфейс
        </p>
        <h2 className="text-[clamp(1.9rem,3.8vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#0B0F17]">
          Ощутите отклик жидкого стекла.
        </h2>
        <p className="mt-3.5 max-w-[50ch] text-[16px] leading-[1.6] text-[#3D4859]">
          Переключайте сценарии и двигайте ползунок яркости. Оптика интерфейса мгновенно
          подстраивается под свет за стеклом.
        </p>
      </motion.div>

      {/* Full interactive photographic stage with floating Liquid Glass control deck */}
      <div className="relative overflow-hidden rounded-[2.4rem] p-4 sm:p-8 lg:p-10 shadow-[0_30px_80px_rgba(14,32,58,0.16)] ring-1 ring-white/80">
        <img
          src="./images/glass-refraction.jpg"
          alt="Оптические стеклянные линзы с преломлением лазурного и тёплого света"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
          style={{ filter: `brightness(${0.72 + (brightness / 100) * 0.42}) saturate(1.15)` }}
        />

        <motion.div
          aria-hidden="true"
          animate={{ opacity: 0.88 }}
          transition={{ duration: 0.6 }}
          style={{ background: currentConfig.tint }}
          className="pointer-events-none absolute inset-0 transition-all duration-700"
        />

        <div className="relative z-10 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Left: Scene switcher + brightness optical capsule */}
          <LiquidGlassSurface className="p-6 sm:p-8 lg:col-span-7">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[#0B0F17]">
                  Сценарий освещения
                </h3>
                <span className="rounded-full bg-white/65 px-3.5 py-1 font-mono text-[13px] font-medium text-[#0B0F17] ring-1 ring-white/85">
                  {currentConfig.kelvin} K
                </span>
              </div>

              {/* Liquid Glass Segmented Control */}
              <div
                role="tablist"
                aria-label="Выбор светового сценария"
                className="grid grid-cols-2 gap-2 rounded-[1.4rem] bg-white/35 p-1.5 ring-1 ring-white/65 sm:grid-cols-4"
              >
                {SCENES.map((scene) => {
                  const active = scene.id === activeScene;
                  const Icon = scene.icon;
                  return (
                    <button
                      key={scene.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => handleSelectScene(scene)}
                      className={[
                        "relative flex items-center justify-center gap-2 rounded-[1.05rem] px-3 py-3 text-[13px] font-semibold transition-colors duration-300",
                        active ? "text-[#0B0F17]" : "text-[#324054] hover:text-[#0B0F17]",
                      ].join(" ")}
                    >
                      {active && (
                        <motion.span
                          layoutId="liquid-scene-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          className="absolute inset-0 rounded-[1.05rem] bg-white/90 shadow-[inset_0_1px_0_#ffffff,0_6px_18px_rgba(14,32,58,0.12)]"
                        />
                      )}
                      <Icon
                        size={17}
                        weight="light"
                        className={`relative z-10 ${active ? "text-[#0071E3]" : "text-[#3D4859]"}`}
                      />
                      <span className="relative z-10">{scene.label}</span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[15px] leading-[1.55] text-[#283344]">
                {currentConfig.description}
              </p>

              {/* Optical Brightness Slider */}
              <div className="rounded-[1.4rem] bg-white/40 p-5 ring-1 ring-white/70">
                <div className="mb-3 flex items-center justify-between">
                  <label htmlFor="glass-brightness" className="text-[14px] font-semibold text-[#0B0F17]">
                    Интенсивность света
                  </label>
                  <span className="font-mono text-[14px] font-medium text-[#0071E3]">
                    {brightness}%
                  </span>
                </div>
                <input
                  id="glass-brightness"
                  type="range"
                  min={20}
                  max={100}
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="glass-slider w-full"
                />
              </div>
            </div>
          </LiquidGlassSurface>

          {/* Right: Two tactile Apple-style glass toggles */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            <LiquidGlassSurface className="p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/75 text-[#0071E3] ring-1 ring-white">
                    <SpeakerHigh size={20} weight="light" />
                  </span>
                  <div>
                    <div className="text-[16px] font-semibold text-[#0B0F17]">
                      Адаптивный звук
                    </div>
                    <div className="text-[13px] text-[#3D4859]">
                      {spatialAudio ? "Пространственный баланс включён" : "Режим паузы"}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={spatialAudio}
                  aria-label="Переключить адаптивный звук"
                  onClick={() => setSpatialAudio((prev) => !prev)}
                  className={[
                    "relative inline-flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-colors duration-300",
                    spatialAudio ? "bg-[#0071E3]" : "bg-[#0B0F17]/20",
                  ].join(" ")}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 420, damping: 28 }}
                    className={[
                      "h-6 w-6 rounded-full bg-white shadow-[0_2px_8px_rgba(11,15,23,0.22)]",
                      spatialAudio ? "ml-auto" : "mr-auto",
                    ].join(" ")}
                  />
                </button>
              </div>
            </LiquidGlassSurface>

            <LiquidGlassSurface className="p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/75 text-[#0071E3] ring-1 ring-white">
                    <Wind size={20} weight="light" />
                  </span>
                  <div>
                    <div className="text-[16px] font-semibold text-[#0B0F17]">
                      Приток свежего воздуха
                    </div>
                    <div className="text-[13px] text-[#3D4859]">
                      {airFlow ? "Бесшумная циркуляция" : "Отключено"}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={airFlow}
                  aria-label="Переключить приток воздуха"
                  onClick={() => setAirFlow((prev) => !prev)}
                  className={[
                    "relative inline-flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-colors duration-300",
                    airFlow ? "bg-[#0071E3]" : "bg-[#0B0F17]/20",
                  ].join(" ")}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 420, damping: 28 }}
                    className={[
                      "h-6 w-6 rounded-full bg-white shadow-[0_2px_8px_rgba(11,15,23,0.22)]",
                      airFlow ? "ml-auto" : "mr-auto",
                    ].join(" ")}
                  />
                </button>
              </div>
            </LiquidGlassSurface>
          </div>
        </div>
      </div>
    </section>
  );
}
