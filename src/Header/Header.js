import { Link } from "react-router-dom";
import Timer from "../Time/Timer";
import { useTimer } from "../Time/TimerContext";

export default function Header() {
  const { resetTimer } = useTimer();
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.button}>Home</Link>
      <Link to="/Injects" style={styles.button}>Injects</Link>
      <Link to="/Scoreboard" style={styles.button}>Scoreboard</Link>
      <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
        <Timer />
      <button
          onClick={resetTimer} style={{
            marginLeft: "10px",
            padding: "5px 10px",
            fontSize: "16px",
            cursor: "pointer",
            padding: "0.5rem 1rem",
            background: "crimson",
            fontSize: "18px",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            border: "none"
          }}>
            {/*TODO Currently resets the timer will need to have it also reset injects and machines*/}
          Reset Competition
        </button>
      </div>
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
    background: "crimson",
    fontSize: "18px",
    color: "white",
    borderRadius: "6px",
    textDecoration: "none",
  }
};