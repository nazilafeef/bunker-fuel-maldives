import { motion, useReducedMotion } from 'framer-motion';

/**
 * Reveal — soft, ocean-rhythm motion. Strictly respects prefers-reduced-motion.
 * Max parallax is 8% per spec.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 14,
  duration = 0.7,
  className = '',
  once = true,
  as: Tag = 'div',
}) {
  const reduce = useReducedMotion();

  const MotionTag = motion[Tag] || motion.div;

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
