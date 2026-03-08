import { Link } from "react-router-dom";

export default function Articles() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Articles</h1>

        <ul style={styles.list}>
          <li style={styles.listItem}>
            <Link to="/articles/home-loan-prepayment" style={styles.link}>
              Home Loan Prepayment: Finish Your Loan Early
            </Link>
          </li>

          <li style={styles.listItem}>
            <Link to="/articles/EPF-Contribution" style={styles.link}>
              Is Employee PF Contribution Taxable in New Regime?
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    padding: "40px 20px",
  },

  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  heading: {
    textAlign: "center" as const,
    marginBottom: "40px",
    color: "#1e3a8a",
  },

  list: {
    listStyleType: "disc",
    paddingLeft: "10px",
    maxWidth: "500px",
  },

  listItem: {
    marginBottom: "15px",
    fontSize: "18px",
  },

  link: {
    textDecoration: "none",
    color: "#0f172a",
  },
};