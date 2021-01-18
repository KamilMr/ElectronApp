import React from 'react';
import { render } from 'react-dom';
// import AppDescription from './components/AppDescription/AppDescription';

class AppDescription extends React.Component {
  render() {
    return (
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 data by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
    );
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      status: 'off',
      time: 0,
      timer: null
    };
  }

  tick() {
    const audioElement = new Audio('./sounds/bell.wav');
    this.setState(() => ({time: this.state.time -1}));
    if (this.state.time == 0 && this.state.status === 'work'){
      this.setState(() => ({time: this.state.time -1,
        status: 'rest', time: 20}))
        audioElement.play();
      }
      if (this.state.time == 0 && this.state.status === 'rest'){
        this.setState(() => ({time: this.state.time -1,
          status: 'work', time: 1200}))
          audioElement.play();
    }
  }
  
  componentDidMount() {
    this.state.timer = setInterval(() => this.tick(), 1000);
  }

  
  startTimer = () => {
    this.setState( () => ({status: 'work', time: 1200}));
    this.playAudio
  }
  
  stopTimer = () => {
    this.setState( () => ({status: 'off', time: 1200}));
  }
 

  closeApp = () => {
    window.close();
  }
  
  formatTime = (data) => { 
    let minutes = Math.floor(data / 60); 
    let seconds = data - minutes * 60;
    let leftTime = '';
    leftTime += (minutes < 10 ? '0' + minutes : minutes) + ':';
    leftTime += (seconds < 10 ? '0' + seconds : seconds);
    return leftTime    
  }

  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(this.state.status === 'off') && <AppDescription />}
        {(this.state.status === 'work') && <img src="./images/Work.png" />}
        {(this.state.status === 'rest') && <img src="./images/Rest.png" />}
        {(this.state.status === 'rest') && <div className="timer"> {this.formatTime(this.state.time)}  </div>}
        {(this.state.status === 'work') && <div className="timer"> {this.formatTime(this.state.time)}  </div>}
        {(this.state.status === 'off') && <button className="btn start" onClick={this.startTimer}>Start</button>}
        {(this.state.status === 'work' || this.state.status === 'rest') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
