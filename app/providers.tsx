"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    // Zonder key (bv. lokaal zonder env) niet initialiseren — voorkomt runtime-errors.
    if (!key) return;

    posthog.init(key, {
      api_host: apiHost,
      // AVG-conservatief: alleen een person-profiel zodra iemand geïdentificeerd is.
      person_profiles: "identified_only",
      capture_pageview: true,
      // Bewust uit voor nu — session recording wordt niet geactiveerd.
      disable_session_recording: true,
      // Geen autocapture: we vermijden zo het meelezen van input-velden met PII
      // (textarea, e-mail, telefoon). Relevante events sturen we handmatig.
      autocapture: false,
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
