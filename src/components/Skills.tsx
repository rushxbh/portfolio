import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React', icon: '⚛️' },
        { name: 'Next.js', icon: '🔺' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'Tailwind CSS', icon: '🎨' },
        { name: 'Framer Motion', icon: '🎭' },
        { name: 'GSAP', icon: '⚡' },
        { name: 'JavaScript', icon: '🟨' },
        { name: 'HTML5', icon: '🌐' }
      ],
      gradient: 'from-electric to-cyan-400'
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', icon: '🟢' },
        { name: 'Django', icon: '🐍' },
        { name: 'Express.js', icon: '🚀' },
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'Redis', icon: '📮' },
        { name: 'Python', icon: '🐍' },
        { name: 'REST APIs', icon: '🔗' }
      ],
      gradient: 'from-neon to-green-400'
    },
    {
      title: 'AI/ML & Blockchain',
      skills: [
        { name: 'TensorFlow', icon: '🧠' },
        { name: 'BERT/NLP', icon: '🔤' },
        { name: 'LangChain', icon: '🔗' },
        { name: 'Solidity', icon: '💎' },
        { name: 'Web3.js', icon: '🌐' },
        { name: 'Ethereum', icon: '⟠' },
        { name: 'scikit-learn', icon: '📊' },
        { name: 'OpenAI', icon: '🤖' }
      ],
      gradient: 'from-purple-neon to-pink-400'
    },
    {
      title: 'DevOps & Tools',
      skills: [
        { name: 'Docker', icon: '🐳' },
        { name: 'AWS', icon: '☁️' },
        { name: 'GitHub Actions', icon: '🔄' },
        { name: 'Postman', icon: '📮' },
        { name: 'VS Code', icon: '💻' },
        { name: 'Git', icon: '📚' },
        { name: 'Power BI', icon: '📈' },
        { name: 'Linux', icon: '🐧' }
      ],
      gradient: 'from-orange-400 to-red-400'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;

    if (!section || !title || !grid) return;

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

    // Grid animation
    gsap.fromTo(grid.children,
      { opacity: 0, y: 100, rotationX: -15 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          end: 'bottom 20%',
        }
      }
    );
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold font-mono text-center mb-16 bg-gradient-to-r from-electric via-neon to-purple-neon bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Skills & Expertise
        </motion.h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-electric/50 transition-all duration-500"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <h3 className={`text-2xl font-bold font-mono mb-6 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>

                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="group/skill flex flex-col items-center p-3 bg-gray-700/30 backdrop-blur-sm rounded-xl border border-gray-600/30 hover:border-electric/40 hover:bg-gray-600/40 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: skillIndex * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <div className="text-3xl mb-2 group-hover/skill:scale-110 transition-transform duration-300">
                        {skill.icon}
                      </div>
                      <span className="text-xs font-mono text-gray-300 text-center leading-tight group-hover/skill:text-white transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional stats */}
        
      </div>
    </section>
  );
};

export default Skills;