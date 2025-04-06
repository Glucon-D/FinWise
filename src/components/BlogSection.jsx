import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiBookmark,
  FiBookOpen,
  FiInfo,
  FiLoader,
  FiX,
  FiMessageSquare,
} from "react-icons/fi";
import { explainLike18 } from "../services/gemini";
// If exported like: export const financeBlogs = [...]
import { financeBlogs } from "../data/financeBlogs";
import { useChatbot } from "../context/ChatBotContext";

export default function BlogsSection() {
  const [search, setSearch] = useState("");
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [explainedTerm, setExplainedTerm] = useState("");
  const [explanation, setExplanation] = useState("");
  const [explainLoading, setExplainLoading] = useState(false);
  const { openWithMessage } = useChatbot();

  const toggleSave = (id) => {
    setSavedBlogs((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleExplain = async (blog) => {
    setExplainedTerm(blog.title);
    setExplainLoading(true);
    setExplanation(""); // Reset before fetching

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
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Finance Blogs for Beginners
      </motion.h2>

      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by tag... (e.g. #SIP)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
        />
      </div>

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
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 mt-auto pt-4 border-t border-gray-100">
              {/* <button
                onClick={() => toggleSave(blog.id)}
                className={`flex items-center gap-1 text-sm ${
                  savedBlogs.includes(blog.id)
                    ? "text-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FiBookmark />
                {savedBlogs.includes(blog.id) ? "Saved" : "Save for Later"}
              </button> */}

              <button
                onClick={() => handleExplain(blog)} // ← Add this!
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-600"
              >
                🧠 Brain
              </button>

              <button
                onClick={() =>
                  openWithMessage(
                    `Hi FunBot, I was reading "${blog.title}" and here's the summary:\n"${blog.summary}". Can you explain it further?`
                  )
                }
                className="text-xs text-white bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-lg"
              >
                🤖 Ask FunBot
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No blogs match that tag.
        </p>
      )}

      {/* Explanation Modal */}
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
