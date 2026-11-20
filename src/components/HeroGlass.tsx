"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sun, Drop, SpeakerHigh } from "@phosphor-icons/react";
import { LiquidGlassSurface } from "./LiquidGlassSurface";

gsap.registerPlugin(ScrollTrigger);

export function HeroGlass() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !sectionRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 10,
        scale: 1.07,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden pt-20 pb-14 md:pt-24 md:pb-16"
    >
      {/* Full-bleed luminous photographic backdrop refracted through Liquid Glass surfaces */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgRef}
          src="./images/hero-pavilion.jpg"
          alt="Светлый стеклянный павильон над альпийским озером на рассвете"
          className="h-full w-full object-cover object-center scale-[1.02] will-change-transform"
          fetchPriority="high"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#E6EFF9]/20 via-transparent to-[#DCE6F2]"
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1360px] grid-cols-1 items-end gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-10">
        {/* Main Hero Liquid Glass Lens Card */}
        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <LiquidGlassSurface className="p-7 sm:p-10 lg:p-12">
            <h1 className="max-w-3xl text-[clamp(2.4rem,4.9vw,4.35rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-[#0B0F17]">
              Свет, который чувствует дом.
            </h1>

            <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.6] text-[#283344] sm:text-[18px]">
              VERA объединяет освещение, климат и пространственную акустику в единой оптической
              среде.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#access"
                className="group inline-flex items-center gap-3 rounded-full bg-[#0071E3] pl-6 pr-2 py-2 text-[14px] font-semibold text-white whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_14px_32px_rgba(0,113,227,0.34)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#0064CA] active:scale-[0.98]"
              >
                <span>Запросить доступ</span>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                >
                  <ArrowUpRight
                    size={15}
                    weight="light"
                    className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>

              <a
                href="#live-studio"
                className="liquid-glass-btn-approx inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[14px] font-semibold text-[#0B0F17] whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/75 active:scale-[0.98]"
              >
                Попробовать панель
              </a>
            </div>
          </LiquidGlassSurface>
        </motion.div>

        {/* Floating Spatial Telemetry Liquid Glass Stack */}
        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col gap-4"
        >
          <LiquidGlassSurface className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0071E3]/14 text-[#0071E3] ring-1 ring-white/70">
                  <Sun size={20} weight="light" />
                </span>
                <div>
                  <div className="text-[14px] font-semibold text-[#0B0F17]">Утренний спектр</div>
                  <div className="text-[12px] text-[#3D4859]">Гостиная и терраса</div>
                </div>
              </div>
              <span className="font-mono text-[15px] font-medium text-[#0B0F17]">4200 K</span>
            </div>
          </LiquidGlassSurface>

          <div className="grid grid-cols-2 gap-4">
            <LiquidGlassSurface className="p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/65 text-[#0071E3] ring-1 ring-white/85">
                <Drop size={18} weight="light" />
              </div>
              <div className="mt-4 font-mono text-[22px] font-medium tracking-[-0.03em] text-[#0B0F17]">
                46%
              </div>
              <div className="mt-0.5 text-[13px] text-[#3D4859]">Влажность воздуха</div>
            </LiquidGlassSurface>

            <LiquidGlassSurface className="p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/65 text-[#0071E3] ring-1 ring-white/85">
                <SpeakerHigh size={18} weight="light" />
              </div>
              <div className="mt-4 font-mono text-[22px] font-medium tracking-[-0.03em] text-[#0B0F17]">
                24 дБ
              </div>
              <div className="mt-0.5 text-[13px] text-[#3D4859]">Акустический фон</div>
            </LiquidGlassSurface>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
