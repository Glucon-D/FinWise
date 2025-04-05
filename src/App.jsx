import { Outlet, useNavigation, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import Sidebar from './components/Sidebar'
import { useKeyboardNav } from './utils/useKeyboardNav'
import './App.css'

function App() {
  const navigation = useNavigation()
  const location = useLocation()
  const isLoading = navigation.state === "loading"
  const showSidebar = location.pathname !== '/' && 
                     location.pathname !== '/login' && 
                     location.pathname !== '/signup'

  // Enable keyboard navigations
  useKeyboardNav()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-500 text-white px-4 py-2 rounded-lg z-[60]">
        Skip to main content
      </a>
      
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      <div className="flex-grow flex mt-16 mb-16">
        {showSidebar && <Sidebar />}
        <main 
          id="main-content" 
          className={`flex-grow px-4 py-8 overflow-y-auto ${showSidebar ? 'lg:pl-72' : ''}`}
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

      <div className="fixed bottom-0 w-full z-50 bg-white">
        <Footer />
      </div>
    </div>
  )
}

export default App
