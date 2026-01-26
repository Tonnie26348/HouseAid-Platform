import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { animate } from "framer-motion";

type CounterProps = {
  from: number;
  to: number;
  duration?: number;
};

const Counter = ({ from, to, duration = 1 }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = value.toFixed(0);
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration]);

  return <span ref={ref} />;
};

export default Counter;
