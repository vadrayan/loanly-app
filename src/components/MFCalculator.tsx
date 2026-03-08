import { useState } from "react";
import type { CSSProperties } from "react";

export default function MFCalculator() {
  const [years, setYears] = useState(20);
  const [annualReturn, setAnnualRate] = useState(8.1);
  const [currentBalance, setCurrentBalane] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  
  
  const P = monthlyContribution;
  const n = years*12;
  const r = annualReturn/100/12;
  const lumpsumValue = currentBalance*Math.pow(1+annualReturn/100,years);
  const futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  const totalInvestment = P*n+currentBalance;
  const totalFutureValue= futureValue+lumpsumValue;
  const totalReturns = totalFutureValue-totalInvestment;

  return (
    <div style={styles.wrapper}>
      <div style={styles.leftPanel}>
        <div style={styles.container}>
        <h1>Mutual Fund Calculator</h1>
        <div style={styles.inputField}>
          <label style={styles.label}>Monthly Contribution</label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            style={styles.input}
          />
        </div>
        
        
        <div style={styles.inputField}>
          <label style={styles.label}>Years of Contribution</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            style={styles.input}
          />
        </div>
        <br/>
        <div style={styles.inputField}>
            
          <label style={styles.label}>Return Rate (%)</label>
          <input
            type="number"
            value={annualReturn}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
            style={styles.input}
          />
        </div>

        <br/>
        <div style={styles.inputField}>
            <label style={styles.label}>Current Balance (₹)</label>
            <input
             type="number"
             value={currentBalance}
             onChange={(e) =>setCurrentBalane(Number(e.target.value))}
             style={styles.input} />
             </div>
         <br/>  
          
        <br/>
        <div style={styles.results}>
          <div>
            <strong>Monthly MF Contribution</strong>
            <div>₹ {monthlyContribution.toFixed(0)}</div>
          </div>

          <div>
            <strong>Total Invested</strong>
            <div>₹ {totalInvestment.toFixed(0)}</div>
          </div>

          <div>
            <strong>Return Earned</strong>
            <div>₹ {totalReturns.toFixed(0)}</div>
          </div>

          <div>
            <strong>Future MF Balance</strong>
            <div>₹ {totalFutureValue.toFixed(0)}</div>
          </div>
      </div>
      </div>
     </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
 /*   justifyContent: "flex-start", */
    alignItems: "flex-start",
    padding: "30px",
    background: "linear-gradient(135deg, #8a681e, #0F172A)",
  },
  leftPanel: {
    width: "100%",
    maxWidth: "600px",
    // grow, shrink, min width
  background: "#ffffff",
  padding: "20px",
  borderRadius: "14px",
  boxSizing: "border-box",
  
 },

   container: {
  width: "100%",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "14px",
    width: "420px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  results: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  input: {
  width: "20%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
},
inputField: {
  display: "flex",
  alignItems: "center" as const,
  justifyContent: "space-between" as const,
},
label: {
  width: "55%",
  fontWeight: 500,
}

};
