import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Code, Download, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const contactMethods = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'nig.developer@email.com',
      href: 'mailto:nig.developer@email.com',
      gradient: 'from-electric to-cyan-400'
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      gradient: 'from-neon to-green-400'
    },
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/nig-dev',
      href: 'https://linkedin.com/in/nig-dev',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      icon: <Code size={24} />,
      label: 'LeetCode',
      value: 'leetcode.com/nig-dev',
      href: 'https://leetcode.com/nig-dev',
      gradient: 'from-orange-400 to-orange-600'
    }
  ];

  const socialLinks = [
    {
      icon: <Download size={20} />,
      label: 'Download Resume',
      href: '#',
      gradient: 'from-purple-neon to-pink-400'
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location: San Francisco, CA',
      href: '#',
      gradient: 'from-gray-400 to-gray-600',
      disabled: true
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;

    if (!section || !title || !content) return;

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

    // Content animation
    gsap.fromTo(content.children,
      { opacity: 0, y: 50, rotationX: -15 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: content,
          start: 'top 85%',
        }
      }
    );
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold font-mono text-center mb-8 bg-gradient-to-r from-electric via-neon to-purple-neon bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Let's Connect
        </motion.h2>

        <motion.p
          className="text-lg text-gray-400 text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to bring your next project to life? Let's discuss how we can work together 
          to create something amazing with cutting-edge technology.
        </motion.p>

        <div ref={contentRef} className="space-y-8">
          {/* Contact Methods Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-electric/50 transition-all duration-500 block"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                
                <div className="relative z-10 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center text-gray-900 group-hover:scale-110 transition-transform duration-300`}>
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{method.label}</h3>
                    <p className="text-gray-400 font-mono text-sm group-hover:text-gray-300 transition-colors">
                      {method.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Additional Actions */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group px-6 py-3 rounded-xl border transition-all duration-300 flex items-center gap-3 font-mono ${
                  link.disabled 
                    ? 'border-gray-600 text-gray-500 cursor-default' 
                    : 'border-electric/30 text-electric hover:bg-electric/10 hover:border-electric/50'
                }`}
                whileHover={link.disabled ? {} : { scale: 1.05 }}
                whileTap={link.disabled ? {} : { scale: 0.95 }}
              >
                <div className={`${link.disabled ? 'text-gray-500' : 'text-electric'}`}>
                  {link.icon}
                </div>
                <span className="text-sm">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16 p-8 bg-gradient-to-r from-electric/10 via-neon/10 to-purple-neon/10 rounded-2xl border border-electric/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold font-mono text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Whether it's a web application, mobile app, or blockchain solution, 
              I'm here to help bring your vision to reality.
            </p>
            <motion.a
              href="mailto:nig.developer@email.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-electric to-neon text-gray-900 font-mono font-semibold rounded-lg hover:shadow-lg hover:shadow-electric/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;