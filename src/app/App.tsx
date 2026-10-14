import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

// Wraps the router in both the browser (main.tsx) and the prerender
// (entry-server.tsx), so the static HTML and the hydrated app match.
export default function App({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
