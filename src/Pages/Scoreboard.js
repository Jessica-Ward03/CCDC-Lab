
import "./Scoreboard.css";


export default function Scoreboard() {
  /*TODO All Hardcoded vars will need to be changed*/
  var Score = 0
  var service_ecomhttp_Up = true;
  var service_mailpop3_Up = false;
  var service_2022ftp_Up = true;
  var service_addns_Up = true;
  var service_splunkhttp_Up = true;
  var service_2019http_Up = true;
  var service_mailsmtp_Up = true;
  var service_ecomhttp_Time = 120;
  var service_mailpop3_Time = 20;
  var service_2022ftp_Time = 120;
  var service_addns_Time = 120;
  var service_splunkhttp_Time = 120;
  var service_2019http_Time = 120;
  var service_mailsmtp_Time = 60;
  var upServices = 0;
  var services = [service_ecomhttp_Up, service_mailpop3_Up,service_2022ftp_Up, service_addns_Up,service_splunkhttp_Up, service_2019http_Up, service_mailsmtp_Up];
  var servicesTimes = [service_ecomhttp_Time, service_mailpop3_Time,service_2022ftp_Time, service_addns_Time,service_splunkhttp_Time, service_2019http_Time, service_mailsmtp_Time];
  
  /*TODO update to actually cal. total time running*/
  var totalTime = 120;


  function getScore() {
    /*TODO update to actually cal. score*/
    var x = 19880;
    return x;
  }

  /*Expects the serviceUp to be set t true or false to see if service is currently up
    Returns the image for if service is up or down.
  */
  function getScoreImage(serviceUp) {
    if (serviceUp === true){
      return "./GreenArrow.png"
    }else{
      return "./RedArrow.png"
    }
  }

  /*Expects the serviceUp to be set to true or false to see if service is currently up
    Returns the image alt for if service is up or down.
  */
  function getScoreImageAlt(serviceUp) {
    if (serviceUp === true){
      return "Green Arrow"
    }else{
      return "Red Arrow"
    }
  }

  /*Expects the services to have all services listed and upServices to be 0
    Returns the number of services that are currently up.
  */
  function getUpServices(services, upServices) {
    for(var i = 0; i < services.length; i++){
      var service = services[i];
      if (service === true){
        upServices++;
      }
    }
    return upServices
  }

  /*Expects the services times amd totalTime to be set 
    Returns the percent of time the service has been up.
  */
  function getUpTimes(service, totalTime) {
    return Math.round((service / totalTime)* 100);
  }
  


  return (
    <div className="scoreboardPage">
    <h1>Scoreboard</h1>

        <div>
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

  <div>
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

    <div>
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
  </div>
  );
}
