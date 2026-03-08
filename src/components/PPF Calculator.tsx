import { useState } from "react";
import type { CSSProperties } from "react";

export default function PFCalculator() {
  const [salary, setSalary] = useState(50000);
  const [years, setYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.1);
  const [currentBalance, setCurrentBalane] = useState(0);
  const [annualIncrement, setAnnualIncrement] = useState(3);

  const employeeRate = 12;
  const employerRate = 12;

  const employeeContribution = (salary * employeeRate) / 100;
  const employerContribution = (salary * employerRate) / 100;

  const eps = Math.min(15000, salary) * 0.0833;
  const epfEmployer = employerContribution - eps;

  const monthlyEPF = employeeContribution + epfEmployer;
  let yearlyEPF = monthlyEPF * 12;

  let balance = 0;
  let invested = 0;
  balance = balance+currentBalance; 
  for (let i = 0; i < years; i++) {
    yearlyEPF = yearlyEPF+ (yearlyEPF*annualIncrement)/100;
    balance += yearlyEPF;
    invested += yearlyEPF;
    balance += (balance * interestRate) / 100;
  }

  const interestEarned = balance - invested;

  return (
    <div style={styles.wrapper}>
      <div style={styles.leftPanel}>
        <div style={styles.container}>
        <h1>Provident Fund Calculator</h1>

        <div style={styles.inputField}>
          <label style={styles.label}>Monthly Basic Salary (₹)</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            style={styles.input}
          />
        </div>
        <br/>

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
            
          <label style={styles.label}>Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            style={styles.input}
          />
        </div>

        <br/>
        <div style={styles.inputField}>
            <label style={styles.label}>Current EPF Balance (₹)</label>
            <input
             type="number"
             value={currentBalance}
             onChange={(e) =>setCurrentBalane(Number(e.target.value))}
             style={styles.input} />
             </div>
         <br/>  
         <div style={styles.inputField}>
            <label style={styles.label}>Annual Increment</label>
            <input
             type="number"
             value={annualIncrement}
             onChange={(e) =>setAnnualIncrement(Number(e.target.value))}
             style={styles.input} />
             </div>
          
        <br/>
        <div style={styles.results}>
          <div>
            <strong>Monthly EPF Contribution</strong>
            <div>₹ {monthlyEPF.toFixed(0)}</div>
          </div>

          <div>
            <strong>Total Invested</strong>
            <div>₹ {invested.toFixed(0)}</div>
          </div>

          <div>
            <strong>Interest Earned</strong>
            <div>₹ {interestEarned.toFixed(0)}</div>
          </div>

          <div>
            <strong>Future PF Balance</strong>
            <div>₹ {balance.toFixed(0)}</div>
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
   /* justifyContent: "flex-start", */
    alignItems: "flex-start",
    padding: "30px",
    background: "linear-gradient(135deg, #8a681e, #0F172A)",
  },
  leftPanel: {
    width: "100%",
    maxWidth: "600px",
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
