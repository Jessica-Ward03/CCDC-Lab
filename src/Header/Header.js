import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.button}>Home</Link>
      <Link to="/Injects" style={styles.button}>Injects</Link>
      <Link to="/Scoreboard" style={styles.button}>Scoreboard</Link>
    </header>
  );
}

//Header buttons
const styles = {
  header: {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#f0f0f0",
  },
  button: {
    padding: "0.5rem 1rem",
    background: "blue",
    color: "white",
    borderRadius: "6px",
    textDecoration: "none",
  }
};