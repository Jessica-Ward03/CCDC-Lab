import "./Home.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTimer } from "../Time/TimerContext";

const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ $active }) =>
    $active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;

const types = ["First Time Here", "How To Use", "Ready To Enter The Competition"]; 

function TabGroup({ setTutorialMode, startTimer }) {
  const [active, setActive] = useState(types[0]);
  function renderContent(tab) {
    switch (tab) {
      case "First Time Here":
        return (
          <div className="homePage">
            <h3>First Time Here</h3>
            <h4>What is CCDC?</h4>
            <p>
              Its a cyber security competition where students work to manage and protect an existing network.
            </p>
            <a href="https://www.nationalccdc.org/about.html" target="_blank" rel="noopener noreferrer">
              Find out more about CCDC here! 
            </a>
            <h4>What is this lab?</h4>
            <p>
              This is a lab that models the CCDC lab. This is so that students can learn how to manage and protect a network. It also allows CCDC teams to practice for the CCDC.
            </p>
            <p>
              This lab was created by Jonah Facer, Andrew Nale, John Aaron, and Jessica Ward.
            </p>
            <a href="https://github.com/Jessica-Ward03/CCDC-Lab" target="_blank" rel="noopener noreferrer">
              Visit our repo here!
            </a>
            <p>
              If you are reading this section we recommend starting with our tutorial mode.
            </p>
          </div>
        );

      case "How To Use":
        return (
          <div className="homePage">
            <h3>How To Use?</h3>
            <ol>
              <li>Click on the "Competition Mode" or "Tutorial Mode".</li>
              <li>This will bring you to the inject page and start the timer.</li>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <img 
                  src="HowTo1.png" alt="InjectPage" width="40%" margin-left="300px">
                </img>
              </div>
              <p style={{ marginLeft: "200px" }}>To answer the inject click on the link to see it. Once your team completes the inject check the box.</p>
              <li>To see the systems and how your score is click on the Scoreboard tab.</li>
              <p style={{ marginLeft: "200px" }}>You may see something like the images below.</p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <img src="HowTo2.png" alt="Scoreboard" width="30%" margin-left="300px"/>
                <img src="HowTo3.png" alt="Scoreboard" width="30%" margin-left="300px"/>
              </div>
              <p style={{ marginLeft: "200px" }}>The first box shows the services up and your teams score. The second box shows which services are up. And the last box shows the services percent up times.</p>
              <li>Score points by keeping services up.</li>
              <li>Now that you understand these things, you are ready to enter the competition.</li>
                <p style={{ marginLeft: "200px" }}> Good luck!</p>
            </ol>

            <div className="homePageSubButton">
              <Link to="./Injects">
                <button onClick={() => {setTutorialMode(1); startTimer(7200);}}>Tutorial Mode</button>
              </Link>
              <Link to="./Injects">
                <button onClick={() => {setTutorialMode(2); startTimer(600);}}>Competition Mode</button>
              </Link>
            </div>
          </div>
        );

      case "Ready To Enter The Competition":
        return (
          <div className="homePage">
            <h3>Ready To Enter The Competition</h3>
            <div className="noCentering">
              <p>We recommend double checking{" "} 
                  <a href="https://github.com/Jessica-Ward03/CCDC-Lab" target="_blank" rel="noopener noreferrer">
                     here
                   </a>
               {" "}for updates
              </p>
            </div>
            <div className="homePageSubButton">
                <Link to="./Injects" state={{ currentMode: 1 }}>
                    <button onClick={() => {setTutorialMode(1); startTimer(7200);}}>
                        Tutorial Mode
                    </button>
                </Link>
                <Link to="./Injects" state={{ currentMode: 2 }}>
                    <button onClick={() => {setTutorialMode(2); startTimer(28800);}}>
                        Competition Mode
                    </button>
                </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="homePage">
      <ButtonGroup>
        {types.map((type) => (
          <Tab
            key={type}
            $active={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}
      </ButtonGroup>

      <div>
        {renderContent(active)}
      </div>
    </div>
  );
}


export default function Home() {
  //0 for not defined 1 for tutorial mode 2 for non tutorial mode
      const [TutorialMode, setTutorialMode] = useState(0);
      const {startTimer} = useTimer();
  return(
  //Top of the Home page
  <div className="homePage">
    <img 
    src="Header.png" alt="IUS CCDC Banner" class="center">
    </img>
    <h1>IUS CCDC Lab</h1>
    <h2>Welcome to the IUS CCDC Lab </h2>
     <TabGroup setTutorialMode={setTutorialMode} startTimer={startTimer}/>
  </div>
  )
 
}