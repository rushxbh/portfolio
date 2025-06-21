import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Brain, Shield, Recycle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'Readumé',
      description: 'AI-powered resume parser and job matcher using advanced OCR and NLP. Features intelligent document analysis, skill extraction, and automated job matching with 92% F1 score accuracy.',
      icon: <Brain className="w-8 h-8" />,
      tech: ['Tesseract OCR', 'BERT', 'Django', 'Next.js', 'LangChain', 'PostgreSQL'],
      features: [
        'Resume parsing with OCR technology',
        'ML-powered job matching (92% F1 score)',
        'LangChain chatbot integration',
        'Real-time skill extraction',
        'Automated application tracking'
      ],
      gradient: 'from-electric to-cyan-400',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'AcreVault',
      description: 'Blockchain-based land registry system using Ethereum smart contracts. Implements GIS mapping integration and ML fraud detection with 92% precision for secure property transactions.',
      icon: <Shield className="w-8 h-8" />,
      tech: ['Solidity', 'Ethereum', 'React', 'Web3.js', 'GIS Mapping', 'Python ML'],
      features: [
        'Smart contract land registry',
        'GIS mapping integration',
        'Fraud detection (92% precision)',
        'Immutable transaction history',
        'Multi-signature verification'
      ],
      gradient: 'from-neon to-green-400',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Waste Food Management',
      description: 'Award-winning hackathon solution for surplus food distribution. Features predictive analytics, Ethereum logging, and Power BI dashboards. Achieved 500+ successful donations and 65% repeat engagement.',
      icon: <Recycle className="w-8 h-8" />,
      tech: ['React', 'Node.js', 'Ethereum', 'Power BI', 'TensorFlow', 'MongoDB'],
      features: [
        'Surplus food tracking system',
        'Predictive demand forecasting',
        'Blockchain donation logging',
        'Real-time analytics dashboards',
        'Mobile-responsive interface'
      ],
      gradient: 'from-purple-neon to-pink-400',
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !cards) return;

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
          end: 'bottom 20%',
        }
      }
    );

    // Cards stagger animation
    gsap.fromTo(cards.children,
      { opacity: 0, y: 100, rotationX: -15 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards,
          start: 'top 85%',
          end: 'bottom 20%',
        }
      }
    );
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold font-mono text-center mb-16 bg-gradient-to-r from-electric via-neon to-purple-neon bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-electric/50 transition-all duration-500"
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${project.gradient} text-gray-900`}>
                {project.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold font-mono text-white mb-4">{project.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-electric mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-400 flex items-center">
                      <span className="w-1.5 h-1.5 bg-neon rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono bg-gray-700/50 text-gray-300 rounded-full border border-gray-600/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4">
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-electric/10 border border-electric/30 text-electric rounded-lg hover:bg-electric/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={16} />
                  <span className="text-sm font-mono">Live Demo</span>
                </motion.a>
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 border border-gray-600/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={16} />
                  <span className="text-sm font-mono">Code</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;