import './App.css';

import React from 'react';
import ReactDOM from 'react-dom';



export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          { /* Change code below this line */ }
          <Timer />
          { /* Change code above this line */ }
        </div>
    );
  }
};

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state =
        {
          breakLength: 5,
          sessionLength: 25,
          isRunningTime: false,
          isSessionTime:true,
          isBreakTime: false,
          time: 25*60, //segundos(25min)
          timeDisplayed: "25:00",
          timeReference: null,
          beepReference: null,
          isBeeping: false

        }




    this.breakLengthIncrementHandler=this.breakLengthIncrementHandler.bind(this)
    this.breakLengthDecrementHandler=this.breakLengthDecrementHandler.bind(this)

    this.sessionLengthIncrementHandler = this.sessionLengthIncrementHandler.bind(this);
    this.sessionLengthDecrementHandler = this.sessionLengthDecrementHandler.bind(this);


    this.resetHandler = this.resetHandler.bind(this)
    this.playAndStopHandler = this.playAndStopHandler.bind(this)
    this.timeFormater=this.timeFormater.bind(this)

    this.decrementTime=this.decrementTime.bind(this)
    this.playTime=this.playTime.bind(this)
    this.stopTime=this.stopTime.bind(this)



  }
//react functions
  componentDidMount() {
    this.setState({ beepReference: document.getElementById("beep") });

  }
  componentDidUpdate(prevProps,prevState)
  {
    if(prevState.time != this.state.time)
    {
      let formatedTime = this.timeFormater()
      this.setState({timeDisplayed:formatedTime})


    }


  }

  //functions
  timeFormater()
  {
    let minutes = this.state.time / 60
    minutes = parseInt(minutes)
    let seconds = this.state.time % 60

    let mm = minutes<10 ? "0"+minutes:minutes+""
    let ss = seconds <10 ? "0"+seconds:seconds+""

    let formatedTime = mm+":"+ss

    return formatedTime
  }


  decrementTime()
  {
    if(this.state.time === 0)
    {
      document.getElementById("beep").play();
    }
    if(this.state.time > 0)
    {
      let time = this.state.time - 1
      this.setState({time: time
      })

    }
    else
    {
      if(this.state.isSessionTime)
      {
        this.setState({
          isSessionTime: false,
          isBreakTime:true,
          time: this.state.breakLength*60
        })
      }
      else
      {
        this.setState({
          isSessionTime: true,
          isBreakTime:false,
          time: this.state.sessionLength*60
        })
      }
    }
  }
  playTime()
  {
    if(this.state.time > 0)
    {
      let timeReference = setInterval(this.decrementTime,1000)
      this.setState({timeReference: timeReference,isRunningTime:true})
    }
  }
  stopTime()
  {
    clearInterval(this.state.timeReference)
    this.setState({timeReference: null,isRunningTime: false})
  }

  resetHandler()
  {
    this.setState({ breakLength: 5,
      sessionLength: 25,time:25*60})
    this.stopTime()
    if(!this.state.beepReference.paused)
    {
      document.getElementById("beep").    currentTime = 0;
      document.getElementById("beep").pause();
    }
  }
  playAndStopHandler()
  {

    if(!this.state.isRunningTime)
    {
      this.playTime()
    }
    else
    {
      this.stopTime()
    }
  }

  breakLengthIncrementHandler()
  {
    if(this.state.isRunningTime)
      return
    let currentValue = this.state.breakLength >= 60 ? 60 :this.state.breakLength + 1
    this.setState(
        {breakLength:currentValue,}
    )
  }
  breakLengthDecrementHandler()
  {
    if(this.state.isRunningTime)
      return
    let currentValue = this.state.breakLength <=  1 ? 1 :this.state.breakLength - 1
    this.setState(
        {breakLength:currentValue}
    )
  }
  sessionLengthDecrementHandler()
  {
    if(this.state.isRunningTime)
      return
    let currentValue = this.state.sessionLength <=  1 ? 1 :this.state.sessionLength - 1
    this.setState(
        {sessionLength:currentValue,time:currentValue*60}
    )
  }
  sessionLengthIncrementHandler()
  {
    if(this.state.isRunningTime)
      return
    let currentValue = this.state.sessionLength >= 60 ? 60 :this.state.sessionLength + 1
    this.setState(
        {sessionLength:currentValue,time:currentValue*60}
    )
  }


  render() {
    return (
        <div className={"App"}>
          <p id = {"session-label"}>Session Lenght </p>
          <button id = {"session-decrement"}  onClick = {this.sessionLengthDecrementHandler}>-</button>

          <p id = {"session-length"}>{this.state.sessionLength}</p>
          <button id = {"session-increment"}
                  onClick = {this.sessionLengthIncrementHandler}>+</button>
          <br/>
          <p id = {"break-label"}>Break Lenght </p>

          <button id = {"break-decrement"} onClick ={this.breakLengthDecrementHandler} >-</button>

          <p id = {"break-length"}>{this.state.breakLength}</p>

          <button id = {"break-increment"} onClick = {this.breakLengthIncrementHandler}>+</button>




          <p id = {"timer-label"}>{this.state.isSessionTime ?"Session":"Break"}</p>
          <p id = {"time-left"}>{this.state.timeDisplayed}</p>
          <audio id="beep" src="https://www.pacdv.com/sounds/interface_sound_effects/sound10.mp3" type="audio/mp3"></audio>
          <p>timerms: {this.state.time}</p>


          <button id = {"start_stop"} onClick = {this.playAndStopHandler}>start/stop </button>

          <button id = {"reset"} onClick={this.resetHandler}>Reset</button>








        </div>
    );
  }
};



export default App;
