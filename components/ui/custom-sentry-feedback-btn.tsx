import { BrowserClient, feedbackIntegration, getClient } from "@sentry/react";

type FeedbackIntegration = ReturnType<typeof feedbackIntegration>;

function CustomSentryFeedbackButton() {
  const client = getClient<BrowserClient>();
  const feedback =
    client?.getIntegrationByName<FeedbackIntegration>("Feedback");

  // Don't render custom feedback button if Feedback integration isn't installed
  if (!feedback) {
    return null;
  }

  return (
    <button
      id="sentry-feedback"
      type="button"
      onClick={async () => {
        const form = await feedback.createForm();
        form.appendToDom();
        form.open();
      }}
      className="fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center"
    >
      Give me feedback
    </button>
  );
}

export default CustomSentryFeedbackButton;
