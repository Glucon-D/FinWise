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

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Enhanced Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-transparent to-teal-50 rounded-3xl" />
        <motion.div
          className="text-center py-16 md:py-24 relative"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Add decorative elements */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-60"
            animate={floatingAnimation}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-24 h-24 bg-teal-100 rounded-full blur-2xl opacity-60"
            animate={floatingAnimation}
          />

          {/* Existing hero content with enhanced styling */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
            variants={fadeInUp}
          >
            Smart Investing,{" "}
            <span className="text-emerald-500">Made Simple</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Get personalized investment recommendations powered by AI. Start
            your journey to financial freedom today.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              to="/signup"
              className="inline-block px-8 py-4 text-lg font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started - It's Free
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* New Statistics Section */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 px-6 bg-white rounded-2xl shadow-lg -mt-8 relative z-10"
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
            className="text-center p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
              {createElement(stat.icon, {
                className: "w-6 h-6 text-emerald-500",
              })}
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Grid with Animation */}
      <motion.div
        className="grid md:grid-cols-3 gap-8 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div
          className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all"
          variants={fadeInUp}
          whileHover={{ scale: 1.03 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
            <FiTarget className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Personalized Strategy
          </h3>
          <p className="text-gray-600">
            Get investment recommendations tailored to your goals, risk
            tolerance, and timeline.
          </p>
        </motion.div>

        <motion.div
          className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all"
          variants={fadeInUp}
          whileHover={{ scale: 1.03 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
            <FiShield className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Risk Management
          </h3>
          <p className="text-gray-600">
            Understand and manage your investment risks with our smart risk
            assessment system.
          </p>
        </motion.div>

        <motion.div
          className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all"
          variants={fadeInUp}
          whileHover={{ scale: 1.03 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
            <FiTrendingUp className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Growth Focused
          </h3>
          <p className="text-gray-600">
            Access curated investment funds designed to help you achieve your
            financial goals.
          </p>
        </motion.div>
      </motion.div>

      {/* Enhanced CTA Section with Animation */}
      <motion.div
        className="py-16 my-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl shadow-inner px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-3/5">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Take Control of Your Financial Future Today
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Join over 25,000 smart investors who have trusted FinWise to help
              build their wealth. Our AI-powered platform provides personalized
              guidance every step of the way.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/signup"
                className="px-8 py-3 text-white font-medium bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Start Investing Now
              </Link>
              <Link
                to="/demo"
                className="px-8 py-3 bg-white text-emerald-500 font-medium border-2 border-emerald-500 rounded-lg hover:bg-emerald-50 transition-all shadow-sm"
              >
                See How It Works
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="md:w-2/5 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-200 rounded-full opacity-30 blur-xl"></div>
              <div className="bg-white p-6 rounded-xl shadow-lg relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FiUsers className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold">25,000+</h4>
                    <p className="text-sm text-gray-500">Active Investors</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FiBarChart2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold">$320M+</h4>
                    <p className="text-sm text-gray-500">Assets Managed</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* New Testimonials Section */}
      <motion.div
        ref={testimonialsRef}
        className="py-16 my-12 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            What Our Users Say
          </motion.h2>

          <div className="relative max-w-3xl mx-auto px-8">
            <motion.div
              className="flex items-center"
              animate={{ x: `-${currentTestimonial * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 aspect-square rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
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

      {/* FAQ Section */}
      <motion.div
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              question: "How does FinWise generate investment recommendations?",
              answer:
                "FinWise uses a combination of AI and machine learning algorithms to analyze market data, your financial goals, and risk tolerance to provide personalized investment recommendations tailored to your specific situation.",
            },
            {
              question: "Is FinWise suitable for beginners?",
              answer:
                "Absolutely! FinWise is designed to be accessible to investors of all experience levels. Our platform provides educational resources and simplified explanations to help beginners make informed investment decisions.",
            },
            {
              question: "What fees does FinWise charge?",
              answer:
                "FinWise offers a transparent fee structure with a free tier for basic services and premium tiers starting at just $9.99/month for advanced features. There are no hidden fees or commissions on your investments.",
            },
            {
              question: "How secure is my financial data with FinWise?",
              answer:
                "Security is our top priority. We employ bank-level encryption and security measures to protect your data. FinWise uses read-only connections to your accounts and never stores your bank credentials.",
            },
            {
              question: "Can I withdraw my money anytime?",
              answer:
                "Yes, you maintain complete control over your investments. You can withdraw your money at any time without penalty from FinWise, though some investment vehicles may have their own restrictions or fees.",
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
                className="flex justify-between items-center w-full p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="w-5 h-5 text-emerald-500" />
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
                <div className="p-5 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Final CTA Section */}
      <motion.div
        className="text-center py-16 my-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="relative">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Start Your Investment Journey Today
          </motion.h2>
          <motion.p
            className="text-xl opacity-90 mb-8 max-w-xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of smart investors and take control of your financial
            future.
          </motion.p>
          <motion.div
            className="flex justify-center gap-4 flex-wrap"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/signup"
              className="px-8 py-3 bg-white text-emerald-500 rounded-lg hover:bg-gray-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Create Free Account
            </Link>
            <Link
              to="/demo"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all"
            >
              Watch Demo
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
