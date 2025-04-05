export const mutualFunds = {
  equity: {
    largeCap: [
      {
        name: "HDFC Top 100 Fund",
        code: "HDFTOP100",
        category: "Large Cap",
        nav: 823.45,
        aum: "21,456 Cr",
        expense: 1.65,
        returns: {
          oneYear: 12.5,
          threeYear: 15.2,
          fiveYear: 11.8
        },
        riskLevel: "Moderate",
        minimumInvestment: 5000,
        fundManager: "Prashant Jain",
        rating: 4
      },
      {
        name: "Axis Bluechip Fund",
        code: "AXISBLU",
        category: "Large Cap",
        nav: 421.67,
        aum: "15,234 Cr",
        expense: 1.54,
        returns: {
          oneYear: 14.3,
          threeYear: 16.8,
          fiveYear: 13.2
        },
        riskLevel: "Moderate",
        minimumInvestment: 5000,
        fundManager: "Shreyash Devalkar",
        rating: 5
      }
    ],
    midCap: [
      {
        name: "SBI Magnum Midcap Fund",
        code: "SBIMID",
        category: "Mid Cap",
        nav: 156.78,
        aum: "12,345 Cr",
        expense: 1.78,
        returns: {
          oneYear: 18.9,
          threeYear: 21.4,
          fiveYear: 15.6
        },
        riskLevel: "High",
        minimumInvestment: 5000,
        fundManager: "R. Srinivasan",
        rating: 4
      }
    ]
  },
  debt: {
    shortTerm: [
      {
        name: "ICICI Pru Short Term Fund",
        code: "ICICIST",
        category: "Short Term Debt",
        nav: 45.67,
        aum: "8,765 Cr",
        expense: 0.95,
        returns: {
          oneYear: 6.8,
          threeYear: 7.2,
          fiveYear: 7.5
        },
        riskLevel: "Low",
        minimumInvestment: 5000,
        fundManager: "Manish Banthia",
        rating: 4
      }
    ]
  },
  hybrid: {
    balanced: [
      {
        name: "Kotak Equity Hybrid Fund",
        code: "KOTBAL",
        category: "Balanced Hybrid",
        nav: 234.56,
        aum: "9,876 Cr",
        expense: 1.85,
        returns: {
          oneYear: 10.4,
          threeYear: 12.8,
          fiveYear: 10.2
        },
        riskLevel: "Moderate",
        minimumInvestment: 5000,
        fundManager: "Harsha Upadhyaya",
        rating: 4
      }
    ],
    aggressive: [
      {
        name: "DSP Equity & Bond Fund",
        code: "DSPEB",
        category: "Aggressive Hybrid",
        nav: 189.34,
        aum: "7,654 Cr",
        expense: 1.92,
        returns: {
          oneYear: 11.6,
          threeYear: 13.9,
          fiveYear: 11.4
        },
        riskLevel: "Moderately High",
        minimumInvestment: 1000,
        fundManager: "Sahil Kapoor",
        rating: 3
      }
    ]
  },
  index: {
    nifty: [
      {
        name: "UTI Nifty Index Fund",
        code: "UTINIF",
        category: "Index Fund",
        nav: 167.89,
        aum: "6,543 Cr",
        expense: 0.20,
        returns: {
          oneYear: 15.2,
          threeYear: 14.8,
          fiveYear: 12.9
        },
        riskLevel: "Moderate",
        minimumInvestment: 5000,
        fundManager: "Index Fund",
        rating: 5
      }
    ]
  }
}

export const riskProfiles = {
  conservative: ["ICICIST", "UTINIF"],
  moderate: ["HDFTOP100", "AXISBLU", "KOTBAL"],
  aggressive: ["SBIMID", "DSPEB"]
}
