"use client";
import { BrowserClient, feedbackIntegration, getClient } from "@sentry/react";
import { useCallback } from "react";

type FeedbackIntegration = ReturnType<typeof feedbackIntegration>;

function CustomSentryFeedbackButton() {
  const handleOpen = useCallback(async () => {
    try {
      const client = getClient<BrowserClient>();
      const feedback =
        client?.getIntegrationByName<FeedbackIntegration>("Feedback");

      if (!feedback) {
        console.warn("Sentry feedback integration not found");
        return;
      }

      // Create and open the form on demand
      const form = await feedback.createForm();
      form.appendToDom();
      form.open();
    } catch (e) {
      console.error("Failed to open Sentry feedback form:", e);
    }
  }, []);

  const client = getClient<BrowserClient>();
  const feedback =
    client?.getIntegrationByName<FeedbackIntegration>("Feedback");

  if (!feedback) return null;

  return (
    <button
      id="sentry-feedback"
      type="button"
      onClick={handleOpen}
      className="fixed bottom-4 right-4 z-[6000] flex items-center justify-center rounded-full bg-[#1f2937] px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-[#111827] focus:outline-none"
      aria-label="Report a bug"
    >
      Report a Bug
    </button>
  );
}

export default CustomSentryFeedbackButton;
