import {useEffect, useState} from "react";
import { useTimer } from "../Time/TimerContext.js";

export default function Injects() {
    const {secondsLeft, isRunning } = useTimer();
    const injects = [
        { id: 1, name: "Inject 1", file: "/TestInjects/Drop_Flag_Inject.pdf" },
        { id: 2, name: "Inject 2", file: "/TestInjects/EVAL04T_-_External_Perimeter_Assessment_z1SC0e5.pdf" },
        { id: 3, name: "Inject 3", file: "/TestInjects/Exporting_Data__Log_Files_for_Inject_Reponses_ettlk1l.pdf" }
    ];

    const [allInjects, setInjects] = useState([]); //Holds injects added to the page
    const [submitted, setSubmitted] = useState({}); //Checks whether inject has been completed
    const [injectDeadline, setInjectDeadline] = useState({});

    useEffect(() => { //Saves page data.
        const savedInjects = JSON.parse(localStorage.getItem("savedInjectsIds"));
        const saveSubmitted = JSON.parse(localStorage.getItem("savedSubmitted"));
        const savedDeadline = JSON.parse(localStorage.getItem("injectDeadline"));
        if (savedInjects) setInjects(savedInjects);
        if (saveSubmitted) setSubmitted(saveSubmitted);
        if (savedDeadline) setInjectDeadline(savedDeadline);
    }, []);

    useEffect(() => { //Uses reset button to clear injects
        const saved = JSON.parse(localStorage.getItem("labTimer"));
        if (!isRunning && saved?.endTime === 0 && secondsLeft === 600){
            setInjects([]);
            setSubmitted({});
            setInjectDeadline({});
            localStorage.clear();
            window.location.reload();
        }
    },[secondsLeft, isRunning]);

    function addInjects() { //Call this to add more injects
        if (allInjects.length < injects.length) {
            const nextInject = injects[allInjects.length];
            const injectList = [...allInjects, nextInject];
            setInjects(injectList);
            localStorage.setItem("savedInjectsIds", JSON.stringify(injectList));
            const newDeadline = {
                ...injectDeadline,
                [nextInject.id]: secondsLeft - 10
            };
            setInjectDeadline(newDeadline);
            localStorage.setItem("injectDeadline", JSON.stringify(newDeadline));
        }
    }

    useEffect(() => { //This function controls the timing of when injects are deployed
        if (isRunning && secondsLeft > 0 && secondsLeft % 10 === 0) { //Current set to deploy every 10 seconds for testing.
            addInjects();
        }
    }, [secondsLeft]);

    function handleCheckbox(injectId, checked) { //This is how users check off a task
        const expired = secondsLeft <=  injectDeadline[injectId];
        if (expired) return;
            const newSubmission = {
                ...submitted,
                [injectId]: checked
            };
            setSubmitted(newSubmission);
            localStorage.setItem("savedSubmitted", JSON.stringify(newSubmission));
    }

    return (
        <div style={{ alignItems: "center", textAlign: "center" }}>
            <img 
            src="Header.png" alt="IUS CCDC Banner" class="center">
            </img>
            <h1>Injects</h1>
            <button onClick={addInjects}>Add Injects</button>
            <div //This thing is the blue box that contains the injects
                style={{margin: "0 auto", alignItems: "center", width: "25%", minHeight: "50px",
                    background: "lightblue", border: "2px solid blue", padding: "20px", borderRadius: "8px"
                }}
            >
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {allInjects.map((inj) => { //Map container that holds injects on the screen
                        const expired = secondsLeft <= injectDeadline[inj.id];
                        return (
                        <li
                            key={inj.id}
                            style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px"
                            }}
                        >
              <span
                  onClick={() => window.open(inj.file, "_blank")}
                  style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }}
              >
                {inj.name}
              </span>
                            <span style={{marginRight: "10px"}}>
                            {expired ? "Time Up" : `Time Left: ${injectDeadline[inj.id] - secondsLeft}s`}
                                </span>

                                <input type = "checkbox"
                                checked={!!submitted[inj.id]}
                                  disabled={expired}
                                  style={{opacity: expired ?  0.4 : 1}}
                                  onChange={(e)=> handleCheckbox(inj.id, e.target.checked)}
                                  />
                        </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
