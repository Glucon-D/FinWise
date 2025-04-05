import { useEffect, useState } from 'react'
import { useProfile } from '../context/ProfileContext'
import { getFundsByRisk, mapRiskToleranceToProfile } from '../data/fundData'
import FundCard from '../components/FundCard'
import RiskTag from '../components/RiskTag'
import { FiAlertCircle, FiLoader } from 'react-icons/fi'
import { BiRupee } from 'react-icons/bi'
import { formatToRupees } from '../utils/formatters'

export default function FundSuggestions() {
  const { profile, loading } = useProfile()
  const [recommendedFunds, setRecommendedFunds] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (profile?.riskAppetite) {
      try {
        // Map the risk tolerance to the correct profile format (conservative, moderate, aggressive)
        const riskProfile = mapRiskToleranceToProfile(profile.riskAppetite)
        const funds = getFundsByRisk(riskProfile)
        
        console.log("Fetched funds:", funds)
        setRecommendedFunds(funds)
      } catch (error) {
        console.error("Error fetching recommended funds:", error)
      } finally {
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [profile])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FiLoader className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <FiAlertCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Required</h2>
        <p className="text-gray-600">Please complete your investment profile first.</p>
      </div>
    )
  }

  // Calculate portfolio allocation based on risk appetite
  const getAllocation = () => {
    // Get normalized risk profile
    const riskProfile = mapRiskToleranceToProfile(profile.riskAppetite)
    
    switch (riskProfile) {
      case 'aggressive':
        return { equity: 75, debt: 15, gold: 10 }
      case 'moderate':
        return { equity: 60, debt: 30, gold: 10 }
      case 'conservative':
        return { equity: 40, debt: 50, gold: 10 }
      default:
        return { equity: 60, debt: 30, gold: 10 }
    }
  }

  const allocation = getAllocation()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-lg p-6 mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Your Recommended Funds</h1>
          <p className="text-emerald-50 mb-4">
            Personalized investment recommendations based on your risk profile
          </p>
          <RiskTag risk={profile.riskAppetite} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommended Portfolio</h2>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">
                <FiLoader className="w-6 h-6 text-emerald-500 mx-auto mb-2 animate-spin" />
                <p>Loading fund recommendations...</p>
              </div>
            ) : recommendedFunds.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {recommendedFunds.map(fund => (
                  <FundCard key={fund.code} fund={fund} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-yellow-50 rounded-lg">
                <FiAlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-gray-700">No funds match your risk profile. Please update your profile.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Investment Summary</h2>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Monthly Investment</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatToRupees(profile.capital)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Goal</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {profile.goal}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Timeline</p>
                  <p className="text-lg font-semibold text-purple-600">
                    {profile.goalYears} Years
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Asset Allocation</h2>
            <div className="space-y-4">
              {Object.entries(allocation).map(([type, percentage]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-gray-600 capitalize">{type}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          type === 'equity' ? 'bg-emerald-500' : 
                          type === 'debt' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-900 font-medium w-12 text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Investment Strategy</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {profile.investmentType?.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}