"use client";

import { useEffect } from "react";

type MicrosoftClarityProps = {
  projectId?: string;
  enabled?: boolean;
  locale?: string;
};

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
type WindowWithClarity = Window & { clarity?: ClarityFn };

function getInjectedScript() {
  return document.querySelector<HTMLScriptElement>(
    'script[data-ms-clarity="true"]',
  );
}

function injectClarity(projectId: string) {
  // Create the global queueing function if missing.
  const w = window as WindowWithClarity;
  if (!w.clarity) {
    w.clarity = ((...args: unknown[]) => {
      const fn = (window as WindowWithClarity).clarity as ClarityFn;
      (fn.q = fn.q || []).push(args);
    }) as ClarityFn;
  }

  const script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.dataset.msClarity = "true";
  script.src = `https://www.clarity.ms/tag/${projectId}`;

  document.head.appendChild(script);
}

export default function MicrosoftClarity({
  projectId,
  enabled = true,
  locale,
}: MicrosoftClarityProps) {
  useEffect(() => {
    if (!enabled) return;
    if (!projectId) return;

    // Avoid duplicates across route/locale changes.
    if (getInjectedScript()) return;

    injectClarity(projectId);
  }, [enabled, projectId, locale]);

  return null;
}

