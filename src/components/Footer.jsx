import { Link } from 'react-router-dom'
import { FiMail, FiGithub } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm font-semibold text-gray-800">
              FinWise
            </Link>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              © {new Date().getFullYear()}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="mailto:support@finwise.com" 
               className="text-gray-600 hover:text-emerald-500 transition-colors">
              <FiMail className="w-4 h-4" />
            </a>
            <a href="https://github.com/yourusername/finwise" 
               className="text-gray-600 hover:text-emerald-500 transition-colors">
              <FiGithub className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}