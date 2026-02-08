import * as motion from "motion/react-client";

import BentoCard from './bento/BentoCard';
import Iphone from './projects/Iphone';
import Macbook from './projects/Macbook';
import ProjectShowcase from './projects/ProjectShowcase';
import DebloatPreview from './projects/DebloatPreview';

export default function Projects() {
  return (
    <section className="flex flex-col gap-8 mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-16">
      <div className="flex items-center gap-2 font-roboto">
        <span className="text-lg font-black text-text-muted">~/</span>
        <h2 className="text-3xl font-bold tracking-wide">PROJECTS</h2>
      </div>
      <div className="grid md:grid-cols-12 gap-7 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="group md:col-span-3 flex flex-col min-h-0"
        >
          <ProjectShowcase
            title="Debloat Buddy"
            description="AI Gut health app for IOS"
            emoji="🍎"
            href="https://apps.apple.com/us/app/debloat-buddy/id6743240732"
            tiltClassName="md:translate-x-15 md:-rotate-z-15 group-hover:translate-x-0 group-hover:rotate-z-0"
          >
            <Iphone className="h-[90%]">
              <DebloatPreview />
            </Iphone>
          </ProjectShowcase>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="md:col-span-9 flex flex-col min-h-0"
        >
          <BentoCard className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <div className="flex-1 min-h-0 flex items-center justify-center">
              <Macbook image="/macplaceholder.png" />
            </div>
          </BentoCard>
        </motion.div>
      </div>
    </section>
  );
}