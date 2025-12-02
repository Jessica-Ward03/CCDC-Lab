import { useState } from "react";

export default function Injects() {
    const injects = [
        { id: 1, name: "Inject 1", file: "/TestInjects/Drop_Flag_Inject.pdf" },
        { id: 2, name: "Inject 2", file: "/TestInjects/EVAL04T_-_External_Perimeter_Assessment_z1SC0e5.pdf" },
        { id: 3, name: "Inject 3", file: "/TestInjects/Exporting_Data__Log_Files_for_Inject_Reponses_ettlk1l.pdf" }
    ];

    const [allInjects, setInjects] = useState([]); //Holds injects added to the page
    const [submitted, setSubmitted] = useState({}); //Checks whether inject has been submitted

    function addInjects() { //Call this to add more injects
        if (allInjects.length < injects.length) {
            setInjects([...allInjects, injects[allInjects.length]]);
        }
    }

    function handleUpload(injectId, event) { //This is how users upload
        const file = event.target.files[0];
        if (file) {
            setSubmitted({
                ...submitted,
                [injectId]: true
            });
        }
    }

    return (
        <div style={{ alignItems: "center", textAlign: "center" }}>
            <h1>Injects</h1>
            <button onClick={addInjects}>Add Injects</button>
            <div //This thing is the blue box that contains the injects
                style={{margin: "0 auto", alignItems: "center", width: "25%", minHeight: "50px",
                    background: "lightblue", border: "2px solid blue", padding: "20px", borderRadius: "8px"
                }}
            >
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {allInjects.map((inj) => ( //Map container that holds injects on the screen
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
                            <span>{submitted[inj.id] ? "Submitted" : "Not Submitted"}</span>
                            <input type="file" onChange={(e) => handleUpload(inj.id, e)} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
