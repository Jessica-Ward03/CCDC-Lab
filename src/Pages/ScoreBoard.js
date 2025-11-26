
import "./Scoreboard.css";


export default function Scoreboard() {
  {/*All Hardcoded vars will need to be changed*/}
  var Score = 0
  var serviceOneUp = true;
  var serviceTwoUp = false;
  var serviceThreeUp = true;
  var serviceFourUp = true;
  var serviceFiveUp = true;
  var serviceSixUp = true;
  var serviceSevenUp = true;
  var serviceOneTime = 120;
  var serviceTwoTime = 20;
  var serviceThreeTime = 120;
  var serviceFourTime = 120;
  var serviceFiveTime = 120;
  var serviceSixTime = 120;
  var serviceSevenTime = 60;
  var upServices = 0;
  var services = [serviceOneUp, serviceTwoUp,serviceThreeUp, serviceFourUp,serviceFiveUp, serviceSixUp, serviceSevenUp];
  var servicesTimes = [serviceOneTime, serviceTwoTime,serviceThreeTime, serviceFourTime,serviceFiveTime, serviceSixTime, serviceSevenTime];
  var totalTime = 120;


  function getScore() {
    //placeholder until we add the actual scoreboard
    var x = 19880;
    return x;
  }
  function getScoreImage(serviceUp) {
    //placeholder for getting up services
    if (serviceUp == true){
      return "./GreenArrow.png"
    }else{
      return "./RedArrow.png"
    }
  }
  function getScoreImageAlt(serviceUp) {
    //placeholder for getting up services
    if (serviceUp == true){
      return "Green Arrow"
    }else{
      return "Red Arrow"
    }
  }
  function getUpServices(services, upServices) {
    //placeholder for getting up services
    for(var i = 0; i < services.length; i++){
      var service = services[i];
      if (service == true){
        upServices++;
      }
    }
    return upServices
  }
  function getUpTimes(service, totalTime) {
    return Math.round((service / totalTime)* 100);
  }
  


  return (
    <>
  <h1>Scoreboard</h1>

        <div>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            {/*ToDo find out all service display names*/}
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
    
  <div>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            {/*ToDo find out all service display names*/}
            <th>ServiceOne</th>
            <th>ServiceTwo</th>
            <th>ServiceThree</th>
            <th>ServiceFour</th>
            <th>ServiceFive</th>
            <th>ServiceSix</th>
            <th>ServiceSeven</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>IUS</td>
            <td>
              <img src={getScoreImage(serviceOneUp)} alt={getScoreImageAlt(serviceOneUp)} width="80"/>
            </td>
            <td>
              <img src={getScoreImage(serviceTwoUp)} alt={getScoreImageAlt(serviceTwoUp)} width="80"/>
            </td>
            <td>
              <img src={getScoreImage(serviceThreeUp)} alt={getScoreImageAlt(serviceThreeUp)} width="80"/>
            </td>
            <td>
              <img src={getScoreImage(serviceFourUp)} alt={getScoreImageAlt(serviceFourUp)} width="80"/>
            </td>
            <td>
              <img src={getScoreImage(serviceFiveUp)} alt={getScoreImageAlt(serviceFiveUp)} width="80"/>
            </td>
            <td>
              <img src={getScoreImage(serviceSixUp)} alt={getScoreImageAlt(serviceSixUp)} width="80"/>
            </td>
            <td>
              <img src={getScoreImage(serviceSevenUp)} alt={getScoreImageAlt(serviceSevenUp)} width="80"/>
            </td>
          </tr>
        </tbody>
      </table>
      </div>

    <div>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            {/*ToDo find out all service display names*/}
            <th>ServiceOne</th>
            <th>ServiceTwo</th>
            <th>ServiceThree</th>
            <th>ServiceFour</th>
            <th>ServiceFive</th>
            <th>ServiceSix</th>
            <th>ServiceSeven</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>IUS</td>
            <td>{getUpTimes(servicesTimes[0], totalTime)+ "%"}</td>
            <td>{getUpTimes(servicesTimes[1], totalTime)+ "%"}</td>
            <td>{getUpTimes(servicesTimes[2], totalTime)+ "%"}</td>
            <td>{getUpTimes(servicesTimes[3], totalTime)+ "%"}</td>
            <td>{getUpTimes(servicesTimes[4], totalTime)+ "%"}</td>
            <td>{getUpTimes(servicesTimes[5], totalTime)+ "%"}</td>
            <td>{getUpTimes(servicesTimes[6], totalTime)+ "%"}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
}
