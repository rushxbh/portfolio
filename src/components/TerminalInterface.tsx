import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AirHockeySimulation from './game.tsx';

interface TerminalInterfaceProps {
  isActive: boolean;
  onClose: () => void;
}

const TerminalInterface: React.FC<TerminalInterfaceProps> = ({ isActive, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState('~/portfolio');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [showHockey, setShowHockey] = useState(false);

  const asciiArt = {
    logo: `
    ██████╗ ██╗   ██╗███████╗██╗  ██╗██╗███████╗████████╗
    ██╔══██╗██║   ██║██╔════╝██║  ██║██║██╔════╝╚══██╔══╝
    ██████╔╝██║   ██║███████╗███████║██║███████╗   ██║   
    ██╔══██╗██║   ██║╚════██║██╔══██║██║╚════██║   ██║   
    ██║  ██║╚██████╔╝███████║██║  ██║██║███████║   ██║   
    ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝   ╚═╝   
    `,
    readume: `
    ┌─────────────────────────────────────────┐
    │  📄 READUMÉ - AI Resume Parser          │
    │  ┌─────────────────────────────────────┐ │
    │  │ [OCR] → [NLP] → [ML] → [MATCH]      │ │
    │  │                                     │ │
    │  │ ▓▓▓▓▓▓▓▓▓▓ 92% F1 Score            │ │
    │  │ ▓▓▓▓▓▓▓▓▓▓ BERT Integration         │ │
    │  │ ▓▓▓▓▓▓▓▓▓▓ LangChain Chatbot        │ │
    │  └─────────────────────────────────────┘ │
    └─────────────────────────────────────────┘
    `,
    acrevault: `
    ┌─────────────────────────────────────────┐
    │  🏠 ACREVAULT - Blockchain Land Registry│
    │  ┌─────────────────────────────────────┐ │
    │  │ [ETH] ←→ [GIS] ←→ [SMART CONTRACT]  │ │
    │  │                                     │ │
    │  │ ⛓️  Immutable Records               │ │
    │  │ 🗺️  GIS Mapping                     │ │
    │  │ 🛡️  92% Fraud Detection             │ │
    │  └─────────────────────────────────────┘ │
    └─────────────────────────────────────────┘
    `,
    wastefood: `
    ┌─────────────────────────────────────────┐
    │  ♻️  WASTE FOOD MANAGEMENT - Winner     │
    │  ┌─────────────────────────────────────┐ │
    │  │ [PREDICT] → [MATCH] → [DISTRIBUTE]  │ │
    │  │                                     │ │
    │  │ 📊 500+ Donations Matched           │ │
    │  │ 📈 65% Repeat Engagement            │ │
    │  │ ⚡ Real-time Analytics              │ │
    │  └─────────────────────────────────────┘ │
    └─────────────────────────────────────────┘
    `
  };

  const commands = {
    help: () => [
      'Available commands:',
      '  help          - Show this help message',
      '  ls            - List available projects',
      '  cat <project> - Display project details',
      '  skills        - Show technical skills',
      '  contact       - Display contact information',
      '  whoami        - About the developer',
      '  clear         - Clear terminal',
      '  exit          - Exit terminal mode',
      '',
      'Projects: readume, acrevault, wastefood'
    ],
    ls: () => [
      'total 3',
      'drwxr-xr-x  2 rushist  staff   64 Dec 2024 readume/',
      'drwxr-xr-x  2 rushist  staff   64 Dec 2024 acrevault/',
      'drwxr-xr-x  2 rushist  staff   64 Dec 2024 wastefood/',
      '-rw-r--r--  1 rushist  staff  1.2K Dec 2024 skills.txt',
      '-rw-r--r--  1 rushist  staff  512 Dec 2024 contact.txt'
    ],
    whoami: () => [
      'Rushist - Full Stack Software Developer',
      '',
      'Specializing in:',
      '• AI-powered applications',
      '• Blockchain solutions',
      '• Full-stack web development',
      '• Machine learning integration',
      '',
      'Currently crafting the future, one line of code at a time.'
    ],
    skills: () => [
      'Technical Skills Matrix:', 
      '',
      '┌─────────────────┬──────────────────┬────────────────────┐',
      '│ Frontend        │ Backend          │ AI/ML & Blockchain │',
      '├─────────────────┼──────────────────┼────────────────────┤',
      '│ React ⚛️        │ Node.js 🟢      │ TensorFlow🧠       │',
      '│ Next.js 🔺      │ Django 🐍       │ BERT/NLP 🔤        │',
      '│ TypeScript 📘   │ Express.js 🚀   │ LangChain 🔗       │',
      '│ Tailwind 🎨     │ PostgreSQL 🐘   │ Solidity 💎        │',
      '│ GSAP ⚡         │ MongoDB 🍃      │ Web3.js 🌐         │',
      '└─────────────────┴──────────────────┴────────────────────┘'
    ],
    contact: () => [
      'Contact Information:',
      '',
      '📧 Email: rushabh9372@gmail.com',
      '📱 Phone: +91 91584 97458',
      '💼 LinkedIn: linkedin.com/in/rushist',
      '🔗 LeetCode: leetcode.com/u/rushist',
      '📄 Resume: Available for download',
      '',
      'Location: Mumbai, Maharashtra'
    ],
    clear: () => 'CLEAR',
    exit: () => 'EXIT'
  };

  const projectCommands = {
    readume: () => [
      asciiArt.readume,
      'READUMÉ - AI-Powered Resume Parser & Job Matcher',
      '',
      'Description:',
      'Advanced resume parsing system using OCR and NLP technologies',
      'to extract skills and match candidates with relevant job opportunities.',
      '',
      'Key Features:',
      '• Tesseract OCR for document processing',
      '• BERT model for semantic understanding (92% F1 score)',
      '• LangChain chatbot integration',
      '• Real-time skill extraction and analysis',
      '• Automated job matching algorithm',
      '',
      'Tech Stack: Django, Next.js, TensorFlow, PostgreSQL, LangChain'
    ],
    acrevault: () => [
      asciiArt.acrevault,
      'ACREVAULT - Blockchain Land Registry System',
      '',
      'Description:',
      'Decentralized land registry platform using Ethereum smart contracts',
      'with integrated GIS mapping and ML-powered fraud detection.',
      '',
      'Key Features:',
      '• Ethereum smart contracts for immutable records',
      '• GIS mapping integration for property visualization',
      '• Machine learning fraud detection (92% precision)',
      '• Multi-signature verification system',
      '• Transparent transaction history',
      '',
      'Tech Stack: Solidity, React, Web3.js, GIS APIs, Python ML'
    ],
    wastefood: () => [
      asciiArt.wastefood,
      'WASTE FOOD MANAGEMENT - Hackathon Winner 🏆',
      '',
      'Description:',
      'Award-winning solution for surplus food distribution with predictive',
      'analytics and blockchain logging. Winner of VES-HACK-IT competition.',
      '',
      'Key Achievements:',
      '• 500+ successful food donations matched',
      '• 65% repeat user engagement rate',
      '• Real-time demand forecasting',
      '• Ethereum-based transaction logging',
      '• Comprehensive Power BI dashboards',
      '',
      'Tech Stack: React, Node.js, Ethereum, TensorFlow, Power BI, MongoDB'
    ]
  };

  const executeCommand = (cmd: string) => {
  const trimmedCmd = cmd.trim().toLowerCase();
  const [command, ...args] = trimmedCmd.split(' ');

  let output: string[] = [];

  if (command === 'cat' && args.length > 0) {
    const project = args[0];
    if (projectCommands[project as keyof typeof projectCommands]) {
      output = projectCommands[project as keyof typeof projectCommands]();
    } else {
      output = [`cat: ${project}: No such file or directory`];
    }
  } else if (commands[command as keyof typeof commands]) {
    const result = commands[command as keyof typeof commands]();
    if (result === 'CLEAR') {
      setHistory([]);
      return;
    } else if (result === 'EXIT') {
      onClose();
      return;
    } else {
      output = Array.isArray(result) ? result : [result];
    }
  } else if (command === 'airhockey') {
    setHistory(prev => [...prev, `${currentPath} $ ${cmd}`]);
    setShowHockey(true);
    return;
  } else if (command === '') {
    output = [];
  } else {
    output = [`bash: ${command}: command not found`];
  }

  setHistory(prev => [...prev, `${currentPath} $ ${cmd}`, ...output]);
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
      // Welcome message
      setHistory([
        asciiArt.logo,
        'Welcome to Rushist\'s Portfolio Terminal v2.0.1',
        'Type "help" for available commands.',
        ''
      ]);
    }
  }, [isActive]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black font-mono text-green-400 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-2 bg-gray-900 border-b border-green-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-sm">Terminal - Rushabh's Portfolio</span>
          </div>
         
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="h-full overflow-y-auto p-4 pb-20"
          style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
        >
          {history.map((line, index) => (
            <motion.div
              key={index}
              className="whitespace-pre-wrap text-sm leading-relaxed"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1, delay: index * 0.02 }}
            >
              {line}
            </motion.div>
          ))}
          {showHockey && (
  <AirHockeySimulation
    onFrame={(lines) => setHistory(prev => [...prev, ...lines])}
    onComplete={() => setShowHockey(false)}
  />
)}

          {/* Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="text-green-400 mr-2">{currentPath} $</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-green-400 outline-none caret-green-400"
              autoComplete="off"
              spellCheck={false}
            />
            <motion.span
              className="w-2 h-4 bg-green-400 ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </form>
        </div>

        {/* Scanlines Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent animate-pulse"></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent w-full h-1"
            animate={{ y: [0, window.innerHeight] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TerminalInterface;