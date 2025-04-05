import { Link } from 'react-router-dom'
import { useProfile } from '../context/ProfileContext'
import RiskTag from '../components/RiskTag'
import { FiEdit, FiTrendingUp, FiCalendar, FiTarget, FiPieChart, FiActivity } from 'react-icons/fi'
import { BiRupee } from 'react-icons/bi'
import { formatToRupees, formatPercentage } from '../utils/formatters'

export default function Dashboard() {
  const { profile } = useProfile()

  if (!profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to FinWise!</h2>
        <p className="text-gray-600 mb-6">Let's start by setting up your investment profile</p>
        <Link
          to="/profile-form"
          className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400"
        >
          <FiEdit className="mr-2" />
          Create Profile
        </Link>
      </div>
    )
  }

  const summaryCards = [
    {
      icon: <BiRupee className="w-6 h-6" />,
      label: 'Initial Investment',
      value: formatToRupees(profile.initialInvestment),
      subtext: 'One-time Investment'
    },
    {
      icon: <BiRupee className="w-6 h-6" />,
      label: 'Monthly SIP',
      value: formatToRupees(profile.monthlyInvestment),
      subtext: 'Regular Investment'
    },
    {
      icon: <FiTarget className="w-6 h-6" />,
      label: 'Target Amount',
      value: formatToRupees(profile.initialInvestment * 3), // Example calculation
      subtext: 'Expected Returns'
    }
  ]

  const investmentMetrics = [
    {
      label: 'Investment Period',
      value: `${profile.investmentPeriod} Years`,
      icon: <FiCalendar className="w-5 h-5" />
    },
    {
      label: 'Risk Profile',
      value: profile.riskTolerance?.charAt(0).toUpperCase() + profile.riskTolerance?.slice(1),
      icon: <FiActivity className="w-5 h-5" />
    },
    {
      label: 'Portfolio Diversification',
      value: '5 Funds',
      icon: <FiPieChart className="w-5 h-5" />
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-lg p-6 mb-8 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back{profile.name ? `, ${profile.name}` : ''}!
            </h1>
            <p className="text-emerald-50">
              Your investment journey at a glance
            </p>
          </div>
          <Link
            to="/profile-form"
            className="inline-flex items-center px-3 py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 backdrop-blur-sm transition-colors"
          >
            <FiEdit className="mr-2" />
            Edit Profile
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {summaryCards.map((card, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-white">{card.icon}</div>
                <h3 className="text-sm font-medium text-emerald-50">{card.label}</h3>
              </div>
              <p className="text-2xl font-bold mb-1">{card.value}</p>
              <p className="text-sm text-emerald-100">{card.subtext}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Investment Metrics</h2>
          <div className="space-y-4">
            {investmentMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-emerald-500">{metric.icon}</div>
                  <span className="text-gray-600">{metric.label}</span>
                </div>
                <span className="font-semibold text-gray-800">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Portfolio Strategy</h2>
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">
              Based on your {profile.riskTolerance} risk profile, we recommend:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <p className="text-sm text-gray-600">Equity Allocation</p>
                <p className="text-2xl font-bold text-emerald-600">60%</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Debt Allocation</p>
                <p className="text-2xl font-bold text-blue-600">40%</p>
              </div>
            </div>
          </div>
          
          <Link
            to="/fund-suggestions"
            className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 mt-6 transition-colors"
          >
            <FiTrendingUp className="mr-2" />
            View Recommended Funds
          </Link>
        </div>
      </div>
    </div>
  )
}