import * as motion from "motion/react-client";
import AnimatedHello from "./hero/AnimatedHello";

const parentVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.4 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1] as any },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-visible">
      <AnimatedHello />
      <motion.div
        variants={parentVariant}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center"
      >
        <motion.h1
          variants={childVariants}
          className="text-4xl font-semibold text-white"
        >
          <motion.span
            animate={{
              rotate: [0, 14, -8, 14, -4, 10, 0],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              delay: 2.2,
            }}
            className="inline-block origin-[70%_70%]"
          >
            👋
          </motion.span>{" "}
          I&apos;m Matthew Gajo
        </motion.h1>
        <motion.p
          variants={childVariants}
          className="text-text-muted mb-3 text-xl font-semibold"
        >
          Full-Stack Software Engineer
        </motion.p>

        {/* Status Badge */}
        <motion.div
          variants={childVariants}
          className="inline-flex items-center gap-2 rounded-full bg-[#80EFB6]/10 px-4 py-2"
        >
          <div className="h-2 w-2 animate-pulse rounded-full bg-[#80EFB6]"></div>
          <span className="text-sm font-medium text-white">
            Open to all opportunities
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
