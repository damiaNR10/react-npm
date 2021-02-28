import React from 'react';
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";

class CurrentTimebox extends React.Component {
    constructor(props) {
        console.count("constructor");
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        };

        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.togglePause = this.togglePause.bind(this);
        this.intervalID = null;
    }

    componentDidMount() {
        console.count("componentDidMmount");
    }

    componentDidUpdate() {
        console.count("componentDidUpdate");
    }

    componentWillUnmount() {
        console.count("componentWillUnmount");
        this.stopTimer();
    }

    handleStart(event) {
        // event.persist();
        // console.log("handleStart");
        // console.log(event);
        this.setState({
            isRunning: true,
        });
        this.startTimer();
    }
    handleStop(event) {
        // console.log("handleStop");
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        });
        this.stopTimer();
    } 
    startTimer() {
        if(this.intervalID === null) {
            this.intervalID = window.setInterval(() => {
                console.log("Timer Works!");
                this.setState(
                    (prevState) => {
                        return {
                            elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1,
                        }
                    }
                );
            }, 100);
        }
    }
    stopTimer() {
        window.clearInterval(this.intervalID);
        this.intervalID = null;
    }
    togglePause(event) {
        this.setState(
            function(prevState) {
                // debugger
                console.count("setState");
                const isPaused = !prevState.isPaused;
                if(isPaused) {
                    this.stopTimer();
                } else {
                    this.startTimer();
                }
                return {
                    isPaused: isPaused,
                    pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount,
                }
            }
        );
    }
    render() {
        console.count("render");
        const {isRunning, isPaused, pausesCount, elapsedTimeInSeconds} = this.state;
        const {title, totalTimeInMinutes, isEditable, onEdit} = this.props;
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const minutesLeft = Math.floor(timeLeftInSeconds/60);
        const secondsLeft = Math.floor(timeLeftInSeconds%60);
        const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100;
        // console.group("This is a group");
        //     console.info({totalTimeInMinutes, pausesCount});
        //     console.debug("Debug message");
        //     console.groupCollapsed("This is a subgroup");
        //         console.warn("Warning message");
        //         console.error("Error message");
        //         // console.trace("Displat stack trace");
        //         console.assert(4 < 2, "Smth is wrong");
        //     console.groupEnd();
        // console.groupEnd();
        // console.count();
        // console.count();
        // console.countReset();
        // console.dir(document.body);
        // console.log("Title is %s, total seconds: %d, PI is %f", title, totalTimeInSeconds, 3.14);
        // console.log("%c green %c yellow", "color: green", "background: red");

        return (
            <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
                <h1>{title}</h1>
                <Clock minutes = {minutesLeft} seconds = {secondsLeft} className = {isPaused ? "inactive" : ""} />
                <ProgressBar 
                percent = {progressInPercent} 
                trackRemaining = "false"  
                className = {isPaused ? "inactive" : ""} 
                color = "red"
                big />
                <button onClick = {onEdit} disabled = {isEditable}>Edytuj</button>
                <button onClick = {this.handleStart} disabled = {isRunning}>Start</button>
                <button onClick = {this.handleStop} disabled = {!isRunning}>Stop</button>
                <button onClick = {this.togglePause} disabled = {!isRunning}>{isPaused ? "Wznów" : "Pauzuj"}</button>
                Liczba przerw: {pausesCount}
            </div>
        );
    }
}

export default CurrentTimebox;