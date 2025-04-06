import { useEffect, useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { getFundsByRisk, mapRiskToleranceToProfile } from "../data/fundData";
import FundCard from "../components/FundCard";
import RiskTag from "../components/RiskTag";
import { FiAlertCircle, FiLoader, FiInfo, FiX } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import { formatToRupees } from "../utils/formatters";
import { explainLike18 } from "../services/gemini";
import { fetchGoldPrice } from "../services/goldService";
import GoldCard from "../components/GoldCard";

export default function FundSuggestions() {
  const { profile, loading } = useProfile();
  const [recommendedFunds, setRecommendedFunds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [explanation, setExplanation] = useState("");
  const [explainedTerm, setExplainedTerm] = useState("");
  const [explainLoading, setExplainLoading] = useState(false);
  const [goldData, setGoldData] = useState(null);

  const handleExplain = async (term) => {
    setExplainLoading(true);
    setExplainedTerm(term);
    try {
      const result = await explainLike18(term);
      if (result.success) {
        setExplanation(result.explanation);
      } else {
        setExplanation(`Sorry, I couldn't explain ${term} right now.`);
      }
    } catch (error) {
      console.error("Error getting explanation:", error);
      setExplanation(`Sorry, I couldn't explain ${term} right now.`);
    } finally {
      setExplainLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      try {
        // First, try to use AI-suggested risk profile if available
        let riskProfile;

        if (profile.riskProfile) {
          // Convert AI-generated risk profile to match our system's risk profile format
          const aiRiskProfile = profile.riskProfile.toLowerCase().trim();
          if (aiRiskProfile === "conservative" || aiRiskProfile === "low") {
            riskProfile = "conservative";
          } else if (
            aiRiskProfile === "aggressive" ||
            aiRiskProfile === "high"
          ) {
            riskProfile = "aggressive";
          } else {
            riskProfile = "moderate";
          }
        } else {
          // Fallback to using the risk appetite
          riskProfile = mapRiskToleranceToProfile(profile.riskAppetite);
        }

        console.log("Using risk profile:", riskProfile);
        let funds = getFundsByRisk(riskProfile);

        // If still no funds found, show some default funds
        if (funds.length === 0) {
          console.log(
            "No funds found for risk profile, using moderate as fallback"
          );
          funds = getFundsByRisk("moderate");
        }

        // Filter funds by investment types if AI has provided them
        if (
          profile.investmentType &&
          profile.investmentType.length > 0 &&
          funds.length > 0
        ) {
          // Create a normalized array of investment types (lowercase for comparison)
          const normalizedTypes = profile.investmentType.map((type) =>
            type.toLowerCase()
          );

          // Filter funds that match at least one of the investment types
          const filteredFunds = funds.filter((fund) => {
            // Safely check if fund.type exists before calling toLowerCase()
            const fundType = fund.type || fund.category || "";

            // Compare fund type (lowercase) with our normalized investment types
            return normalizedTypes.some((type) => {
              return (
                fundType.toLowerCase().includes(type.toLowerCase()) ||
                type.includes(fundType.toLowerCase())
              );
            });
          });

          // Only use filtered funds if we found matches, otherwise keep all funds for the risk profile
          if (filteredFunds.length > 0) {
            funds = filteredFunds;
          } else {
            console.log(
              "No funds match investment types, showing all funds for risk profile"
            );
          }
        }

        console.log("Final filtered funds:", funds);
        setRecommendedFunds(funds);
      } catch (error) {
        console.error("Error fetching recommended funds:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    const fetchGoldData = async () => {
      try {
        const data = await fetchGoldPrice();
        setGoldData(data);
      } catch (error) {
        console.error("Error fetching gold data:", error);
      }
    };

    fetchGoldData();
    // Refresh gold price every 5 minutes
    const interval = setInterval(fetchGoldData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FiLoader className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <FiAlertCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Profile Required
        </h2>
        <p className="text-gray-600">
          Please complete your investment profile first.
        </p>
      </div>
    );
  }

  // Calculate portfolio allocation based on risk appetite
  const getAllocation = () => {
    // Get normalized risk profile
    const riskProfile = mapRiskToleranceToProfile(profile.riskAppetite);

    switch (riskProfile) {
      case "aggressive":
        return { equity: 75, debt: 15, gold: 10 };
      case "moderate":
        return { equity: 60, debt: 30, gold: 10 };
      case "conservative":
        return { equity: 40, debt: 50, gold: 10 };
      default:
        return { equity: 60, debt: 30, gold: 10 };
    }
  };

  const allocation = getAllocation();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-lg p-6 mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Your Recommended Funds</h1>
          <p className="text-emerald-50 mb-4">
            AI-powered investment recommendations based on your risk profile
          </p>
          <div className="flex items-center justify-center gap-2">
            <RiskTag risk={profile.riskAppetite} />
            <button
              onClick={() =>
                handleExplain(profile.riskProfile || "Investment Risk Profile")
              }
              className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded flex items-center"
            >
              🧠 Explain
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <GoldCard goldData={goldData} onExplain={handleExplain} />
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              AI-Recommended Funds
              <button
                onClick={() => handleExplain("Recommended Funds")}
                className="ml-2 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded inline-flex items-center"
              >
                🧠 Explain
              </button>
            </h2>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">
                <FiLoader className="w-6 h-6 text-emerald-500 mx-auto mb-2 animate-spin" />
                <p>Loading AI-powered fund recommendations...</p>
              </div>
            ) : recommendedFunds.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {recommendedFunds.map((fund) => (
                  <FundCard
                    key={fund.code}
                    fund={fund}
                    onExplain={handleExplain}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-yellow-50 rounded-lg">
                <FiAlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-gray-700">
                  No funds match your AI-generated risk profile. Please update
                  your profile.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Investment Summary
            </h2>
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Asset Allocation
              <button
                onClick={() => handleExplain("Asset Allocation")}
                className="ml-2 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded inline-flex items-center"
              >
                🧠 Explain
              </button>
            </h2>
            <div className="space-y-4">
              {Object.entries(allocation).map(([type, percentage]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-gray-600 capitalize">
                    {type}
                    <button
                      onClick={() => handleExplain(type)}
                      className="ml-2 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded inline-flex items-center"
                    >
                      🧠 Explain
                    </button>
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          type === "equity"
                            ? "bg-emerald-500"
                            : type === "debt"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
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
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                AI-Suggested Investment Strategy
                <button
                  onClick={() => handleExplain("Investment Strategy")}
                  className="ml-2 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded inline-flex items-center"
                >
                  🧠 Explain
                </button>
              </h3>
              {profile.investmentType && profile.investmentType.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.investmentType.map((type, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {type}
                      <button
                        onClick={() => handleExplain(type)}
                        className="ml-1 bg-blue-100 hover:bg-blue-200 rounded-full w-5 h-5 inline-flex items-center justify-center"
                      >
                        🎓
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Update your profile to get AI-powered investment strategies
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Modal */}
      {explanation && (
        <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setExplanation("")}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                <FiInfo className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">
                Understanding {explainedTerm}
              </h3>
            </div>
            {explainLoading ? (
              <div className="text-center py-6">
                <FiLoader className="w-6 h-6 text-emerald-500 mx-auto mb-2 animate-spin" />
                <p className="text-gray-500">Getting explanation...</p>
              </div>
            ) : (
              <div className="text-gray-700 leading-relaxed">{explanation}</div>
            )}
            <div className="mt-6 text-right">
              <button
                onClick={() => setExplanation("")}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
