"use client";

import { useEffect, useRef } from "react";

type EnableAccessibilityProps = {
  scriptSrc: string;
  locale: string;
};

function getInjectedScript() {
  return document.querySelector<HTMLScriptElement>(
    'script[data-enable-toolbar="true"]',
  );
}

function removeEnableToolbarDomArtifacts() {
  // Main container the script injects
  document.getElementById("enable-toolbar")?.remove();

  // Script tag we injected (keep it scoped to our own marker)
  getInjectedScript()?.remove();

  // The init.js injects a <style> with lots of "#enable-toolbar" CSS.
  document.querySelectorAll<HTMLStyleElement>("style").forEach((styleEl) => {
    if (styleEl.textContent?.includes("#enable-toolbar")) {
      styleEl.remove();
    }
  });
}

function resetEnableToolbarGlobals() {
  const w = window as unknown as Record<string, unknown>;
  // Enable blocks re-loading if enable_toolbar_loaded is ANYTHING except null/undefined.
  // Setting to undefined is safer than delete if the property isn't configurable.
  w.enable_toolbar_loaded = undefined;
  w.enable_toolbar = undefined;
}

function injectEnableToolbarScript(scriptSrc: string) {
  const el = document.createElement("script");
  el.async = true;
  el.defer = true;
  el.dataset.enableToolbar = "true";

  // Bust cache to avoid any weirdness with re-injecting.
  const sep = scriptSrc.includes("?") ? "&" : "?";
  el.src = `${scriptSrc}${sep}ts=${Date.now()}`;

  document.head.appendChild(el);
}

export default function EnableAccessibility({
  scriptSrc,
  locale,
}: EnableAccessibilityProps) {
  // Avoid infinite retries if the vendor script fails for any reason.
  const attemptsRef = useRef(0);
  const pendingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const ensureToolbar = (mode: "inject-if-needed" | "check-only") => {
      if (cancelled) return;

      // If the toolbar is present, don't touch anything.
      if (document.getElementById("enable-toolbar")) return;

      const w = window as unknown as Record<string, unknown>;
      const existingScript = getInjectedScript();
      const loadedFlag = w.enable_toolbar_loaded;

      if (existingScript && (loadedFlag === undefined || loadedFlag === null)) {
        // Script exists and hasn't marked itself loaded yet; wait.
        return;
      }

      if (mode === "check-only") return;
      if (pendingRef.current) return;

      pendingRef.current = true;

      // Vendor script has a global guard:
      // if (window.enable_toolbar_loaded !== null && !== undefined) { return; }
      // So we must reset it before re-injecting.
      removeEnableToolbarDomArtifacts();
      resetEnableToolbarGlobals();
      getInjectedScript()?.remove();
      injectEnableToolbarScript(scriptSrc);
    };

    ensureToolbar("inject-if-needed");

    // The DOM can be in flux right after locale navigation; do a check-only retry.
    // If still missing AND no script exists, do one more inject attempt.
    const t = window.setTimeout(() => {
      if (cancelled) return;

      // If toolbar appeared, great.
      if (document.getElementById("enable-toolbar")) {
        pendingRef.current = false;
        return;
      }

      const w = window as unknown as Record<string, unknown>;
      const existingScript = getInjectedScript();
      const loadedFlag = w.enable_toolbar_loaded;

      // If script exists and hasn't finished loading, wait.
      if (existingScript && (loadedFlag === undefined || loadedFlag === null)) {
        return;
      }

      attemptsRef.current += 1;
      pendingRef.current = false;
      if (attemptsRef.current <= 1) ensureToolbar("inject-if-needed");
    }, 1200);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
      pendingRef.current = false;
    };
  }, [scriptSrc, locale]);

  return null;
}
