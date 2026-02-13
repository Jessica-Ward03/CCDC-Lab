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
            <h4>How To Use?</h4>
            <p>ToDo with images for examples?</p>

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