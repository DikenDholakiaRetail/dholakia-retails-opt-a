"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, AlertCircle, ChevronDown, Loader2 } from "lucide-react";
import { EASE_STANDARD } from "@/lib/motion";
import {
  applicationSchema,
  HOW_HEARD_OPTIONS,
  type ApplicationInput,
} from "@/lib/application-schema";

type Props = { roleSlug: string; roleTitle: string };

export default function ApplicationForm({ roleSlug, roleTitle }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      currentRole: "",
      cvUrl: "",
      coverNote: "",
      howDidYouHear: "Company website",
      roleSlug,
      website: "",
    },
  });

  const onSubmit = async (data: ApplicationInput) => {
    setStatus("loading");
    setServerError(null);
    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !json.ok)
        throw new Error(json.message ?? "Something went wrong. Please try again.");
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError((err as Error).message);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: EASE_STANDARD }}
          className="flex flex-col items-center text-center bg-[var(--color-bg-elevated)] p-10 rounded-sm"
          role="status"
        >
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent-primary)] text-white mb-5">
            <Check size={28} strokeWidth={1.5} />
          </span>
          <h3
            className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-3"
            style={{ fontSize: "1.5rem", fontWeight: 500 }}
          >
            Application received.
          </h3>
          <p className="text-[var(--color-text-body)] mb-8 max-w-md">
            Every serious application is read by a human. You will hear back
            within five business days.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-[var(--color-accent-primary)] text-[0.875rem] font-medium underline-offset-4 hover:underline"
          >
            Submit another application
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
          noValidate
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          <p className="text-[0.75rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] mb-1">
            Applying for · {roleTitle}
          </p>

          <Field
            label="Full Name"
            name="fullName"
            type="text"
            autoComplete="name"
            register={register}
            error={errors.fullName?.message}
          />
          <Field
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            register={register}
            error={errors.email?.message}
          />
          <Field
            label="Current Role"
            name="currentRole"
            type="text"
            autoComplete="organization-title"
            register={register}
            error={errors.currentRole?.message}
          />
          <Field
            label="Portfolio / CV link"
            name="cvUrl"
            type="url"
            register={register}
            error={errors.cvUrl?.message}
          />
          <Textarea
            label="Cover note"
            name="coverNote"
            rows={5}
            register={register}
            error={errors.coverNote?.message}
          />
          <Select
            label="How did you hear?"
            name="howDidYouHear"
            options={HOW_HEARD_OPTIONS as readonly string[]}
            register={register}
            error={errors.howDidYouHear?.message}
          />

          {/* Hidden role slug — included on submit */}
          <input type="hidden" {...register("roleSlug")} />

          {/* Honeypot */}
          <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <label>
              Leave this empty
              <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
            </label>
          </div>

          {serverError && (
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-[0.875rem] text-red-600"
            >
              <AlertCircle size={14} strokeWidth={1.5} />
              {serverError}
            </motion.p>
          )}

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
            }}
          >
            <button
              type="submit"
              disabled={!isValid || status === "loading"}
              className="group/cta inline-flex items-center justify-center gap-3 w-full h-12 px-8 rounded-[2px] bg-[var(--color-accent-primary)] text-white text-[0.95rem] tracking-wide hover:bg-[var(--color-accent-deep)] transition-colors duration-[240ms] disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} strokeWidth={1.8} className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Submit application
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-[240ms] group-hover/cta:translate-x-1"
                  />
                </>
              )}
            </button>
          </motion.div>

          <motion.p
            className="text-[0.8rem] text-center text-[var(--color-text-muted)]"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.4 } },
            }}
          >
            Every serious application is read by a human.
          </motion.p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

type RegisterFn = ReturnType<typeof useForm<ApplicationInput>>["register"];

function Field({
  label,
  name,
  type,
  autoComplete,
  register,
  error,
}: {
  label: string;
  name: keyof ApplicationInput;
  type: string;
  autoComplete?: string;
  register: RegisterFn;
  error?: string;
}) {
  return (
    <motion.label
      className="relative block"
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
      }}
    >
      <input
        type={type}
        autoComplete={autoComplete}
        placeholder=" "
        aria-invalid={!!error}
        className={[
          "peer w-full bg-transparent border-b pt-6 pb-2 outline-none text-[1rem] text-[var(--color-text-primary)] placeholder-transparent transition-colors duration-200",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-black/15 focus:border-[var(--color-accent-primary)]",
        ].join(" ")}
        {...register(name)}
      />
      <span
        className="pointer-events-none absolute left-0 top-2 text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] transition-all duration-200 ease-out
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-[1rem] peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case
          peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:tracking-[0.14em] peer-focus:uppercase peer-focus:text-[var(--color-accent-primary)]"
      >
        {label}
      </span>
      {error && <span className="mt-1 block text-[0.8rem] text-red-600">{error}</span>}
    </motion.label>
  );
}

function Textarea({
  label,
  name,
  rows = 5,
  register,
  error,
}: {
  label: string;
  name: keyof ApplicationInput;
  rows?: number;
  register: RegisterFn;
  error?: string;
}) {
  return (
    <motion.label
      className="relative block"
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
      }}
    >
      <textarea
        rows={rows}
        placeholder=" "
        aria-invalid={!!error}
        className={[
          "peer w-full bg-transparent border-b pt-6 pb-2 outline-none text-[1rem] text-[var(--color-text-primary)] placeholder-transparent resize-y transition-colors duration-200",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-black/15 focus:border-[var(--color-accent-primary)]",
        ].join(" ")}
        {...register(name)}
      />
      <span
        className="pointer-events-none absolute left-0 top-2 text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] transition-all duration-200 ease-out
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-[1rem] peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case
          peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:tracking-[0.14em] peer-focus:uppercase peer-focus:text-[var(--color-accent-primary)]"
      >
        {label}
      </span>
      {error && <span className="mt-1 block text-[0.8rem] text-red-600">{error}</span>}
    </motion.label>
  );
}

function Select({
  label,
  name,
  options,
  register,
  error,
}: {
  label: string;
  name: keyof ApplicationInput;
  options: readonly string[];
  register: RegisterFn;
  error?: string;
}) {
  return (
    <motion.label
      className="relative block"
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
      }}
    >
      <span className="absolute left-0 top-2 text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)]">
        {label}
      </span>
      <select
        aria-invalid={!!error}
        className={[
          "w-full appearance-none bg-transparent border-b pt-6 pb-2 pr-8 outline-none text-[1rem] text-[var(--color-text-primary)] transition-colors duration-200",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-black/15 focus:border-[var(--color-accent-primary)]",
        ].join(" ")}
        {...register(name)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        strokeWidth={1.5}
        className="pointer-events-none absolute right-0 top-7 text-[var(--color-text-muted)]"
      />
      {error && <span className="mt-1 block text-[0.8rem] text-red-600">{error}</span>}
    </motion.label>
  );
}
