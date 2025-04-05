import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../context/ProfileContext'
import { FiInfo, FiArrowRight, FiAlertCircle } from 'react-icons/fi'
import Toast from '../components/Toast'

export default function ProfileForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')
  const [formData, setFormData] = useState({
    age: '',
    investmentPeriod: '',
    monthlyInvestment: '',
    initialInvestment: '',
    investmentGoal: '',
    riskTolerance: '',
  })
  
  const { updateProfile, loading } = useProfile()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (['age', 'investmentPeriod', 'monthlyInvestment', 'initialInvestment'].includes(name)) {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || '' }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const showMessage = (message, type = 'success') => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
      return
    }

    try {
      const result = await updateProfile(formData)
      if (result.success) {
        showMessage('Profile updated successfully!')
        setTimeout(() => navigate('/dashboard'), 1500)
      } else {
        showMessage(result.error || 'Failed to update profile', 'error')
      }
    } catch (error) {
      showMessage('An unexpected error occurred', 'error')
      console.error('Profile update error:', error)
    }
  }

  const steps = [
    {
      title: "Basic Information",
      fields: ["age", "investmentPeriod"]
    },
    {
      title: "Investment Details",
      fields: ["monthlyInvestment", "initialInvestment", "investmentGoal", "investmentPeriod"]
    },
    {
      title: "Risk Assessment",
      fields: ["riskTolerance"]
    }
  ]

  const renderField = (fieldName) => {
    const commonClasses = "w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
    
    switch (fieldName) {
      case "age":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Your Age
              <div className="relative mt-1">
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={commonClasses}
                  min="18"
                  max="100"
                  required
                />
              </div>
            </label>
          </div>
        )

      case "investmentPeriod":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Investment Period (Years)
              <div className="relative mt-1">
                <input
                  type="number"
                  name="investmentPeriod"
                  value={formData.investmentPeriod}
                  onChange={handleChange}
                  className={commonClasses}
                  min="1"
                  max="30"
                  required
                />
              </div>
            </label>
          </div>
        )

      case "monthlyInvestment":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Monthly Investment Amount
              <div className="relative mt-1">
                <input
                  type="number"
                  name="monthlyInvestment"
                  value={formData.monthlyInvestment}
                  onChange={handleChange}
                  className={commonClasses}
                  min="100"
                  max="10000000"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Min: ₹100, Max: ₹1,00,00,000</p>
            </label>
          </div>
        )

      case "initialInvestment":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Initial Investment (Lump Sum)
              <div className="relative mt-1">
                <input
                  type="number"
                  name="initialInvestment"
                  value={formData.initialInvestment}
                  onChange={handleChange}
                  className={commonClasses}
                  min="0"
                />
              </div>
            </label>
          </div>
        )

      case "investmentGoal":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Investment Goal
              <select
                name="investmentGoal"
                value={formData.investmentGoal}
                onChange={handleChange}
                className={`${commonClasses} cursor-pointer`}
                required
              >
                <option value="">Select your goal</option>
                <option value="Retirement">Retirement</option>
                <option value="Buy a house">Buy a house</option>
                <option value="Children's education">Children's education</option>
                <option value="Wealth creation">Wealth creation</option>
                <option value="Tax saving">Tax saving</option>
              </select>
            </label>
          </div>
        )

      case "riskTolerance":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Risk Tolerance
              <select
                name="riskTolerance"
                value={formData.riskTolerance}
                onChange={handleChange}
                className={`${commonClasses} cursor-pointer`}
                required
              >
                <option value="">Select risk level</option>
                <option value="low">Conservative (Low Risk)</option>
                <option value="medium">Balanced (Medium Risk)</option>
                <option value="high">Aggressive (High Risk)</option>
              </select>
            </label>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Investment Profile</h1>
        <p className="text-gray-600">Step {currentStep} of {steps.length}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {steps[currentStep - 1].fields.map(fieldName => (
              <div key={fieldName}>
                {renderField(fieldName)}
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-between items-center">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2 text-emerald-600 hover:text-emerald-500"
                disabled={loading}
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="ml-auto flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {currentStep === steps.length ? 'Create Profile' : 'Next'}
                  <FiArrowRight />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p className="flex items-center justify-center gap-2">
          <FiInfo />
          Your information helps us provide personalized investment recommendations
        </p>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}