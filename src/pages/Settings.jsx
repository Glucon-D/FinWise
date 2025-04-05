import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../context/ProfileContext'
import { FiLogOut, FiShield, FiInfo, FiBell, FiUser } from 'react-icons/fi'
import Toast from '../components/Toast'

export default function Settings() {
  const { logout } = useAuth()
  const { profile } = useProfile()
  const navigate = useNavigate()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const [notifications, setNotifications] = useState({
    portfolio: true,
    market: false,
    news: true
  })

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handlePrivacyClick = () => {
    setToastMessage('Privacy policy would open in a real application')
    setShowToast(true)
  }

  const settingsSections = [
    {
      id: 'profile',
      title: 'Investment Profile',
      icon: <FiUser className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Risk Profile</p>
              <p className="text-lg font-semibold text-emerald-600">
                {profile?.riskType?.charAt(0).toUpperCase() + profile?.riskType?.slice(1) || 'Not Set'}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Investment Period</p>
              <p className="text-lg font-semibold text-blue-600">
                {profile?.investmentPeriod || '0'} Years
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/profile-form')}
            className="w-full px-4 py-2 text-emerald-500 border border-emerald-500 rounded-lg hover:bg-emerald-50"
          >
            Update Profile
          </button>
        </div>
      )
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <FiBell className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, enabled]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div>
                  <p className="text-gray-900 font-medium capitalize">{key} Updates</p>
                  <p className="text-sm text-gray-500">
                    Receive updates about your {key} activities
                  </p>
                </div>
              </label>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  enabled ? 'bg-emerald-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      )
    }
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-emerald-50">Manage your preferences and account details</p>
      </div>

      <div className="space-y-6">
        {settingsSections.map(section => (
          <div key={section.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-emerald-500">{section.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
            </div>
            {section.content}
          </div>
        ))}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiShield className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-semibold text-gray-800">Security</h2>
          </div>
          <div className="space-y-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            >
              <FiLogOut />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type="info"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}