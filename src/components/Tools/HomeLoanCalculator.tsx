"use client";

import { formatPrice } from "@/components/Utils/formatPrice";
import { useMemo, useState } from "react";

function computeMonthlyInstallment(
  principal: number,
  annualRatePercent: number,
  tenureYears: number,
): { monthly: number; total: number; months: number } {
  const months = Math.max(1, Math.round(tenureYears * 12));
  if (principal <= 0) {
    return { monthly: 0, total: 0, months };
  }
  const r = annualRatePercent / 100 / 12;
  if (r <= 0) {
    const monthly = principal / months;
    return { monthly, total: monthly * months, months };
  }
  const pow = (1 + r) ** months;
  const monthly = (principal * r * pow) / (pow - 1);
  return { monthly, total: monthly * months, months };
}

export default function HomeLoanCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(500_000);
  const [downPayment, setDownPayment] = useState(100_000);
  const [interestRate, setInterestRate] = useState(3.8);
  const [tenureYears, setTenureYears] = useState(30);

  const loanAmount = Math.max(0, propertyPrice - downPayment);

  const { monthly, total } = useMemo(
    () => computeMonthlyInstallment(loanAmount, interestRate, tenureYears),
    [loanAmount, interestRate, tenureYears],
  );

  const invalidLoan = loanAmount <= 0;
  const invalidDown = downPayment > propertyPrice;

  return (
    <section className="emi-loan-calculator pt-70 pb-120">
      <div className="container">
        <div className="row justify-content-center mb-40">
          <div className="col-lg-10 text-center">
            <h2 className="tp-section-title mb-15">Home Loan Calculator</h2>
            <p
              className="text-muted mb-0"
              style={{ maxWidth: "640px", margin: "0 auto" }}
            >
              Estimate your monthly housing loan repayment from property price,
              down payment, interest rate, and tenure. This is a guide only —
              actual bank offers may differ.
            </p>
          </div>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-xl-10">
            <div
              className="emi-loan-calculator__card p-4 p-lg-5"
              style={{
                border: "1px solid #dbe1ef",
                borderRadius: "12px",
                background: "#fff",
                boxShadow: "0 8px 40px rgba(45, 46, 69, 0.06)",
              }}
            >
              <h4
                className="mb-4 pb-3"
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  borderBottom: "1px solid #eef1f6",
                  color: "#003b5c",
                }}
              >
                Home loan details
              </h4>

              <div className="row g-4 g-xl-5">
                <div className="col-lg-7">
                  <div className="mb-4">
                    <label
                      className="form-label fw-semibold"
                      htmlFor="emi-property-price"
                    >
                      Property price (RM)
                    </label>
                    <input
                      id="emi-property-price"
                      type="number"
                      min={0}
                      className="form-control"
                      value={propertyPrice || ""}
                      onChange={(e) =>
                        setPropertyPrice(Number(e.target.value) || 0)
                      }
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="form-label fw-semibold"
                      htmlFor="emi-down-payment"
                    >
                      Down payment (RM)
                    </label>
                    <input
                      id="emi-down-payment"
                      type="number"
                      min={0}
                      className="form-control"
                      value={downPayment || ""}
                      onChange={(e) =>
                        setDownPayment(Number(e.target.value) || 0)
                      }
                    />
                    {invalidDown && (
                      <p className="text-danger small mt-1 mb-0">
                        Down payment cannot exceed property price.
                      </p>
                    )}
                  </div>

                  <div className="mb-2">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label
                        className="form-label fw-semibold mb-0"
                        htmlFor="emi-rate"
                      >
                        Interest rate (% p.a.)
                      </label>
                      <span className="small text-muted">
                        {interestRate.toFixed(1)}%
                      </span>
                    </div>
                    <input
                      id="emi-rate"
                      type="range"
                      className="form-range"
                      min={2}
                      max={8}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                    />
                    <div className="d-flex justify-content-between small text-muted">
                      <span>2%</span>
                      <span>8%</span>
                    </div>
                  </div>

                  <div className="mb-0">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label
                        className="form-label fw-semibold mb-0"
                        htmlFor="emi-tenure"
                      >
                        Tenure (years)
                      </label>
                      <span className="small text-muted">
                        {tenureYears} yrs
                      </span>
                    </div>
                    <input
                      id="emi-tenure"
                      type="range"
                      className="form-range"
                      min={5}
                      max={35}
                      step={1}
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                    />
                    <div className="d-flex justify-content-between small text-muted">
                      <span>5</span>
                      <span>35</span>
                    </div>
                  </div>

                  <div
                    className="mt-4 p-3 rounded-2"
                    style={{ background: "#f0f4fd" }}
                  >
                    <div className="d-flex justify-content-between small mb-1">
                      <span className="text-muted">Loan amount</span>
                      <span
                        className="fw-semibold"
                        style={{ color: "#003b5c" }}
                      >
                        {invalidLoan || invalidDown
                          ? "—"
                          : formatPrice(loanAmount, false)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div
                    className="h-100 p-4 rounded-3"
                    style={{
                      background:
                        "linear-gradient(160deg, #003b5c 0%, #0a5a82 100%)",
                      color: "#fff",
                    }}
                  >
                    <h5
                      className="text-white mb-4"
                      style={{ fontSize: "16px", fontWeight: 600 }}
                    >
                      Summary
                    </h5>
                    <div
                      className="mb-4 pb-4"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      <p className="small text-white-50 mb-1">
                        Monthly installment
                      </p>
                      <p
                        className="mb-0"
                        style={{
                          fontSize: "28px",
                          fontWeight: 700,
                          lineHeight: 1.2,
                        }}
                      >
                        {invalidLoan || invalidDown
                          ? "—"
                          : formatPrice(monthly, false)}
                      </p>
                    </div>
                    <div>
                      <p className="small text-white-50 mb-1">
                        Total payment (principal + interest)
                      </p>
                      <p
                        className="mb-0"
                        style={{ fontSize: "22px", fontWeight: 600 }}
                      >
                        {invalidLoan || invalidDown
                          ? "—"
                          : formatPrice(total, false)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p
                className="small text-muted mt-4 mb-0"
                style={{ lineHeight: 1.6 }}
              >
                * This calculator is for illustration only. Results vary by bank
                and product. PropertyLa does not guarantee accuracy or
                suitability for your circumstances — confirm figures with your
                financial institution before committing.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <div className="col-lg-10">
            <h3
              className="h5 mb-3"
              style={{ color: "#003b5c", fontWeight: 600 }}
            >
              How to use this calculator
            </h3>
            <ol className="text-muted ps-3" style={{ lineHeight: 1.85 }}>
              <li>Enter the property price you are considering.</li>
              <li>
                Enter your planned down payment (loan = price minus down
                payment).
              </li>
              <li>
                Set an expected annual interest rate (Malaysian housing loans
                often sit in a similar range — adjust to match your bank quote).
              </li>
              <li>
                Choose loan tenure in years (common options are up to 35 years).
              </li>
              <li>
                Read the monthly installment and total repayment as a planning
                guide.
              </li>
            </ol>

            <h3
              className="h5 mt-4 mb-3"
              style={{ color: "#003b5c", fontWeight: 600 }}
            >
              How home loans work in Malaysia (brief)
            </h3>
            <p className="text-muted mb-2" style={{ lineHeight: 1.8 }}>
              Most housing loans are amortising: early payments are weighted
              toward interest; over time more goes to principal. Banks assess
              income, existing debts, and credit history (e.g. CCRIS). Rates may
              be fixed or floating and can change with market or policy rates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
