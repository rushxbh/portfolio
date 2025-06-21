import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Briefcase, Trophy, Code, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      title: 'Freelance Developer',
      role: 'Sales & Inventory Management System',
      period: '2023 - Present',
      icon: <Briefcase className="w-6 h-6" />,
      description: 'Built comprehensive full-stack web application for retail businesses with advanced inventory tracking, analytics, and sales reporting capabilities.',
      achievements: [
        'Developed complete CRUD operations for product management',
        'Implemented role-based user authentication system',
        'Created real-time inventory updates and notifications',
        'Built interactive dashboards with data visualization',
        'Integrated payment processing and order management'
      ],
      tech: ['React', 'Node.js', 'PostgreSQL', 'JWT', 'Chart.js'],
      gradient: 'from-electric to-cyan-400'
    },
    {
      title: 'Hackathon Winner',
      role: 'VES-HACK-IT Competition',
      period: '2023',
      icon: <Trophy className="w-6 h-6" />,
      description: 'Led team to victory with innovative Waste Food Inventory System, addressing food waste through technology and achieving significant social impact.',
      achievements: [
        'Matched 500+ food donations successfully',
        'Achieved 65% repeat user engagement rate',
        'Implemented predictive analytics for demand forecasting',
        'Created Ethereum-based transaction logging',
        'Developed comprehensive Power BI dashboards'
      ],
      tech: ['React', 'Ethereum', 'TensorFlow', 'Power BI', 'Node.js'],
      gradient: 'from-neon to-green-400'
    },
    {
      title: 'Full Stack Developer',
      role: 'Personal Projects & Learning',
      period: '2022 - Present',
      icon: <Code className="w-6 h-6" />,
      description: 'Continuous learning and development through challenging personal projects, open-source contributions, and technology exploration.',
      achievements: [
        'Built 10+ full-stack applications from concept to deployment',
        'Contributed to open-source projects on GitHub',
        'Mastered modern frameworks and development tools',
        'Implemented CI/CD pipelines and DevOps practices',
        'Explored emerging technologies like Web3 and AI/ML'
      ],
      tech: ['React', 'Next.js', 'Django', 'Docker', 'AWS'],
      gradient: 'from-purple-neon to-pink-400'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const timeline = timelineRef.current;

    if (!section || !title || !timeline) return;

    // Title animation
    gsap.fromTo(title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );

    // Timeline items animation
    const timelineItems = timeline.children;
    gsap.fromTo(timelineItems,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 85%',
          end: 'bottom 20%',
        }
      }
    );
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold font-mono text-center mb-16 bg-gradient-to-r from-electric via-neon to-purple-neon bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric via-neon to-purple-neon opacity-30" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gray-900 border-4 border-electric rounded-full flex items-center justify-center z-10">
                <div className={`text-electric`}>
                  {exp.icon}
                </div>
              </div>

              {/* Content card */}
              <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
              }`}>
                <motion.div
                  className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-electric/50 transition-all duration-500"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold font-mono text-white">{exp.title}</h3>
                      <span className="text-sm font-mono text-electric bg-electric/10 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold text-neon mb-4">{exp.role}</h4>
                    <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h5 className="text-sm font-semibold text-electric mb-3">Key Achievements:</h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-gray-400 flex items-start">
                            <BarChart3 size={14} className="text-neon mt-0.5 mr-3 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono bg-gray-700/50 text-gray-300 rounded-full border border-gray-600/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;