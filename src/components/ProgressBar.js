import React, {Component} from 'react';
import './ProgressBar.css'

export default class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: 0,
            seconds: 0,
            widthCalc: 100,
            isRuningCountDown: false,
            finishedCount: false
        };
    }
    formateTime = (time) => {
        let sec = time % 60;
        let min = Math.floor(time / 60);
        if(sec >= 0 && sec < 10) {
            sec = `0${sec}`
        }
        if(min >= 0 && min < 10) {
            min = `0${min}`
        }
        return `${min}:${sec}`
    }
    handleChange = (e) => {
        var inputValue = +e.target.value;

        this.setState({
            timeLeft: inputValue,
            seconds: inputValue - 1
        })
    }
    startCountDown = (e) => {
        if(!this.state.isRuningCountDown) {
            this.countDownInterval = setInterval(() => {
                const newTime = this.state.timeLeft - 1;
                this.setState({
                    timeLeft: newTime,
                    widthCalc: 0,
                    isRuningCountDown: true
                })
                if(newTime === 0) {
                    clearInterval(this.countDownInterval);
                    this.setState({
                        finishedCount: true
                    })
                }
            }, 1000)
        }
    }
    render () {
        return (
            <div className="progress-bar">
                <div className="progress-bar_input-container">
                    <span>Input time in seconds</span>
                    <input className="progress-bar_input" type="number" onChange={this.handleChange} />
                    <span className="progress-bar_btn" onClick={this.startCountDown}>{this.state.isRuningCountDown ? 'Counting...' : 'Start countdown'}</span>
                </div>
                <div className="progress-bar_container">
                    <div className="progress-bar_line" style={{transition: `width ${this.state.seconds}s linear`, width: `${this.state.widthCalc}%`}}></div>
                    <span className="progress-bar_title">Time left:</span>
                    <span className="progress-bar_time-left">{this.formateTime(this.state.timeLeft)}</span>
                </div>
                { this.state.finishedCount ? <div class="progress-bar_modal">time is up</div> : null}
            </div>
        )
    }
}