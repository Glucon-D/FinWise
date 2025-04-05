import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../context/ProfileContext'
import { FiInfo, FiArrowRight } from 'react-icons/fi'

export default function ProfileForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    occupation: '',
    income: '',
    existingInvestments: '',
    investmentPeriod: '',
    initialInvestment: '',
    monthlyInvestment: '',
    riskTolerance: '',
    investmentGoal: '',
    dependents: '',
    emergencyFund: ''
  })
  
  const { updateProfile } = useProfile()
  const navigate = useNavigate()

  const formatToRupees = (value) => {
    if (!value) return ''
    const number = value.replace(/[^0-9]/g, '')
    return `₹${Number(number).toLocaleString('en-IN')}`
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (['initialInvestment', 'monthlyInvestment', 'income', 'emergencyFund'].includes(name)) {
      const numericValue = value.replace(/[^0-9]/g, '')
      setFormData(prev => ({ ...prev, [name]: numericValue }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const steps = [
    {
      title: "Personal Details",
      fields: ["name", "age", "occupation"]
    },
    {
      title: "Financial Details",
      fields: ["income", "existingInvestments", "emergencyFund"]
    },
    {
      title: "Investment Details",
      fields: ["initialInvestment", "monthlyInvestment"]
    },
    {
      title: "Investment Strategy",
      fields: ["investmentPeriod", "riskTolerance", "investmentGoal", "dependents"]
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    } else {
      updateProfile(formData)
      navigate('/fund-suggestions')
    }
  }

  const renderField = (fieldName) => {
    const commonClasses = "w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
    
    switch (fieldName) {
      case "name":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={commonClasses}
                required
              />
            </label>
          </div>
        )

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
                <div className="absolute top-3 right-3">
                  <FiInfo className="text-gray-400 hover:text-emerald-500 cursor-help" 
                         title="Must be at least 18 years old" />
                </div>
              </div>
            </label>
          </div>
        )

      case "occupation":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Occupation
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className={`${commonClasses} cursor-pointer`}
                required
              >
                <option value="">Select Occupation</option>
                <option value="salaried">Salaried</option>
                <option value="business">Business Owner</option>
                <option value="professional">Professional</option>
                <option value="student">Student</option>
                <option value="retired">Retired</option>
              </select>
            </label>
          </div>
        )

      case "income":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Annual Income
              <div className="relative mt-1">
                <input
                  type="text"
                  name="income"
                  value={formatToRupees(formData.income)}
                  onChange={handleChange}
                  className={commonClasses}
                  placeholder="₹5,00,000"
                  required
                />
              </div>
            </label>
          </div>
        )

      case "initialInvestment":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Initial Investment Amount
              <div className="relative mt-1">
                <input
                  type="text"
                  name="initialInvestment"
                  value={formatToRupees(formData.initialInvestment)}
                  onChange={handleChange}
                  className={commonClasses}
                  placeholder="₹10,000"
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
              Monthly SIP Amount
              <div className="relative mt-1">
                <input
                  type="text"
                  name="monthlyInvestment"
                  value={formatToRupees(formData.monthlyInvestment)}
                  onChange={handleChange}
                  className={commonClasses}
                  placeholder="₹5,000"
                  required
                />
              </div>
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
                <option value="">Select Risk Level</option>
                <option value="conservative">Conservative (Low Risk)</option>
                <option value="moderate">Moderate (Medium Risk)</option>
                <option value="aggressive">Aggressive (High Risk)</option>
              </select>
            </label>
          </div>
        )

      case "emergencyFund":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Emergency Fund
              <div className="relative mt-1">
                <input
                  type="text"
                  name="emergencyFund"
                  value={formatToRupees(formData.emergencyFund)}
                  onChange={handleChange}
                  className={commonClasses}
                  placeholder="₹1,00,000"
                  required
                />
                <div className="absolute top-3 right-3">
                  <FiInfo className="text-gray-400 hover:text-emerald-500 cursor-help" 
                         title="Recommended: 6 months of expenses" />
                </div>
              </div>
            </label>
          </div>
        )

      case "dependents":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Number of Dependents
              <input
                type="number"
                name="dependents"
                value={formData.dependents}
                onChange={handleChange}
                className={commonClasses}
                min="0"
                max="10"
                required
              />
            </label>
          </div>
        )

      case "investmentPeriod":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Investment Period (Years)
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
                <option value="">Select Goal</option>
                <option value="retirement">Retirement</option>
                <option value="wealth-creation">Wealth Creation</option>
                <option value="child-education">Child Education</option>
                <option value="home-purchase">Home Purchase</option>
                <option value="tax-saving">Tax Saving</option>
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
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="ml-auto flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition-colors"
            >
              {currentStep === steps.length ? 'Get Recommendations' : 'Next'}
              <FiArrowRight />
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
    </div>
  )
}