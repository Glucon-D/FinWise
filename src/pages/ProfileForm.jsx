import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import { FiInfo } from "react-icons/fi";
import Toast from "../components/Toast";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    age: "",
    investmentPeriod: "",
    monthlyInvestment: "",
    initialInvestment: "",
    investmentGoal: "",
    riskTolerance: "",
  });

  const { profile, updateProfile, loading } = useProfile();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Prefill profile data
  useEffect(() => {
    if (profile) {
      setFormData({
        age: profile.age || "",
        investmentPeriod: profile.goalYears || "",
        monthlyInvestment: profile.capital || "",
        initialInvestment: profile.initialInvestment || "",
        investmentGoal: profile.goal || "",
        riskTolerance: profile.riskAppetite || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      [
        "age",
        "investmentPeriod",
        "monthlyInvestment",
        "initialInvestment",
      ].includes(name)
    ) {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const showMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        showMessage("Profile updated successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        showMessage(result.error || "Failed to update profile", "error");
      }
    } catch (error) {
      showMessage("An unexpected error occurred", "error");
      console.error("Profile update error:", error);
    }
  };

  const commonClasses =
    "w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Your Investment Profile
        </h1>
        <p className="text-gray-600">
          Fill or update your investment preferences below
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Age <span className="text-red-500">*</span>
            </label>
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

          {/* Investment Period */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Investment Period (Years) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="investmentPeriod"
              value={formData.investmentPeriod}
              onChange={handleChange}
              className={commonClasses}
              min="0"
              max="30"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Min: 0 years, Max: 30 years
            </p>
          </div>

          {/* Monthly Investment */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Monthly Investment Amount <span className="text-red-500">*</span>
            </label>
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
            <p className="text-xs text-gray-500 mt-1">
              Min: ₹100, Max: ₹1,00,00,000
            </p>
          </div>

          {/* Initial Investment */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Initial Investment (Lump Sum)
            </label>
            <input
              type="number"
              name="initialInvestment"
              value={formData.initialInvestment}
              onChange={handleChange}
              className={commonClasses}
              min="0"
              max="100000000"
            />
            <p className="text-xs text-gray-500 mt-1">
              Min: ₹0, Max: ₹10,00,00,000
            </p>
          </div>

          {/* Investment Goal */}
          {/* Investment Goal */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Investment Goal <span className="text-red-500">*</span>
            </label>
            <select
              name="investmentGoal"
              value={
                ![
                  "Retirement",
                  "Buy a house",
                  "Children's education",
                  "Wealth creation",
                  "Tax saving",
                ].includes(formData.investmentGoal)
                  ? "Custom"
                  : formData.investmentGoal
              }
              onChange={(e) => {
                const value = e.target.value;
                if (value === "Custom") {
                  setFormData((prev) => ({ ...prev, investmentGoal: "" }));
                } else {
                  setFormData((prev) => ({ ...prev, investmentGoal: value }));
                }
              }}
              className={`${commonClasses} cursor-pointer`}
              required
            >
              <option value="">Select your goal</option>
              <option value="Retirement">Retirement</option>
              <option value="Buy a house">Buy a house</option>
              <option value="Children's education">Children's education</option>
              <option value="Wealth creation">Wealth creation</option>
              <option value="Tax saving">Tax saving</option>
              <option value="Custom">Other (Custom Goal)</option>
            </select>

            {/* Show text input if custom goal */}
            {![
              "Retirement",
              "Buy a house",
              "Children's education",
              "Wealth creation",
              "Tax saving",
            ].includes(formData.investmentGoal) && (
              <div className="mt-2">
                <input
                  type="text"
                  name="investmentGoal"
                  value={formData.investmentGoal}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      investmentGoal: e.target.value.slice(0, 150),
                    }))
                  }
                  className={commonClasses}
                  placeholder="Enter your custom goal"
                  maxLength="150"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Max 150 characters</p>
              </div>
            )}
          </div>

          {/* Risk Tolerance */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Risk Tolerance <span className="text-red-500">*</span>
            </label>
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
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p className="flex items-center justify-center gap-2">
          <FiInfo />
          Your information helps us provide personalized investment
          recommendations.
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
  );
}
