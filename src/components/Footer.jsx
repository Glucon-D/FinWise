import { FaGithub } from "react-icons/fa";
import { MdMail, MdBugReport} from "react-icons/md";


function Footer() {
  return (
    <footer className="bg-white p-1 md:p-2">
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center bg-blur-3xl backdrop-blur-3xl rounded-lg px-2 md:px-4 py-2">
        <a 
          href="https://github.com/Glucon-D/FinWise" 
          className=" transition-transform duration-200"
        >
          <span className=" text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            FinWise
            <p className="text-xs md:text-sm font-light text-gray-600">Made with ❤️ by Team Glucon D</p>
          </span>
        </a>
        <div className="flex items-center space-x-4 md:space-x-6"> 
        <div className="relative group">
            <a href="https://github.com/Glucon-D/FinWise" className="text-gray-600 hover:text-emerald-500 transition-colors">
              <FaGithub className="w-6 h-6" />
            </a>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-sm whitespace-nowrap">
              Github
            </span>
          </div>
          <div className="relative group">
            <a 
              href="mailto:connect@ayush-sharma.in"  // Changed from href="connect@ayush-sharma.in"
              className="text-gray-600 hover:text-emerald-500 transition-colors"
            >
              <MdMail className="w-6 h-6" />
            </a>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-sm whitespace-nowrap">
              Mail
            </span>
          </div>
          <div className="relative group">
            <button className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full hover:bg-emerald-100 hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-2">
              <MdBugReport className="w-5 h-5" />
              <span className="text-sm">Report Bug</span>
            </button>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;