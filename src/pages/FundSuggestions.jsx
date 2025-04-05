import { useEffect, useState } from 'react'
import { useProfile } from '../context/ProfileContext'
import { getFundsByRisk } from '../data/dummyFunds'
import FundCard from '../components/FundCard'
import RiskTag from '../components/RiskTag'
import { FiAlertCircle } from 'react-icons/fi'
import { BiRupee } from 'react-icons/bi'
import { formatToRupees } from '../utils/formatters'

export default function FundSuggestions() {
  const { profile } = useProfile()
  const [recommendedFunds, setRecommendedFunds] = useState([])

  useEffect(() => {
    if (profile?.riskType) {
      const funds = getFundsByRisk(profile.riskType)
      setRecommendedFunds(funds)
    }
  }, [profile])

  if (!profile) {
    return (
      <div className="text-center py-12">
        <FiAlertCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Required</h2>
        <p className="text-gray-600">Please complete your investment profile first.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-lg p-6 mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Your Recommended Funds</h1>
          <p className="text-emerald-50 mb-4">
            Personalized investment recommendations based on your {profile.riskType} risk profile
          </p>
          <RiskTag risk={profile.riskType} className="mx-auto" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommended Portfolio</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {recommendedFunds.map(fund => (
                <FundCard key={fund.id} fund={fund} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Investment Summary</h2>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Investment</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatToRupees(profile.initialInvestment)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Monthly SIP</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {formatToRupees(profile.monthlyInvestment)}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Time Horizon</p>
                  <p className="text-lg font-semibold text-purple-600">
                    {profile.investmentPeriod} Years
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Asset Allocation</h2>
            <div className="space-y-4">
              {['Equity', 'Debt', 'Gold'].map((asset, index) => (
                <div key={asset} className="flex items-center justify-between">
                  <span className="text-gray-600">{asset}</span>
                  <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        asset === 'Equity' ? 'bg-emerald-500' : 
                        asset === 'Debt' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                      style={{ 
                        width: `${
                          asset === 'Equity' ? '60' :
                          asset === 'Debt' ? '30' : '10'
                        }%` 
                      }}
                    />
                  </div>
                  <span className="text-gray-900 font-medium w-12 text-right">
                    {asset === 'Equity' ? '60%' :
                     asset === 'Debt' ? '30%' : '10%'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}