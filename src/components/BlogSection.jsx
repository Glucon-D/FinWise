import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBookmark,
  FiSearch,
  FiInfo,
  FiLoader,
  FiX,
  FiClock,
  FiTrendingUp,
  FiFilter,
} from "react-icons/fi";
import { explainLike18 } from "../services/gemini";
import { financeBlogs } from "../data/financeBlogs";
import { useChatbot } from "../context/ChatBotContext";

export default function BlogsSection() {
  const [search, setSearch] = useState("");
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [explainedTerm, setExplainedTerm] = useState("");
  const [explanation, setExplanation] = useState("");
  const [explainLoading, setExplainLoading] = useState(false);
  const { openWithMessage } = useChatbot();
  const [selectedTag, setSelectedTag] = useState("");
  const [featuredBlog, setFeaturedBlog] = useState(null);

  useEffect(() => {
    const featured = financeBlogs.reduce((prev, current) =>
      (current.engagement || 0) > (prev?.engagement || 0) ? current : prev
    );
    setFeaturedBlog(featured);
  }, []);

  const allTags = [...new Set(financeBlogs.flatMap((blog) => blog.tags))];

  const toggleSave = (id) => {
    setSavedBlogs((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleExplain = async (blog) => {
    setExplainedTerm(blog.title);
    setExplainLoading(true);
    setExplanation("");

    try {
      const result = await explainLike18(blog.title);
      setExplanation(
        result.success
          ? result.explanation
          : `Sorry, I couldn't explain "${blog.title}" right now.`
      );
    } catch (error) {
      console.error("Explanation error:", error);
      setExplanation(`Sorry, I couldn't explain "${blog.title}" right now.`);
    } finally {
      setExplainLoading(false);
    }
  };

  const filteredBlogs = financeBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Financial Knowledge Hub
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Expand your financial literacy with our curated collection of expert
          insights and beginner-friendly guides.
        </p>
      </motion.div>

      {featuredBlog && (
        <motion.div
          className="mb-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8 sm:p-10 backdrop-blur-sm bg-black/10">
            <div className="flex items-center gap-2 mb-4 text-emerald-100">
              <FiTrendingUp />
              <span className="text-sm font-medium">Featured Article</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              {featuredBlog.title}
            </h3>
            <p className="text-emerald-50 mb-6 max-w-3xl">
              {featuredBlog.summary}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-emerald-100">
                <FiClock />
                <span>{featuredBlog.readingTime || "5 min read"}</span>
              </div>
              <button
                onClick={() => handleExplain(featuredBlog)}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🧠 Explain This Topic
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search articles by topic..." // Updated placeholder
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
        />
      </div>

      <AnimatePresence mode="popLayout">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredBlogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4">{blog.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                    >
                      {tag.replace(/^#/, '')} {/* Remove hash from tags */}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mt-auto pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleExplain(blog)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-600"
                >
                  🧠 Brain
                </button>

                <button
                  onClick={() =>
                    openWithMessage(
                      `Hi FinWise, I was reading "${blog.title}" and here's the summary:\n"${blog.summary}". Can you explain it further?`
                    )
                  }
                  className="text-xs text-white bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-lg"
                >
                  🤖 Ask FinWise AI
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {filteredBlogs.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No blogs match that tag.</p>
      )}

      {explainedTerm && (
        <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => {
                setExplainedTerm("");
                setExplanation("");
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                <FiInfo className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">
                Understanding: {explainedTerm}
              </h3>
            </div>
            {explainLoading ? (
              <div className="text-center py-6">
                <FiLoader className="w-6 h-6 text-emerald-500 mx-auto mb-2 animate-spin" />
                <p className="text-gray-500">Getting explanation...</p>
              </div>
            ) : (
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {explanation}
              </div>
            )}
            <div className="mt-6 text-right">
              <button
                onClick={() => {
                  setExplainedTerm("");
                  setExplanation("");
                }}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
