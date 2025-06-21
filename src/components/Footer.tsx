import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo/Brand */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold font-mono text-electric">
              Rushist
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="flex items-center gap-2 text-gray-400 font-mono text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span>© {currentYear} Rushist. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart size={16} className="text-electric fill-current" />
            </motion.div>
            <span>and</span>
            <Code size={16} className="text-neon" />
          </motion.div>

          {/* Tech Credits */}
          <motion.div
            className="flex items-center gap-4 text-xs text-gray-500 font-mono"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span>React</span>
            <span>•</span>
            <span>GSAP</span>
            <span>•</span>
            <span>Framer Motion</span>
          </motion.div>
        </div>

        {/* Enhanced easter egg message */}
        <motion.div
          className="text-center mt-8 opacity-0 hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <p className="text-xs text-gray-600 font-mono mb-2">
            🎮 Try the Konami Code: ↑↑↓↓←→←→BA
          </p>
          <p className="text-xs text-gray-700 font-mono">
            💻 Unlock terminal mode for interactive project exploration
          </p>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 bg-electric/5 rounded-full blur-3xl"
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-40 h-40 bg-neon/5 rounded-full blur-3xl"
            animate={{ 
              x: [0, -100, 0],
              y: [0, 50, 0],
              scale: [1.2, 1, 1.2]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;