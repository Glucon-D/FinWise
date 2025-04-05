import RiskTag from './RiskTag'
import { FiTrendingUp, FiBarChart2, FiInfo } from 'react-icons/fi'
import { formatCurrency, formatPercentage } from '../utils/formatters'

export default function FundCard({ fund }) {
  const { name, description, risk, nav, returns, minInvestment, category } = fund

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{category}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <RiskTag risk={risk} />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500">NAV</span>
            <span className="font-semibold text-gray-900">{formatCurrency(nav)}</span>
          </div>
        </div>
      
        <p className="text-gray-600 text-sm mb-6">{description}</p>
        
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">1Y Returns</p>
            <p className="font-semibold text-emerald-600">{formatPercentage(returns['1y'])}</p>
          </div>
          <div className="text-center border-x border-gray-200">
            <p className="text-xs text-gray-500 mb-1">3Y Returns</p>
            <p className="font-semibold text-emerald-600">{formatPercentage(returns['3y'])}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">5Y Returns</p>
            <p className="font-semibold text-emerald-600">{formatPercentage(returns['5y'])}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiInfo className="text-gray-400" />
            <span>Min. Investment: {formatCurrency(minInvestment)}</span>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
            <FiBarChart2 />
            <span className="text-sm font-medium">View Details</span>
          </button>
        </div>
      </div>
    </div>
  )
}