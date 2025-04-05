import { Outlet, useNavigation, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import Sidebar from "./components/Sidebar";
import { useKeyboardNav } from "./utils/useKeyboardNav";
import ChatWidget from "./components/ChatWidget";
import "./App.css";

function App() {
  const navigation = useNavigation();
  const location = useLocation();
  const isLoading = navigation.state === "loading";
  const showSidebar =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup";

  // Enable keyboard navigations
  useKeyboardNav();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-20 focus:right-4 focus:bg-emerald-500 focus:text-white focus:px-6 focus:py-2 focus:rounded-lg focus:shadow-lg focus:z-[100] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
      >
        Skip to main content
      </a>

      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      <div className="flex-grow flex flex-col mt-16">
        <div className="flex flex-grow">
          {showSidebar && <Sidebar />}
          <main
            id="main-content"
            className={`flex-grow px-4 py-8 ${showSidebar ? "lg:pl-72" : ""}`}
            role="main"
            aria-live="polite"
          >
            <div className="container mx-auto">
              {isLoading ? (
                <div role="status" aria-label="Loading content">
                  <LoadingSpinner />
                </div>
              ) : (
                <Outlet />
              )}
            </div>
          </main>
        </div>
        <ChatWidget />
        <div className={`${showSidebar ? "lg:ml-72" : ""}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
