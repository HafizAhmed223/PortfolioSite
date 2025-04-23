import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiJavascript,
  SiPython,
  SiAmazon,
  SiMongodb,
  SiPostgresql,
  SiFastapi,
  // SiExpress,
  SiDocker,
  SiTypescript,
  SiTailwindcss,
  SiFigma,
  SiMui,
  SiAntdesign,
  SiRedux,
  // SiGithubactions,
  SiFirebase,
} from 'react-icons/si';

const skills = {
  expert: [
    { name: 'React.js', icon: SiReact, color: '#61dafb' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'JavaScript', icon: SiJavascript, color: '#f0db4f' },
  ],
  intermediate: [
    { name: 'Node.js', icon: SiNodedotjs, color: '#68a063' },
    { name: 'Python', icon: SiPython, color: '#3776ab' },
    { name: 'AWS', icon: SiAmazon, color: '#ff9900' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
    { name: 'SQL', icon: SiPostgresql, color: '#003b57' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
    // { name: 'Express.js', icon: SiExpress, color: '#000000' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
    { name: 'Figma', icon: SiFigma, color: '#f24e1e' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8' },
    { name: 'Material UI', icon: SiMui, color: '#007fff' },
    { name: 'Ant Design', icon: SiAntdesign, color: '#0170fe' },
    { name: 'Redux', icon: SiRedux, color: '#764abc' },
    // { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088ff' },
  ],
  novice: [
    { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
    { name: 'Docker', icon: SiDocker, color: '#0db7ed' },
    { name: 'Firebase', icon: SiFirebase, color: '#ffca28' },
  ],
};

const renderDots = (level: number, color: string) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`h-2.5 w-2.5 rounded-full ${i < level ? 'opacity-100' : 'opacity-30'}`}
        style={{ backgroundColor: color }}
      />
    ))}
  </div>
);

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-white to-muted/40 dark:from-background dark:to-muted/10 flex items-center justify-center">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 via-sky-500 to-teal-400 text-transparent bg-clip-text">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-3">
            Technologies I work with, expressed through clean and confident design.
          </p>
        </motion.div>

        {/* Grouped Skills */}
        {(['expert', 'intermediate', 'novice'] as Array<keyof typeof skills>).map((category) => (
          <div key={category} className="mb-12">
            {/* <h3 className="text-2xl font-bold mb-6">
              {category === 'expert' ? 'Expert (Level 5)' : category === 'intermediate' ? 'Intermediate (Level 4)' : 'Novice (Level 3)'}
            </h3> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {skills[category].map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="rounded-2xl bg-white dark:bg-zinc-900/80 shadow-md border border-zinc-200 dark:border-zinc-700 p-6 hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Icon className="text-2xl" style={{ color: skill.color }} />
                        <span className="font-semibold text-lg text-zinc-800 dark:text-white">
                          {skill.name}
                        </span>
                      </div>
                      {renderDots(5, skill.color)} {/* Assuming maximum of 5 dots for simplicity */}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
