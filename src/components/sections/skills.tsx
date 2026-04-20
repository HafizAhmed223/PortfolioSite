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
  SiExpress,
  SiDocker,
  SiTypescript,
  SiTailwindcss,
  SiMui,
  SiRedux,
  SiGithubactions,
  SiFirebase,
  SiDjango,
  SiVuedotjs,
  SiMysql,
  SiWeb3Dotjs,
  SiJest,
} from 'react-icons/si';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React.js', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'Vue.js', icon: SiVuedotjs, color: '#42B883' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F0DB4F' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
      { name: 'Material UI', icon: SiMui, color: '#007FFF' },
      { name: 'Redux', icon: SiRedux, color: '#764ABC' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#68A063' },
      { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'Django REST', icon: SiDjango, color: '#092E20' },
    ],
  },
  {
    title: 'Database',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    skills: [
      { name: 'AWS', icon: SiAmazon, color: '#FF9900' },
      { name: 'Docker', icon: SiDocker, color: '#0DB7ED' },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
    ],
  },
  {
    title: 'Other',
    skills: [
      { name: 'Web3', icon: SiWeb3Dotjs, color: '#F16822' },
      { name: 'Jest', icon: SiJest, color: '#C21325' },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-b from-muted/20 to-background flex items-center justify-center"
    >
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 via-sky-500 to-teal-400 text-transparent bg-clip-text">
            Skills & Stack
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-3">
            Technologies I work with daily — from full-stack development to cloud infrastructure.
          </p>
        </motion.div>

        <div className="space-y-10 max-w-5xl mx-auto">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-primary tracking-widest uppercase">{cat.title}</span>
                <span className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {cat.skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center gap-3 rounded-xl bg-background border border-border px-4 py-3 hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.02] transition-all duration-200 cursor-default group"
                    >
                      <Icon
                        className="text-xl shrink-0 transition-transform duration-200 group-hover:scale-110"
                        style={{ color: skill.color }}
                      />
                      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
