import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      eventName:'',
      futureDate: '',
      futureTime: '',
      timeYear:'',
      timeDay:'',
      timeHour:'',
      timeMin:'',
      timeSec:'',
    }
    this.handleEventName=this.handleEventName.bind(this);
    this.handleDate=this.handleDate.bind(this);
    this.handleTime=this.handleTime.bind(this);
    this.handleButton=this.handleButton.bind(this);
    this.handleSave=this.handleSave.bind(this);
    this.handleRestart=this.handleRestart.bind(this);
  }

  componentDidMount(){
    this.setState({
    eventName:sessionStorage.getItem('eventName') ||'',
    futureDate: sessionStorage.getItem('futureDate')||'',
    futureTime: sessionStorage.getItem('futureTime')||''})
  }

  handleEventName(e){
    this.setState({eventName: e.currentTarget.value})
  }

  handleDate(e){
    this.setState({futureDate: e.currentTarget.value})
  }

  handleTime(e){
    this.setState({futureTime: e.currentTarget.value});
  }

  handleButton(){
    if (this.state.eventName ==='' ||this.state.futureDate===''){
      document.getElementById("warn").style.display='block';
      setTimeout(function(){document.getElementById("warn").style.display='none'}, 2000);
    }
    else{
      if(this.state.futureTime === ''){
      var eventTimeStr = this.state.futureDate+"T00:00";
      }
      else{
       eventTimeStr = this.state.futureDate+"T"+this.state.futureTime;
      }
      let eventTime = (new Date(eventTimeStr)).getTime();
      this.intervalID = setInterval(()=>{
      let currentTime= (new Date()).getTime();
      if (eventTime>=currentTime){
        let count = eventTime - currentTime;
        let year = Math.floor(count/31536000000);
        let day = Math.floor((count-year*31536000000)/86400000);
        let hour = Math.floor((count-year*31536000000-day*86400000)/3600000);
        let min = Math.floor((count-year*31536000000-day*86400000 - hour*3600000)/60000);
        let sec = Math.floor((count-year*31536000000-day*86400000 - hour*3600000 - min*60000)/1000);
        this.setState({timeYear:year,timeDay:day,timeHour:hour,timeMin:min,timeSec:sec})
        }
      },1000)
      document.getElementById("Countdown-container").style.display = "flex";
      document.getElementById("appHeader").style.display = "none";
      document.getElementById("inputContainer").style.display = "none";
      }
    }

  handleSave(){
    sessionStorage.setItem('eventName', this.state.eventName);
    sessionStorage.setItem('futureDate', this.state.futureDate);
    sessionStorage.setItem('futureTime', this.state.futureTime);
  }

  handleRestart(){
    this.setState({
      eventName:'',
      futureDate: '',
      futureTime: '',
      timeYear:'',
      timeDay:'',
      timeHour:'',
      timeMin:'',
      timeSec:'',});
    clearInterval(this.intervalID);
    document.getElementById("Countdown-container").style.display = "none";
    document.getElementById("appHeader").style.display = "block";
    document.getElementById("inputContainer").style.display = "flex";
  }

  render(){
    return (
    <div className="App">
      <div id="signature">Written by Dwan W.</div>
      <div className="App-container">
      <header className="App-header" id="appHeader">
      Event CountDown Timer
      </header>

      <div id="inputContainer">
        <div className="inputDescription">
          <div>1.Enter your Event Name:</div>
          <div>2.Select the Date of your Event:</div>
          <div>3.Select a Time for the Event(Optional):</div>
        </div>
        <div className="inputField">
          <div><input  type="text" name="event" value={this.state.eventName} onChange={this.handleEventName}></input></div>
          <div><input  type="date" name="date" value={this.state.futureDate} onChange={this.handleDate}></input></div>
          <div><input  type="time" name="time" value={this.state.futureTime} onChange={this.handleTime}></input></div>
        </div>
        <div className="break"></div>
        <button id="start" onClick={this.handleButton}>Start Timer</button>
         <button id="save" onClick={this.handleSave}>Save Session</button>
         <div id="warn">Please enter a valid event name&date</div>
      </div>
      </div>

      <div id="Countdown-container">
        <header className="Countdown-header">{this.state.eventName}</header>
        <div className="timerList">
          <ul>
            <li><div className="date">{this.state.timeYear}</div><div>Years</div></li>
            <li><div className="date">{this.state.timeDay}</div><div>Days</div></li>
            <li className="break"></li>
            <li><div className="time">{this.state.timeHour}</div><div>Hours</div></li>
            <li><div className="time">{this.state.timeMin}</div><div>Minutes</div></li>
            <li><div className="time">{this.state.timeSec}</div><div>Seconds</div></li>
          </ul>
          <div id="bottom-text">Remaining</div>
        </div>
        <button id="restart" onClick={this.handleRestart}>Restart</button>
      </div>

    </div>
    );
  }
}

export default App;
