"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Minus, Plus, ThermometerSimple, Waveform } from "@phosphor-icons/react";
import { LiquidGlassSurface } from "./LiquidGlassSurface";

export function GlassBentoSection() {
  const [temp, setTemp] = useState(21.5);
  const prefersReduced = useReducedMotion();

  const adjustTemp = (delta: number) => {
    setTemp((prev) => Math.min(26, Math.max(18, Math.round((prev + delta) * 10) / 10)));
  };

  return (
    <section
      id="bento"
      className="relative mx-auto w-full max-w-[1360px] px-4 py-24 sm:px-6 md:py-32 lg:px-10"
    >
      <motion.div
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 max-w-2xl"
      >
        <h2 className="text-[clamp(1.9rem,3.8vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#0B0F17]">
          Прозрачная архитектура среды.
        </h2>
        <p className="mt-3.5 max-w-[50ch] text-[16px] leading-[1.6] text-[#3D4859]">
          Интерфейс не перегружает внимание. Каждая карточка растворяется в интерьере и
          откликается на прикосновение.
        </p>
      </motion.div>

      {/* Gapless 12-col dense Bento Grid: 4 interlocking cells, 0 empty voids */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:grid-flow-dense">
        {/* Cell 1: Cols 1-7, Rows 1-2 (Sunlit architectural photo + floating glass sheet) */}
        <motion.article
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="group relative col-span-1 min-h-[420px] overflow-hidden rounded-[2rem] shadow-[0_24px_64px_rgba(16,34,62,0.14)] ring-1 ring-white/80 md:col-span-7 md:row-span-2 md:min-h-[540px]"
        >
          <img
            src="./images/interior-sunlit.jpg"
            alt="Солнечная минималистичная гостиная с панорамным остеклением и стеклянной перегородкой"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
          />
          <div className="relative z-10 flex h-full flex-col justify-end p-4 sm:p-6">
            <LiquidGlassSurface className="p-6 sm:p-7">
              <h3 className="text-[clamp(1.35rem,2.2vw,1.95rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-[#0B0F17]">
                Циркадный ритм без ручных настроек
              </h3>
              <p className="mt-2.5 max-w-[44ch] text-[15px] leading-[1.58] text-[#283344]">
                Датчики считывают угол солнца за окном и плавно выравнивают баланс тёплого и
                холодного света во всех комнатах.
              </p>
            </LiquidGlassSurface>
          </div>
        </motion.article>

        {/* Cell 2: Cols 8-12, Row 1 (Interactive Liquid Glass Climate Dial) */}
        <motion.article
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 md:col-span-5 md:row-span-1"
        >
          <LiquidGlassSurface className="flex h-full flex-col justify-between p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ThermometerSimple size={20} weight="light" className="text-[#0071E3]" />
                <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-[#0B0F17]">
                  Микроклимат
                </h3>
              </div>
              <span className="text-[13px] font-medium text-[#3D4859]">Гостиная</span>
            </div>

            <div className="my-6 flex items-center justify-between gap-4 rounded-[1.5rem] bg-white/45 px-5 py-4 ring-1 ring-white/80">
              <button
                type="button"
                onClick={() => adjustTemp(-0.5)}
                aria-label="Уменьшить температуру"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-[#0B0F17] shadow-[0_4px_12px_rgba(14,32,58,0.1)] transition-transform active:scale-95 hover:bg-white"
              >
                <Minus size={18} weight="light" />
              </button>

              <div className="text-center">
                <div className="font-mono text-[clamp(1.9rem,3vw,2.5rem)] font-medium tracking-[-0.04em] text-[#0B0F17]">
                  {temp.toFixed(1)}°
                </div>
                <div className="text-[12px] text-[#3D4859]">Целевая температура</div>
              </div>

              <button
                type="button"
                onClick={() => adjustTemp(0.5)}
                aria-label="Увеличить температуру"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0071E3] text-white shadow-[0_6px_16px_rgba(0,113,227,0.3)] transition-transform active:scale-95 hover:bg-[#0064CA]"
              >
                <Plus size={18} weight="light" />
              </button>
            </div>

            <p className="text-[14px] leading-[1.55] text-[#3D4859]">
              Точность поддержания до половины градуса с учётом влажности и притока воздуха.
            </p>
          </LiquidGlassSurface>
        </motion.article>

        {/* Cell 3: Cols 8-12, Row 2 (Acoustic Clarity Glass Visualizer) */}
        <motion.article
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 md:col-span-5 md:row-span-1"
        >
          <LiquidGlassSurface className="flex h-full flex-col justify-between p-6 sm:p-7">
            <div className="flex items-center gap-2.5">
              <Waveform size={20} weight="light" className="text-[#0071E3]" />
              <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-[#0B0F17]">
                Акустический баланс
              </h3>
            </div>

            <div
              aria-hidden="true"
              className="my-6 flex h-20 items-end justify-between gap-2 rounded-[1.4rem] bg-white/40 px-5 py-4 ring-1 ring-white/75"
            >
              {[0.45, 0.78, 0.56, 0.95, 0.64, 0.85, 0.42, 0.7, 0.52, 0.88, 0.6, 0.48].map(
                (height, idx) => (
                  <motion.span
                    key={idx}
                    animate={
                      prefersReduced
                        ? undefined
                        : { scaleY: [height, Math.min(1, height + 0.22), Math.max(0.25, height - 0.18), height] }
                    }
                    transition={{
                      duration: 2.2 + (idx % 4) * 0.45,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ height: "100%", originY: 1, scaleY: height }}
                    className={`w-full rounded-full ${idx === 3 || idx === 9 ? "bg-[#0071E3]" : "bg-[#0B0F17]/22"}`}
                  />
                )
              )}
            </div>

            <p className="text-[14px] leading-[1.55] text-[#3D4859]">
              Система компенсирует эхо от стеклянных фасадов и выравнивает громкость речи.
            </p>
          </LiquidGlassSurface>
        </motion.article>

        {/* Cell 4: Cols 1-12, Row 3 (Wide Liquid Glass Optical Material Story) */}
        <motion.article
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 md:col-span-12 md:row-span-1"
        >
          <LiquidGlassSurface className="overflow-hidden">
            <div className="grid grid-cols-1 items-center md:grid-cols-12">
              <div className="p-7 sm:p-10 md:col-span-5">
                <h3 className="text-[clamp(1.45rem,2.4vw,2.1rem)] font-semibold leading-[1.14] tracking-[-0.03em] text-[#0B0F17]">
                  Оптическая глубина вместо плоских карточек
                </h3>
                <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.6] text-[#3D4859]">
                  Слои интерфейса ведут себя как настоящее полированное стекло: пропускают оттенок
                  окружения, сохраняя высокую контрастность текста.
                </p>
              </div>
              <div className="relative h-60 overflow-hidden md:col-span-7 md:h-72">
                <img
                  src="./images/glass-refraction.jpg"
                  alt="Преломление света через оптические стеклянные линзы"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </LiquidGlassSurface>
        </motion.article>
      </div>
    </section>
  );
}
