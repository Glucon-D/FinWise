import { createElement } from "react";
import { Link } from "react-router-dom";
import {
  FiTrendingUp,
  FiShield,
  FiTarget,
  FiChevronDown,
  FiUsers,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiDollarSign,
  FiPieChart,
  FiActivity,
  FiBarChart,
  FiCreditCard,
  FiDatabase,
} from "react-icons/fi";
import { motion, useAnimation, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // New state for testimonials
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialsRef = useRef(null);
  const isInView = useInView(testimonialsRef);
  const controls = useAnimation();

  const testimonials = [
    {
      name: "Rohan Mehta",
      role: "Startup Founder",
      image:
        "https://thumbs.dreamstime.com/b/young-man-as-successful-business-startup-founder-young-man-as-successful-business-startup-founder-tablet-computer-262346042.jpg",
      text: "FinWise helped me plan my investments smartly while growing my startup. The AI suggestions are truly tailored!",
    },
    {
      name: "Priya Sharma",
      role: "Marketing Executive",
      image:
        "https://th.bing.com/th/id/OIP.QiBuq5R5Av4Vfqsgnqb8VwHaE7?rs=1&pid=ImgDetMain",
      text: "I never thought investing could be this simple. FinWise made me feel confident with every decision.",
    },
    {
      name: "Amit Verma",
      role: "Government Employee",
      image:
        "https://th.bing.com/th/id/OIP.vAdlzJYyaCSM2-JKAKJzyQHaFk?rs=1&pid=ImgDetMain",
      text: "The SIP and tax-saving calculators are so helpful! FinWise has become my go-to financial buddy.",
    },
    {
      name: "Sneha Iyer",
      role: "Freelance Writer",
      image:
        "https://th.bing.com/th/id/OIP.pBO_Wqoo4OCEzNoGz1Vm8gHaJQ?rs=1&pid=ImgDetMain",
      text: "As someone new to investing, I love how FinWise explains everything in simple terms.",
    },
    {
      name: "Raj Patel",
      role: "College Student",
      image:
        "https://th.bing.com/th/id/OIP.-Q8fExVwb_wkNxNxegrd3gHaLG?rs=1&pid=ImgDetMain",
      text: "The portfolio simulator taught me how to balance returns and risks before even investing real money!",
    },
    {
      name: "Neha Gupta",
      role: "Homemaker",
      image:
        "https://th.bing.com/th/id/OIP.r41gh6UpPW122JIdiA88VQHaLL?rs=1&pid=ImgDetMain",
      text: "Thanks to FinWise, I’ve started planning for my children’s future with more clarity and confidence.",
    },
  ];

  // Enhanced hero section with floating elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };
  
  // Handle automatic testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Add this meta viewport effect to ensure proper mobile scaling
  useEffect(() => {
    // Ensure the viewport is properly set for mobile devices
    const viewport = document.querySelector('meta[name=viewport]');
    if (viewport) {
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0';
    }
  }, []);

  // New floating icons animation
  const floatingIconsAnimation = (delay) => ({
    y: [0, -15, 0],
    x: [0, 5, 0],
    rotate: [0, 10, 0],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: Math.random() * 3 + 5, // Random duration between 5-8s
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    },
  });

  // Background decoration icons
  const backgroundIcons = [
    { icon: FiDollarSign, size: "2.5rem", top: "15%", left: "10%", delay: 0 },
    { icon: FiPieChart, size: "2rem", top: "40%", left: "5%", delay: 1.2 },
    { icon: FiBarChart, size: "2.2rem", top: "70%", left: "8%", delay: 2.5 },
    { icon: FiActivity, size: "2.8rem", top: "20%", right: "7%", delay: 0.7 },
    { icon: FiDatabase, size: "1.8rem", top: "60%", right: "6%", delay: 1.8 },
    { icon: FiCreditCard, size: "2.4rem", top: "85%", right: "12%", delay: 3 },
  ];

  return (
    <div className="w-full max-w-none sm:max-w-none md:max-w-6xl mx-auto px-3 sm:px-6 relative overflow-hidden">
      {/* Background floating icons */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 to-white/90 backdrop-blur-3xl"></div>
        {backgroundIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-emerald-200"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              width: item.size,
              height: item.size,
            }}
            animate={floatingIconsAnimation(item.delay)}
          >
            {createElement(item.icon, {
              style: { width: "100%", height: "100%" },
            })}
          </motion.div>
        ))}
      </div>

      {/* Enhanced Hero Section with better mobile responsiveness */}
      <div className="relative mt-2 sm:mt-6">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-transparent to-teal-50 rounded-xl sm:rounded-3xl" />
        {/* Hero decorative elements */}
        <motion.div
          className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-emerald-300/20 to-teal-300/40 rounded-full blur-md"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-tr from-teal-200/20 to-emerald-200/40 rounded-full blur-md"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1 
          }}
        />
        
        <motion.div
          className="text-center py-10 sm:py-16 md:py-24 relative"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Add decorative elements positioned for mobile visibility */}
          <motion.div
            className="absolute top-0 right-0 w-20 sm:w-36 h-20 sm:h-36 bg-emerald-100 rounded-full blur-xl sm:blur-3xl opacity-60"
            animate={floatingAnimation}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-16 sm:w-28 h-16 sm:h-28 bg-teal-100 rounded-full blur-md sm:blur-2xl opacity-60"
            animate={floatingAnimation}
          />

          {/* Hero content with improved typography and scaling */}
          <motion.h1
            className="font-bold text-gray-800 mb-3 sm:mb-7 px-4"
            variants={fadeInUp}
            style={{ 
              fontSize: "min(max(2rem, 7vw), 4.5rem)",
              lineHeight: 1.1 
            }}
          >
            Smart Investing,{" "}
            <span className="text-emerald-500">Made Simple</span>
          </motion.h1>
          <motion.p
            className="text-gray-600 mb-6 sm:mb-10 max-w-4xl mx-auto px-4"
            variants={fadeInUp}
            style={{ 
              fontSize: "min(max(1.125rem, 4vw), 1.875rem)",
              lineHeight: 1.3
            }}
          >
            Get personalized investment recommendations powered by AI. Start
            your journey to financial freedom today.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              to="/signup"
              className="inline-block font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              style={{
                padding: "min(max(0.75rem, 3vw), 1.25rem) min(max(1.5rem, 4vw), 2.5rem)",
                fontSize: "min(max(1rem, 3vw), 1.25rem)"
              }}
            >
              Get Started - It's Free
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Statistics Section - Improved scaling */}
      <motion.div
        className="grid grid-cols-2 gap-2 sm:gap-6 py-6 sm:py-14 px-4 sm:px-8 bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg relative z-10 mx-2 sm:mx-0"
        style={{ marginTop: "min(max(-1rem, -4vw), -2rem)" }}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        {[
          { label: "Active Users", value: "25K+", icon: FiUsers },
          { label: "Assets Managed", value: "$320M+", icon: FiBarChart2 },
          { label: "Success Rate", value: "94%", icon: FiTarget },
          { label: "Client Satisfaction", value: "4.9/5", icon: FiShield },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="text-center p-2 sm:p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="mx-auto mb-2 sm:mb-4 rounded-full bg-emerald-100 flex items-center justify-center"
                 style={{ 
                   width: "min(max(3.5rem, 10vw), 4rem)",
                   height: "min(max(3.5rem, 10vw), 4rem)"
                 }}>
              {createElement(stat.icon, {
                style: { 
                  width: "min(max(1.75rem, 5vw), 2rem)",
                  height: "min(max(1.75rem, 5vw), 2rem)"
                },
                className: "text-emerald-500",
              })}
            </div>
            <h3 className="font-bold text-gray-800" style={{ fontSize: "min(max(1.25rem, 5vw), 1.875rem)" }}>{stat.value}</h3>
            <p className="text-gray-600" style={{ fontSize: "min(max(0.75rem, 3vw), 1rem)" }}>{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Grid - Larger and better scaled */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 py-10 sm:py-20 mt-6 sm:mt-8 px-2 sm:px-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {[
          {
            icon: FiTarget,
            title: "Personalized Strategy",
            description: "Get investment recommendations tailored to your goals, risk tolerance, and timeline."
          },
          {
            icon: FiShield,
            title: "Risk Management",
            description: "Understand and manage your investment risks with our smart risk assessment system."
          },
          {
            icon: FiTrendingUp,
            title: "Growth Focused",
            description: "Access curated investment funds designed to help you achieve your financial goals."
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="text-center p-5 sm:p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-all"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-5 rounded-full bg-emerald-100 flex items-center justify-center"
                 style={{ 
                   width: "min(max(4rem, 12vw), 5rem)",
                   height: "min(max(4rem, 12vw), 5rem)"
                 }}>
              {createElement(feature.icon, { 
                className: "text-emerald-500",
                style: { 
                  width: "min(max(2rem, 6vw), 2.5rem)",
                  height: "min(max(2rem, 6vw), 2.5rem)"
                }
              })}
            </div>
            <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3"
                style={{ fontSize: "min(max(1.25rem, 4vw), 1.5rem)" }}>
              {feature.title}
            </h3>
            <p className="text-sm sm:text-lg text-gray-600"
               style={{ fontSize: "min(max(0.875rem, 3vw), 1.125rem)" }}>
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced CTA Section - Better scaling */}
      <motion.div
        className="py-10 sm:py-20 my-6 sm:my-12 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl shadow-inner px-4 sm:px-10 mx-2 sm:mx-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10">
          <div className="w-full md:w-3/5">
            <motion.h2
              className="font-bold text-center md:text-left text-gray-800 mb-3 sm:mb-6"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: "min(max(1.5rem, 5vw), 2.5rem)" }}
            >
              Take Control of Your Financial Future Today
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-6 sm:mb-10 text-center md:text-left"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              style={{ fontSize: "min(max(1rem, 3vw), 1.5rem)" }}
            >
              Join over 25,000 smart investors who have trusted FinWise to help
              build their wealth. Our AI-powered platform provides personalized
              guidance every step of the way.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3 sm:gap-5 justify-center md:justify-start"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/signup"
                className="text-white font-medium bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                style={{
                  padding: "min(max(0.75rem, 2vw), 1rem) min(max(1.5rem, 3vw), 2.5rem)",
                  fontSize: "min(max(1rem, 3vw), 1.125rem)"
                }}
              >
                Start Investing Now
              </Link>
              <Link
                to="/demo"
                className="font-medium bg-white text-emerald-500 border-2 border-emerald-500 rounded-lg hover:bg-emerald-50 transition-all shadow-sm"
                style={{
                  padding: "min(max(0.75rem, 2vw), 1rem) min(max(1.5rem, 3vw), 2.5rem)",
                  fontSize: "min(max(1rem, 3vw), 1.125rem)"
                }}
              >
                See How It Works
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="w-4/5 md:w-2/5 flex justify-center mx-auto md:mx-0 mt-6 md:mt-0"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <div className="relative">
              <div className="absolute -inset-6 bg-emerald-200 rounded-full opacity-30 blur-xl"></div>
              <div className="bg-white p-5 sm:p-8 rounded-xl shadow-lg relative">
                <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FiUsers className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base sm:text-xl font-semibold">25,000+</h4>
                    <p className="text-sm sm:text-base text-gray-500">Active Investors</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FiBarChart2 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base sm:text-xl font-semibold">$320M+</h4>
                    <p className="text-sm sm:text-base text-gray-500">Assets Managed</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Testimonials Section with background pattern */}
      <motion.div
        ref={testimonialsRef}
        className="py-10 sm:py-20 my-8 sm:my-16 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl sm:rounded-3xl relative overflow-hidden mx-2 sm:mx-0"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Add animated background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-emerald-200/30 rounded-full blur-xl"
              style={{
                width: `${Math.random() * 10 + 8}rem`,
                height: `${Math.random() * 10 + 8}rem`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: Math.random() * 5 + 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="relative">
          <motion.h2
            className="font-bold text-center text-gray-800 mb-8 sm:mb-14 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontSize: "min(max(1.5rem, 5vw), 2.5rem)" }}
          >
            What Our Users Say
          </motion.h2>

          <div className="relative w-full max-w-xs sm:max-w-xl md:max-w-4xl mx-auto px-2 sm:px-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <button 
                onClick={() => setCurrentTestimonial(prev => (prev > 0 ? prev - 1 : testimonials.length - 1))}
                className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
              >
                <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
              </button>
              <button 
                onClick={() => setCurrentTestimonial(prev => (prev < testimonials.length - 1 ? prev + 1 : 0))}
                className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
              >
                <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
              </button>
            </div>
            
            <motion.div
              className="flex items-center"
              animate={{ x: `-${currentTestimonial * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-1 sm:px-4">
                  <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg">
                    <div className="flex items-center gap-3 sm:gap-5 mb-3 sm:mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 sm:w-16 h-12 sm:h-16 aspect-square rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-base sm:text-xl font-semibold text-gray-800">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs sm:text-base text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm sm:text-lg text-gray-700 italic">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-colors ${
                    currentTestimonial === index
                      ? "bg-emerald-500"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section - Better scaling */}
      <motion.div
        className="py-10 sm:py-20 px-2 sm:px-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="font-bold text-center text-gray-800 mb-8 sm:mb-14 px-2"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontSize: "min(max(1.5rem, 5vw), 2.5rem)" }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-3 sm:space-y-5 max-w-xl md:max-w-4xl mx-auto px-2 sm:px-0">
          {[
            {
              question: "What is FunWise?",
              answer:
                "FunWise is a smart, AI-powered platform that helps you choose the right investment options based on your age, goals, capital, and risk profile — all in a beginner-friendly and educational way."
            },
            {
              question: "Is this a real investment platform?",
              answer:
                "No. FunWise is not a broker or a financial transaction platform. It's an educational and guidance tool that helps you understand what kind of investments may suit you."
            },
            {
              question: "Do I need any financial knowledge to use FunWise?",
              answer:
                "Not at all! FunWise is designed for complete beginners. It explains everything in simple terms, and even has a mode called \"Explain Like I'm 18\" for ultra-clear explanations."
            },
            {
              question: "How does FunWise give suggestions?",
              answer:
                "FunWise uses AI (Gemini) to understand your profile (like age, goal, capital, etc.) and gives you personalized investment suggestions like SIPs, mutual funds, or gold — based on your risk category."
            },
            {
              question: "Is my data safe?",
              answer:
                "Yes. We only collect basic profile info like age, capital, and goals. We don't store any sensitive or financial data, and everything stays private and secure."
            },
            {
              question: "Do I need to pay to use FunWise?",
              answer:
                "Nope! FunWise MVP is completely free to use. It's designed for learning and exploring how to invest smartly."
            },
            {
              question: "Does FunWise tell me exactly where to invest?",
              answer:
                "FunWise gives AI-based suggestions, not fixed advice. You still make your own decisions — we just help you understand your options better."
            },
            {
              question: "What's coming next on FunWise?",
              answer: 
                "In future updates, we'll add: \
                \n• A smart portfolio simulator \
                \n• AI-powered financial chatbot \
                \n• Easy-to-read blogs \
                \n• Goal tracking and more!"
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className="flex justify-between items-center w-full p-4 sm:p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-800 text-sm sm:text-lg" style={{ fontSize: "min(max(0.875rem, 3vw), 1.125rem)" }}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 flex-shrink-0" />
                </motion.div>
              </button>
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{
                  height: activeIndex === index ? "auto" : 0,
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
                  <p className="text-sm sm:text-lg text-gray-600" style={{ fontSize: "min(max(0.875rem, 2.5vw), 1.125rem)", whiteSpace: "pre-line" }}>
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Final CTA Section - Improved sizing */}
      <motion.div
        className="text-center py-10 sm:py-20 my-8 sm:my-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-3xl text-white relative overflow-hidden mx-2 sm:mx-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-pattern opacity-10" />
        
        {/* Add animated dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 3 + 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="relative px-4 sm:px-6">
          <motion.h2
            className="font-bold mb-3 sm:mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontSize: "min(max(1.5rem, 5vw), 2.5rem)" }}
          >
            Start Your Investment Journey Today
          </motion.h2>
          <motion.p
            className="opacity-90 mb-6 sm:mb-10 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: "min(max(1rem, 3vw), 1.5rem)" }}
          >
            Join thousands of smart investors and take control of your financial
            future.
          </motion.p>
          <motion.div
            className="flex justify-center gap-3 sm:gap-6 flex-wrap"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/signup"
              className="font-medium bg-white text-emerald-500 rounded-lg hover:bg-gray-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
              style={{
                padding: "min(max(0.75rem, 2vw), 1.25rem) min(max(1.5rem, 3vw), 2.5rem)",
                fontSize: "min(max(1rem, 3vw), 1.125rem)"
              }}
            >
              Create Free Account
            </Link>
            <Link
              to="/demo"
              className="font-medium bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all"
              style={{
                padding: "min(max(0.75rem, 2vw), 1.25rem) min(max(1.5rem, 3vw), 2.5rem)",
                fontSize: "min(max(1rem, 3vw), 1.125rem)"
              }}
            >
              Watch Demo
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
