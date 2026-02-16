import {useEffect, useState} from "react";
import { useLocation} from "react-router-dom";
import "./Injects.css";

const API = "http://localhost:3001";

const formatTime = (seconds) =>{
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600)/60);
    const s = seconds % 60;
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function importAll(r) { //This function processes inject pdfs and names them inject 1..2..3
    return r.keys().map((file, index) => ({
        id: index + 1,
        name: `Inject ${index + 1}`,
        file: r(file)
    }));
}

const tutorialInjects = importAll( //Pulls injects for tut. mode
    require.context("../TutorialMode", false, /\.pdf$/)
);

const competitionInjects = importAll( //Pulls injects for comp. mode
    require.context("../CompetitionMode", false, /\.pdf$/)
);

export default function Injects() {
    const location = useLocation();
    const currentMode = location.state?.currentMode || 1; //Determines difficulty mode with 1 as tut. 2 as comp.
    const activeInjects = currentMode === 1 ? tutorialInjects : competitionInjects; //Selects what folder it pulls injects from.
    const difficultyTimeSettings = {
        1: { injectAddTime: 600, deadline: 1800}, //Tutorial Mode
        2: { injectAddTime: 5, deadline: 15} // Competition Mode
    };
    const currentTimeSettings = difficultyTimeSettings[currentMode]; //Pulls timing settings for adding injects and deadlines
    const [displayedInjects, setInjects] = useState([]); //Holds injects added to the page
    const [submittedInjects, setSubmittedInjects] = useState({}); //Checks whether inject has been completed
    const [injectDeadline, setInjectDeadline] = useState({});
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => { //Loads page data from server on mount, then polls every 3 seconds for updates
        function loadState() {
            fetch(`${API}/api/injects/state`)
                .then(res => res.json())
                .then(data => {
                    setInjects(data.savedInjectsIds);
                    setSubmittedInjects(data.savedSubmitted);
                    setInjectDeadline(data.injectDeadline);
                })
                .catch(err => console.error("Failed to load inject state:", err));
            fetch(`${API}/api/timer/state`)
                .then(res => res.json())
                .then(data => {
                    setIsRunning(data.running);
                    if (data.running && data.endTime) {
                        const remaining = Math.max(Math.ceil((data.endTime - Date.now()) / 1000), 0);
                        setSecondsLeft(remaining);
                    } else {
                        setSecondsLeft(data.remainingOnPause ?? 600);
                    }
                })
                .catch(err => console.error("Failed to load timer state:", err));
        }
        loadState();
        const poll = setInterval(loadState, 1000);
        return () => clearInterval(poll);
    }, []);

    useEffect(() => {
        if (!isRunning || secondsLeft <= 0) return;
        if (secondsLeft % currentTimeSettings.injectAddTime !== 0) return;
        const current = displayedInjects;
        if (current.length >= activeInjects.length) return;

        const nextInject = activeInjects[current.length];
        const deadline = secondsLeft - currentTimeSettings.deadline;
        fetch(`${API}/api/injects/add`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inject: nextInject, deadline })
        }).catch(err => console.error("Failed to add inject:", err));
    }, [secondsLeft, isRunning]);

    function handleCheckbox(injectId, checked) { //This is how users check off a task
        const expired = secondsLeft <= injectDeadline[injectId];
        if (expired) return;
        fetch(`${API}/api/injects/submit`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ injectId, checked })
        }).catch(err => console.error("Failed to submit inject:", err));
    }

    return (
        <div className = "injectsContainer">
            <img
                src="Header.png" alt="IUS CCDC Banner" className="center">
            </img>
            <h1 className= "topHeader">Inject List
            </h1>
            <div className="injectsBox">
                <ul className="injectsList">
                    <li className="injectHeader">
                        <span>Name</span>
                        <span>Time Left</span>
                        <span>Completion</span>
                    </li>
                    {displayedInjects.map((inj) => {
                        const expired = secondsLeft <= injectDeadline[inj.id];
                        let rowClass = "injectRow";
                        if (expired){
                            rowClass += submittedInjects[inj.id] ? " injectComplete" : " injectFailed";
                        }
                        return (
                            <li key={inj.id} className={rowClass}>
                                <span
                                    onClick={() => window.open(inj.file, "_blank")}
                                    className="injectLink"
                                >
                                    {inj.name}
                                </span>
                                <span className="injectTimer">
                                    {expired ? "Time Up" : `${formatTime(secondsLeft - injectDeadline[inj.id])}`}
                                </span>
                                <input
                                    type="checkbox"
                                    className="injectCheckbox"
                                    checked={!!submittedInjects[inj.id]}
                                    disabled={expired}
                                    onChange={(e) => handleCheckbox(inj.id, e.target.checked)}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}