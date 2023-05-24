import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";

export default function Animate({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {children}
      </AnimatePresence>
    </LazyMotion>
  )
}