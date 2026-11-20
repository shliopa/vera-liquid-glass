"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, SunHorizon, GridFour, Sliders, EnvelopeSimple } from "@phosphor-icons/react";

const NAV_LINKS = [
  { label: "Свет", href: "#live-studio", icon: SunHorizon },
  { label: "Среда", href: "#bento", icon: GridFour },
  { label: "Оптика", href: "#optics", icon: Sliders },
  { label: "Доступ", href: "#access", icon: EnvelopeSimple },
];

export function LiquidNavbar() {
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Top Floating Liquid Glass Island */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-5 pointer-events-none">
        <nav
          aria-label="Основная навигация"
          className="liquid-glass-pill-approx pointer-events-auto flex h-14 items-center gap-5 pl-5 pr-2"
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.14em] text-[#0B0F17] uppercase whitespace-nowrap"
          >
            <span
              aria-hidden="true"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0071E3] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
            >
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
            <span>VERA</span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-[13px] font-medium text-[#2A3446] whitespace-nowrap transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/60 hover:text-[#0B0F17]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#access"
              className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-[#0071E3] pl-4 pr-1.5 py-1.5 text-[13px] font-semibold text-white whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_8px_22px_rgba(0,113,227,0.28)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#0064CA] active:scale-[0.98]"
            >
              <span>Запросить доступ</span>
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
              >
                <ArrowUpRight
                  size={14}
                  weight="light"
                  className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/55 text-[#0B0F17] ring-1 ring-white/80 md:hidden"
            >
              <span
                className={[
                  "absolute h-[1.5px] w-4 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  open ? "translate-y-0 rotate-45" : "-translate-y-[3.5px] rotate-0",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute h-[1.5px] w-4 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  open ? "translate-y-0 -rotate-45" : "translate-y-[3.5px] rotate-0",
                ].join(" ")}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Fullscreen Liquid Glass Overlay Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#EAF1FA]/80 px-6 backdrop-blur-3xl md:hidden"
          >
            <div className="liquid-glass-web-approx mx-auto w-full max-w-md rounded-[2rem] p-7">
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href} className="overflow-hidden">
                      <motion.a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        initial={prefersReduced ? { opacity: 0 } : { y: 36, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: prefersReduced ? 0 : 0.05 + idx * 0.05,
                          ease: [0.32, 0.72, 0, 1],
                        }}
                        className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-xl font-medium text-[#0B0F17] transition-colors hover:bg-white/55"
                      >
                        <span className="flex items-center gap-3">
                          <Icon size={22} weight="light" className="text-[#0071E3]" />
                          <span>{item.label}</span>
                        </span>
                        <ArrowUpRight size={20} weight="light" className="text-[#3D4859]" />
                      </motion.a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS-inspired Floating Liquid Glass Bottom Dock for Phone View */}
      <nav
        aria-label="Быстрый переход"
        className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none md:hidden"
      >
        <div className="liquid-glass-pill-approx pointer-events-auto flex items-center gap-1 px-2 py-1.5">
          {NAV_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold text-[#151D2B] active:scale-95 transition-all hover:bg-white/60"
              >
                <Icon size={16} weight="light" className="text-[#0071E3]" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
