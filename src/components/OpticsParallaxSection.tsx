"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { Aperture, DropHalfBottom, Sparkle } from "@phosphor-icons/react";
import { LiquidGlassSurface } from "./LiquidGlassSurface";

gsap.registerPlugin(ScrollTrigger);

const OPTIC_LAYERS = [
  {
    icon: Aperture,
    title: "Многослойное преломление",
    text: "Каждая панель усиливает глубину цвета за счёт насыщенного оптического размытия и двойной световой кромки.",
  },
  {
    icon: DropHalfBottom,
    title: "Адаптивная контрастность",
    text: "Текст и пиктограммы остаются чёткими поверх яркого дневного неба и приглушённого вечернего света.",
  },
  {
    icon: Sparkle,
    title: "Пружинная физика отклика",
    text: "Переключатели, капсулы и карточки движутся с естественной инерцией и моментально реагируют на касание.",
  },
];

export function OpticsParallaxSection() {
  const wrapRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !wrapRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".optic-float");
        cards.forEach((card, idx) => {
          gsap.fromTo(
            card,
            { y: 36 + idx * 24 },
            {
              y: -(20 + idx * 14),
              ease: "none",
              scrollTrigger: {
                trigger: wrapRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            }
          );
        });
      }, wrapRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [prefersReduced]);

  return (
    <section
      id="optics"
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[1360px] px-4 py-24 sm:px-6 md:py-36 lg:px-10"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] px-5 py-14 sm:px-10 sm:py-20 lg:px-14 shadow-[0_30px_80px_rgba(14,32,58,0.16)] ring-1 ring-white/80">
        <img
          src="./images/hero-pavilion.jpg"
          alt="Отражение утреннего света в стеклянных гранях павильона"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-bottom scale-105"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#DCE6F2]/75 via-[#DCE6F2]/20 to-transparent"
        />

        <div className="relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.9rem,3.8vw,3.15rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#0B0F17]">
              Материальность света в каждом слое.
            </h2>
            <p className="mt-3.5 max-w-[48ch] text-[16px] leading-[1.6] text-[#1E293B]">
              Три оптических принципа, благодаря которым интерфейс ощущается невесомым на экране
              телефона и монитора.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {OPTIC_LAYERS.map((layer) => {
              const Icon = layer.icon;
              return (
                <div key={layer.title} className="optic-float will-change-transform">
                  <LiquidGlassSurface className="h-full p-6 sm:p-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/75 text-[#0071E3] ring-1 ring-white">
                      <Icon size={22} weight="light" />
                    </span>
                    <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.02em] text-[#0B0F17]">
                      {layer.title}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-[1.6] text-[#283344]">{layer.text}</p>
                  </LiquidGlassSurface>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
