import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import  { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";



ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

type ScheduleItem = {
  month: number;
  balance: number;
};

const loanTypes = {
  Home: { rate: 8.5, maxTenure: 30 },
  Car: { rate: 9.2, maxTenure: 7 },
  Personal: { rate: 12, maxTenure: 5 },
  Education: { rate: 10, maxTenure: 10 },
  Business: { rate: 11, maxTenure: 15 },
};

export default function EMICalculator() {
  // ✅ STATE (THIS FIXES YOUR ERROR)
  const [loanType, setLoanType] = useState<keyof typeof loanTypes>("Home");
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(loanTypes.Home.rate);
  const [tenure, setTenure] = useState(5);
  const [annualPrepayment, setAnnualPrepayment] = useState(0);
  const navigate = useNavigate();

  // EMI Calculation
  const { emi, totalPayment, totalInterest, monthsWithPrepay, interestSaved, schedule,
  scheduleWithPrepay } =
  useMemo(() => {
    const P = amount;
    const R = rate / 12 / 100;
    const N = tenure * 12;

    // Normal EMI
    const emiValue =
      R === 0
        ? P / N
        : (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    let balance = P;
    let totalInt = 0;
    let month = 0;
    const schedule: ScheduleItem[] = [];
 const scheduleWithPrepay: ScheduleItem[] = [];


    while (balance > 0 && month < 1000) {
      const interest = balance * R;
      const principalPaid = emiValue - interest;

      balance -= principalPaid;
      schedule.push({
  month,
  balance: Math.max(balance, 0),
 });
      totalInt += interest;
      month++;

      // yearly prepayment
      if (annualPrepayment > 0 && month % 12 === 0) {
        balance -= annualPrepayment;
      }
      scheduleWithPrepay.push({
  month,
  balance: Math.max(annualPrepayment, 0),
 });

    }

    /*const newTotalPayment = emiValue * month + annualPrepayment * Math.floor(month / 12); */
    const originalTotal = emiValue * N;
    const originalInterest = originalTotal - P;

    return {
      emi: emiValue,
      totalPayment: originalTotal,
      totalInterest: originalInterest,
      monthsWithPrepay: month,
      interestSaved: originalInterest - totalInt,
      schedule,
      scheduleWithPrepay,
    };
  }, [amount, rate, tenure, annualPrepayment]);

  return (
    <div style={styles.wrapper}>
      
      <div style={styles.leftPanel}>
      <div style={styles.container}>
      <h2 style={styles.heading}>Loan EMI Calculator</h2>
      

      {/* Loan Type Buttons */}
      <div style={styles.loanTypes}>
        {Object.keys(loanTypes).map((type) => (
          <button
            key={type}
            onClick={() => {
              setLoanType(type as keyof typeof loanTypes);
              setRate(loanTypes[type as keyof typeof loanTypes].rate);
            }}
            style={{
              ...styles.loanBtn,
              background: loanType === type ? "#1E3A8A" : "#E2E8F0",
              color: loanType === type ? "#fff" : "#000",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Inputs */}
  <div style={styles.formGrid}>

  {/* Row 1 */}
  <div style={styles.inputField}>
    <label style={styles.label}>Loan Amount (₹)</label>
    <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} style={styles.input}/>
  </div>
  <div style={styles.resultRow}>
    <span>Monthly EMI</span>
    <strong style={styles.resultValue}>₹ {emi.toFixed(0)}</strong>
  </div>

  {/* Row 2 */}
  <div style={styles.inputField}>
    <label style={styles.label}>Interest Rate (%)</label>
    <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} style={styles.input}/>
  </div>
  <div style={styles.resultRow}>
    <span>Total Payment</span>
    <strong style={styles.resultValue}>₹ {totalPayment.toFixed(0)}</strong>
  </div>

  {/* Row 3 */}
  <div style={styles.inputField}>
    <label style={styles.label}>Tenure (Years)</label>
    <input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} style={styles.input}/>
  </div>
  <div style={styles.resultRow}>
    <span>Total Interest</span>
    <strong style={styles.resultValue}>₹ {totalInterest.toFixed(0)}</strong>
  </div>

  {/* Row 4 */}
  <div style={styles.inputField}>
    <label style={styles.label}>Annual Part Payment (₹)</label>
    <input type="number" value={annualPrepayment} onChange={(e) => setAnnualPrepayment(Number(e.target.value))} style={styles.input}/>
  </div>
  <div style={styles.resultRow}>
    <span>Original Tenure</span>
    <strong style={styles.resultValue}>{tenure} years</strong>
  </div>

  {/* Extra result rows */}
  <div></div>
  <div style={styles.resultRow}>
    <span>New Tenure</span>
    <strong style={styles.resultValue}>{(monthsWithPrepay / 12).toFixed(1)} years</strong>
  </div>

  <div></div>
  <div style={styles.resultRow}>
    <span>Interest Saved</span>
    <strong style={{...styles.resultValue, color:"#059669"}}>₹ {interestSaved.toFixed(0)}</strong>
  </div>

 </div>
 <br/>
 <div style={styles.topNav}>
  <button onClick={() => navigate("/mf-calculator")} style={styles.navBtn}>
    Mutual Fund Calculator
  </button>

  <button onClick={() => navigate("/pf-calculator")} style={styles.navBtn}>
    Provident Fund Calculator
  </button>

  <button onClick={() => navigate("/articles")} style={styles.navBtn}>
    Articles
  </button>
</div>
 <div style={{ textAlign: "center", marginTop: "40px", fontSize: "14px" }}>
  <a href="/privacy">Privacy Policy</a> |{" "}
  <a href="/terms">Terms & Conditions</a> |{" "}
  <a href="/about">About Us</a>
  </div>  
 

      {/* Results */}
      </div>
     </div>
   <div style={styles.bottomRow}>    
    <div style={styles.rightPanel}>
  <div style={styles.chartBox}>
  <h3>Loan Balance Over Time</h3>
  <Line
    data={{
      labels: schedule.map((d) => d.month),
      datasets: [
        {
          label: "Without Prepayment",
          data: schedule.map((d) => d.balance),
          borderColor: "#EF4444",
          tension: 0.3,
        },
        {
          label: "With Prepayment",
          data: scheduleWithPrepay.map((d) => d.balance),
          borderColor: "#10B981",
          tension: 0.3,
        },
      ],
    }}
    options={{
    responsive: true,
    maintainAspectRatio: false,
  }}
  />
</div>
</div>
 </div> 
    </div>
    
  );
 }

 const styles = {
  container: {
  maxWidth: "1200px",
  margin: "0 auto",
 },
 wrapper: {
  minHeight: "100vh",
  width: "100%",
  padding: "20px",
  background: "linear-gradient(135deg, #1E3A8A, #0F172A)",
  display: "flex",
 /* justifyContent: "flex-start", */
  gap: "25px", 
  flexWrap: "wrap" as const,
 },

  loanTypes: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "10px",
    justifyContent: "center" as const,
   /* marginBottom: "20px", */
  },
  loanBtn: {
    padding: "8px 14px",
    borderRadius: "20px",
    border: "1px solid #CBD5E1",
    cursor: "pointer",
  },
 /*field: {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "6px",
 }, */

label: {
  width: "55%",
  fontWeight: 500,
},
 /*input: { width: "45%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }, */
 
 input: {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
},
 /* emi: { fontSize: "28px", fontWeight: "bold", color: "#10B981" }, */
 emi: {
  fontSize: "clamp(22px, 5vw, 28px)",
  fontWeight: "bold",
  color: "#10B981",
},
  

grid: {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "30px",
  marginTop: "30px",
},

inputPanel: {
  background: "#ffffff",
  color: "#000",
  padding: "20px",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "22px",   // 👈 THIS CREATES ONE-LINE SPACE
},
resultCard: {
  background: "#ffffff",
  color: "#000",
  padding: "25px",
  borderRadius: "12px",
  textAlign: "center" as const,
},

/*heading: {
  textAlign: "center" as const,
  fontSize: "32px",
  marginBottom: "20px",
}, */

heading: {
  fontSize: "clamp(20px, 4vw, 32px)", // scales automatically
  textAlign: "center" as const,
},
smallText: {
  fontSize: "13px",
  color: "#334155",
},
bottomRow: {
  marginTop: "30px",
  display: "flex",
  justifyContent: "flex-end", // 👉 pushes content to RIGHT
},

/*rightPanel: {
  flex: "0 0 55%", 
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "flex-end", // 👈 pushes chart to bottom
}, */
rightPanel: {
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",  // move chart to right
  alignItems: "flex-end",  
  flexDirection: "column" as const,    // move chart to bottom
},

/*chartBox: {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "14px",
}, */

chartBox: {
  background: "#fff",
  padding: "15px",
  borderRadius: "14px",
  height: "300px",
},


/*leftPanel: {
  flex: "0 10% 45%",
  background: "#ffffff",
  padding: "25px",
  borderRadius: "14px",
  color: "#0F172A",
  display: "flex",
  flexDirection: "column" as const,
  gap: "12px",
  overflowY: "auto" as const,
}, */

leftPanel: {
  flex: "1 1 500px",   // grow, shrink, min width
  background: "#ffffff",
  padding: "20px",
  borderRadius: "14px",
},

formGrid: {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: "40px",
  rowGap: "14px",
  marginTop: "25px",
},
resultLabel: {
  width: "55%",   // 👈 was too big before
  textAlign: "right" as const,
  color: "#334155",
},

resultValue: {
  fontWeight: "bold",
},
resultRow: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center" as const,
  borderBottom: "1px solid #E2E8F0",
  paddingBottom: "6px",
},
resultBig: {
  fontSize: "26px",
  fontWeight: "bold",
  color: "#10B981",
},
resultPanel: {
  background: "#F8FAFC",
  padding: "18px",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  justifyContent: "center",
},
column: {
  display: "flex",
  flexDirection: "column" as const,
  gap: "12px",
},
inputField: {
  display: "flex",
  alignItems: "center" as const,
  justifyContent: "space-between" as const,
},
topNav: {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  marginBottom: "15px",
},

navBtn: {
  padding: "8px 14px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "#0F172A",
  color: "#fff",
  fontWeight: 500,
},



};
