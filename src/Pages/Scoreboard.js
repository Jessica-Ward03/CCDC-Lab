
import "./Scoreboard.css";
import React, { useState, useEffect } from "react";
import Timer from "../Time/Timer";
import { useTimer } from "../Time/TimerContext";


export default function Scoreboard({servicesData}) {
  //TODO All Hardcoded vars will need to be changed
  const { secondsLeft } = useTimer();
  
  //TODO update to pass in the time competition was started with
  const totalTimeCompetition = 600;


  var Score = 0

  //TODO pass in the actual if up or down might need to do something like with the timer
 
  var service_ecomhttp_Up = servicesData?.["ecom-http"]?.alive || false;

  var service_mailpop3_Up = servicesData?.["mail-pop3"]?.alive || false;
var service_2022ftp_Up = servicesData?.["2022-ftp"]?.alive || false;
var service_addns_Up = servicesData?.["ad-dns"]?.alive || false;
var service_splunkhttp_Up = servicesData?.["splunk-http"]?.alive || false;
var service_2019http_Up = servicesData?.["2019-http"]?.alive || false;
var service_mailsmtp_Up = servicesData?.["mail-smtp"]?.alive || false;
/*

  var service_mailpop3_Up = servicesData?.["mail-pop3"]?.alive || false;
var service_2022ftp_Up = servicesData?.["2022-ftp"]?.alive || false;
var service_addns_Up = servicesData?.["ad-dns"]?.alive || false;
var service_splunkhttp_Up = servicesData?.["splunk-http"]?.alive || false;
var service_2019http_Up = servicesData?.["2019-http"]?.alive || false;
var service_mailsmtp_Up = servicesData?.["mail-smtp"]?.alive || false;
  */
 
//TODO pass in the actual up times this will fix the odd showing percentages
  var service_ecomhttp_Time = servicesData?.["ecom-http"]?.uptimePercent || 0;
  var service_mailpop3_Time = servicesData?.["mail-pop3"]?.uptimePercent || 0;
var service_2022ftp_Time = servicesData?.["2022-ftp"]?.uptimePercent || 0;
var service_addns_Time = servicesData?.["ad-dns"]?.uptimePercent || 0;
var service_splunkhttp_Time = servicesData?.["splunk-http"]?.uptimePercent || 0;
var service_2019http_Time = servicesData?.["2019-http"]?.uptimePercent || 0;
var service_mailsmtp_Time = servicesData?.["mail-smtp"]?.uptimePercent || 0;
  var upServices = 0;
  var services = [service_ecomhttp_Up, service_mailpop3_Up,service_2022ftp_Up, service_addns_Up,service_splunkhttp_Up, service_2019http_Up, service_mailsmtp_Up];
  var servicesTimes = [service_ecomhttp_Time, service_mailpop3_Time,service_2022ftp_Time, service_addns_Time,service_splunkhttp_Time, service_2019http_Time, service_mailsmtp_Time];
  

  const elapsed = totalTimeCompetition - secondsLeft;

  //Shows Time as 00:00:00
  function formatTime(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;

    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  function getScore() {
    //TODO update to actually cal. score
    const pointsPerService = 1000;
    return getUpServices(services, 0) * pointsPerService;;
  }

  //Expects the serviceUp to be set t true or false to see if service is currently up
  //Returns the image for if service is up or down.
  function getScoreImage(serviceUp) {
    if (serviceUp === true){
      return "./GreenArrow.png"
    }else{
      return "./RedArrow.png"
    }
  }

  //Expects the serviceUp to be set to true or false to see if service is currently up
  //Returns the image alt for if service is up or down.

  function getScoreImageAlt(serviceUp) {
    if (serviceUp === true){
      return "Green Arrow"
    }else{
      return "Red Arrow"
    }
  }

  //Expects the services to have all services listed and upServices to be 0
  //Returns the number of services that are currently up.
  
  function getUpServices(services, upServices) {
    for(var i = 0; i < services.length; i++){
      var service = services[i];
      if (service === true){
        upServices++;
      }
    }
    return upServices
  }

  //Expects the services times amd totalTime to be set 
  //Returns the percent of time the service has been up.
  
  function getUpTimes(percent) {
    return percent || 0;;
  }
  


  return (
    <div className="scoreboardPage">
      <img 
      src="Header.png" alt="IUS CCDC Banner" class="center">
      </img>
      <h1>Scoreboard</h1>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Services Up</th>
            <th>Services Down</th>
            <th>Total Points</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>IUS</td>
            <td>{getUpServices(services, upServices)}</td>
            <td>{services.length - getUpServices(services, upServices)}</td>
            <td>{getScore()}</td>
            </tr>
        </tbody>
      </table>
    </div>

  <div style={{ display: 'flex', justifyContent: 'center'}}>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>ecom-http</th>
            <th>mail-pop3</th>
            <th>2022-ftp</th>
            <th>ad-dns</th>
            <th>splunk-http</th>
            <th>2019-http</th>
            <th>mail-smtp</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>IUS</td>
            <td>
              <img src={getScoreImage(service_ecomhttp_Up)} alt={getScoreImageAlt(service_ecomhttp_Up)} width="80"/>
            </td>
            <td>
              <img src={getScoreImage(service_mailpop3_Up)} alt={getScoreImageAlt(service_mailpop3_Up)} width="80"/>
            </td>
            <td>
              <img src={getScoreImage(service_2022ftp_Up)} alt={getScoreImageAlt(service_2022ftp_Up)} width="80"/>
            </td>
            <td>
              <img src={getScoreImage(service_addns_Up)} alt={getScoreImageAlt(service_addns_Up)} width="80"/>
            </td>
            <td>
              <img src={getScoreImage(service_splunkhttp_Up)} alt={getScoreImageAlt(service_splunkhttp_Up)} width="80"/>
            </td>
            <td>
              <img src={getScoreImage(service_2019http_Up)} alt={getScoreImageAlt(service_2019http_Up)} width="80"/>
            </td>
            <td>
              <img src={getScoreImage(service_mailsmtp_Up)} alt={getScoreImageAlt(service_mailsmtp_Up)} width="80"/>
            </td>
          </tr>
        </tbody>
      </table>
      </div>

    <div style={{ display: 'flex', justifyContent: 'center'}}>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>ecom-http</th>
            <th>mail-pop3</th>
            <th>2022-ftp</th>
            <th>ad-dns</th>
            <th>splunk-http</th>
            <th>2019-http</th>
            <th>mail-smtp</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>IUS</td>
            <td>{getUpTimes(servicesTimes[0] + "%")}</td>
            <td>{getUpTimes(servicesTimes[1] + "%")}</td>
            <td>{getUpTimes(servicesTimes[2] + "%")}</td>
            <td>{getUpTimes(servicesTimes[3] + "%")}</td>
            <td>{getUpTimes(servicesTimes[4] + "%")}</td>
            <td>{getUpTimes(servicesTimes[5] + "%")}</td>
            <td>{getUpTimes(servicesTimes[6] + "%")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  );
}
