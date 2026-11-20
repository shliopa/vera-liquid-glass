"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, WarningCircle } from "@phosphor-icons/react";
import { LiquidGlassSurface } from "./LiquidGlassSurface";

export function AccessSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const prefersReduced = useReducedMotion();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: { name?: string; email?: string } = {};
    if (name.trim().length < 2) nextErrors.name = "Укажите ваше имя.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Введите корректный адрес электронной почты.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 750);
  };

  return (
    <section
      id="access"
      className="relative mx-auto w-full max-w-[1360px] px-4 pt-20 pb-28 sm:px-6 md:pt-28 md:pb-16 lg:px-10"
    >
      <LiquidGlassSurface className="p-7 sm:p-12 lg:p-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-[#0B0F17]">
              Откройте ранний доступ к VERA.
            </h2>
            <p className="mt-4 max-w-[44ch] text-[16px] leading-[1.6] text-[#283344]">
              Оставьте контакты, чтобы получить приглашение на тестирование приложения и
              индивидуальную настройку световых сцен.
            </p>
          </div>

          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="done"
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[1.6rem] bg-white/60 p-7 ring-1 ring-white/90"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0071E3] text-white">
                    <Check size={20} weight="bold" />
                  </div>
                  <h3 className="mt-5 text-[22px] font-semibold tracking-[-0.02em] text-[#0B0F17]">
                    Приглашение зарезервировано
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.6] text-[#283344]">
                    Мы отправили подтверждение на {email} и скоро пришлём ссылку для установки
                    VERA.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setName("");
                      setEmail("");
                      setStatus("idle");
                    }}
                    className="mt-5 text-[14px] font-semibold text-[#0071E3] hover:opacity-80"
                  >
                    Указать другой адрес
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 rounded-[1.6rem] bg-white/45 p-6 ring-1 ring-white/80 sm:p-7"
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="vera-name" className="text-[13px] font-semibold text-[#151D2B]">
                      Имя
                    </label>
                    <input
                      id="vera-name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                      }}
                      placeholder="Анна Смирнова"
                      aria-invalid={Boolean(errors.name)}
                      className={[
                        "h-12 w-full rounded-2xl bg-white/75 px-4 text-[15px] text-[#0B0F17] placeholder:text-[#5B677A]",
                        "border transition-colors focus:outline-none",
                        errors.name
                          ? "border-[#D93025]"
                          : "border-white/90 focus:border-[#0071E3]",
                      ].join(" ")}
                    />
                    {errors.name && (
                      <p role="alert" className="flex items-center gap-1.5 text-[13px] text-[#B91C1C]">
                        <WarningCircle size={15} weight="light" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="vera-email" className="text-[13px] font-semibold text-[#151D2B]">
                      Электронная почта
                    </label>
                    <input
                      id="vera-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                      }}
                      placeholder="anna@example.com"
                      aria-invalid={Boolean(errors.email)}
                      className={[
                        "h-12 w-full rounded-2xl bg-white/75 px-4 text-[15px] text-[#0B0F17] placeholder:text-[#5B677A]",
                        "border transition-colors focus:outline-none",
                        errors.email
                          ? "border-[#D93025]"
                          : "border-white/90 focus:border-[#0071E3]",
                      ].join(" ")}
                    />
                    {errors.email && (
                      <p role="alert" className="flex items-center gap-1.5 text-[13px] text-[#B91C1C]">
                        <WarningCircle size={15} weight="light" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex w-full items-center justify-between gap-3 rounded-full bg-[#0071E3] pl-6 pr-2 py-2 text-[14px] font-semibold text-white whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_14px_30px_rgba(0,113,227,0.3)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#0064CA] active:scale-[0.98] disabled:opacity-60 sm:w-auto"
                    >
                      <span>
                        {status === "submitting" ? "Отправляем заявку..." : "Запросить доступ"}
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                      >
                        <ArrowUpRight size={15} weight="light" />
                      </span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </LiquidGlassSurface>

      <footer className="mt-14 flex flex-col gap-5 border-t border-[#0B0F17]/10 pt-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.14em] text-[#0B0F17] uppercase">
          <span className="h-2.5 w-2.5 rounded-full bg-[#0071E3]" aria-hidden="true" />
          <span>VERA SPATIAL</span>
        </div>

        <nav aria-label="Ссылки в подвале" className="flex flex-wrap gap-6 text-[13px] text-[#3D4859]">
          <a href="#live-studio" className="transition-colors hover:text-[#0B0F17]">
            Свет
          </a>
          <a href="#bento" className="transition-colors hover:text-[#0B0F17]">
            Среда
          </a>
          <a href="#optics" className="transition-colors hover:text-[#0B0F17]">
            Оптика
          </a>
        </nav>

        <p className="text-[13px] text-[#4C586B]">© {new Date().getFullYear()} VERA.</p>
      </footer>
    </section>
  );
}
