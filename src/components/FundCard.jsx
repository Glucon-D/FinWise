import RiskTag from './RiskTag'
import { FiTrendingUp, FiBarChart2, FiInfo } from 'react-icons/fi'
import { formatCurrency, formatPercentage } from '../utils/formatters'

export default function FundCard({ fund, onExplain }) {
  const { 
    name, 
    description = "A mutual fund investment option", // Default description
    risk = fund.riskLevel, // Fallback to riskLevel if risk not present
    nav, 
    returns = {}, 
    minInvestment = fund.minimumInvestment, // Fallback to minimumInvestment
    category,
    type,
    aum,
    expense
  } = fund

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{category}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <div className="flex items-center gap-1">
                <RiskTag risk={risk} />
                {onExplain && (
                  <button
                    onClick={() => onExplain(`${risk} risk in investments`)}
                    className="ml-1 bg-gray-100 hover:bg-gray-200 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs"
                    title="Explain this risk level"
                  >
                    🎓
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500">NAV</span>
            <span className="font-semibold text-gray-900">{formatCurrency(nav)}</span>
          </div>
        </div>
      
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 text-sm">{description}</p>
          {onExplain && (
            <button
              onClick={() => onExplain(type || category)}
              className="ml-2 flex-shrink-0 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
            >
              🧠 Explain

            </button>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiInfo className="text-gray-400" />
            <span>AUM: {aum}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiInfo className="text-gray-400" />
            <span>Expense: {expense}%</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">1Y Returns</p>
            <p className="font-semibold text-emerald-600">
              {formatPercentage(returns['1y'] || returns.oneYear || 0)}
            </p>
          </div>
          <div className="text-center border-x border-gray-200">
            <p className="text-xs text-gray-500 mb-1">3Y Returns</p>
            <p className="font-semibold text-emerald-600">
              {formatPercentage(returns['3y'] || returns.threeYear || 0)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">5Y Returns</p>
            <p className="font-semibold text-emerald-600">
              {formatPercentage(returns['5y'] || returns.fiveYear || 0)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiInfo className="text-gray-400" />
            <span>Min. Investment: {formatCurrency(minInvestment)}</span>
            {onExplain && (
              <button
                onClick={() => onExplain("Minimum Investment")}
                className="bg-gray-100 hover:bg-gray-200 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs"
              >
                🎓
              </button>
            )}
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