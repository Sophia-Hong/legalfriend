export const leaseSections = [
  {
    provision: "Parties & Property",
    section: "§1.2, §1.3",
    details: [
      "- Residents: Miguel Rodriguez, Ana Rodriguez",
      "- Property: 15621 Palm View Drive, Santa Ana, CA"
    ],
    assessment: { 
      type: "success" as const, 
      text: "✓ All required information present and clearly stated" 
    }
  },
  {
    provision: "Security Deposit",
    section: "§5.1-5.3",
    details: [
      "- Amount: $7,000",
      "- Return Timeline: 21 days after move-out"
    ],
    assessment: { 
      type: "error" as const, 
      text: "⚠ ALERT: Exceeds CA legal limit (max 2 months' rent for unfurnished units)",
      info: "Common practice: Request adjustment to align with legal maximum of $5,486 (2 months' rent)"
    }
  },
  {
    provision: "Early Termination",
    section: "§11.2-11.4",
    details: [
      "- Fee: $1,000 + Rent until new tenant",
      "- Notice Required: 60 days"
    ],
    assessment: { 
      type: "error" as const, 
      text: "⚠ ALERT: Combined penalties exceed typical market terms",
      info: "Standard market practice: Either termination fee OR rent continuation, typically not both"
    }
  },
  {
    provision: "Lease Term & Renewal",
    section: "§3.1-3.4",
    details: [
      "- Initial Term: July 2024 - July 2025",
      "- Renewal: 60-day notice for month-to-month"
    ],
    assessment: { 
      type: "warning" as const, 
      text: "! Notice period longer than typical",
      info: "Market reference: Most properties require 30-45 days notice"
    }
  }
];