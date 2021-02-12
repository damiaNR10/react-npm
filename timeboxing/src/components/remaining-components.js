import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

import Clock from "./Clock";

function ProgressBar({className ="", percent = "10", trackRemaining = false, big = false, color = null}) {
    let progressClassName = classNames(
        "progress",
        "awd",
        {
            "progress--big": big,
            "progress--color-red": color === "red",
        }
        );

    return (            
        <div className={progressClassName}>
            <div className = "progress__bar" style={{width: `${percent}%`, height: "100%", "marginLeft": trackRemaining == "true" ? "auto" : "initial"}}></div>
        </div>
    );
}

function TimeboxEditor(props) {
    const {title, totalTimeInMinutes, onTitleChange, onTotalTimeInMinutesChange, onConfirm, isEditable} = props;
    return (
        <div className={`TimeboxEditor ${isEditable ? "" : " inactive"}`}>
            <label htmlFor="">Co robisz?<input disabled = {!isEditable} onChange={onTitleChange} value={title} type="text" /></label><br />
            <label htmlFor="">Ile minut?<input disabled = {!isEditable} onChange={onTotalTimeInMinutesChange} value={totalTimeInMinutes} type="number" /></label><br />
            <button onClick = {onConfirm} disabled = {!isEditable} >Zatwierdź zmiany</button>
        </div>
    );
}

class CurrentTimebox extends React.Component {
    constructor(props) {
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
    }
    handleStart(event) {
        this.setState({
            isRunning: true,
        });
        this.startTimer();
    }
    handleStop(event) {
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        });
        this.stopTimer();
    } 
    startTimer() {
        this.intervalID = window.setInterval(() => {
            this.setState(
                (prevState) => {
                    return {
                        elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1,
                    }
                }
            );
        }, 100);
    }
    stopTimer() {
        window.clearInterval(this.intervalID);
    }
    togglePause(event) {
        this.setState(
            function(prevState) {
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
        const {isRunning, isPaused, pausesCount, elapsedTimeInSeconds} = this.state;
        const {title, totalTimeInMinutes, isEditable, onEdit} = this.props;
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const minutesLeft = Math.floor(timeLeftInSeconds/60);
        const secondsLeft = Math.floor(timeLeftInSeconds%60);
        const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100;

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

class EditableTimebox extends React.Component {
    state = {
        title: "Uczę się wyciągać stan w górę!",
        totalTimeInMinutes: 20,
        isEditable: true 
    }
    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value,
        });
    };
    handleTotalTimeInMinutesChange = (event) => {
        this.setState({
            totalTimeInMinutes: event.target.value,
        });
    };
    handleConfirm = (event) => {
        this.setState({
            isEditable: false
        });
    }
    handleEdit = (event) => {
        this.setState({
            isEditable: true
        });
    }
    render() {
        const {title, totalTimeInMinutes, isEditable} = this.state;
        return (
            <>
                <TimeboxEditor 
                    isEditable = {isEditable}
                    onConfirm = {this.handleConfirm} 
                    title = {title} totalTimeInMinutes = {totalTimeInMinutes}
                    onTitleChange = {this.handleTitleChange}
                    onTotalTimeInMinutesChange = {this.handleTotalTimeInMinutesChange}
                />
                <CurrentTimebox 
                isEditable = {isEditable}
                title = {title} 
                totalTimeInMinutes = {totalTimeInMinutes}
                onEdit = {this.handleEdit}/> 
            </>
        );
    }
}

class TimeboxCreator extends React.Component {

    //Obsługa formularzy 1:
    // state = {
    //     title: "",
    //     totalTimeInMinutes: ""
    // }

    // handleTitleChange = () => {
    //     this.setState({title: event.target.value});
    // }

    // handleTotalTimeInMinutesChange = () => {
    //     this.setState({totalTimeInMinutes: event.target.value});
    // }

    //Obsługa formularzy 2:
    constructor(props) {
        super(props);
        this.titleInput = React.createRef();
        this.totalTimeInMinutesInput = React.createRef();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onCreate({
            id: uuidv4(),
            title: this.titleInput.current.value, 
            totalTimeInMinutes: this.totalTimeInMinutesInput.current.value
        });
        this.titleInput.current.value = "";
        this.totalTimeInMinutesInput.current.value = "";
    }

    //Obłusga formularzy 1 cd:
    // render() {
    //     return (
    //         <form onSubmit = {this.handleSubmit} className="TimeboxCreator">
    //             <label htmlFor="">Co robisz?<input onChange = {this.handleTitleChange} type="text" value = {this.state.title} /></label><br />
    //             <label htmlFor="">Ile minut?<input onChange = {this.handleTotalTimeInMinutesChange} type="number" value = {this.state.totalTimeInMinutes} /></label><br />
    //             <button>Dodaj Timebox</button>
    //         </form>
    //     );
    // }

    //Obłusga formularzy 2 cd:
    render() {
        return (
            <form onSubmit = {this.handleSubmit} className="TimeboxCreator">
                <label htmlFor="">Co robisz?<input type="text" ref = {this.titleInput} /></label><br />
                <label htmlFor="">Ile minut?<input type="number" ref = {this.totalTimeInMinutesInput} /></label><br />
                <button>Dodaj Timebox</button>
            </form>
        );
    }
}

class TimeboxList extends React.Component {

    state = {
        timeboxes: [
            {id: "aa", title: "Uczę się A", totalTimeInMinutes: "5"}, 
            {id: "bb", title: "Uczę się B", totalTimeInMinutes: "10"},
            {id: "cc", title: "Uczę się C", totalTimeInMinutes: "15"}
        ]
    }

    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [...prevState.timeboxes, timebox];
            return {timeboxes};
        })
    }

    removeTimebox = (indexToRemove) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
            return {timeboxes};
        })        
    }

    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) => 
                index === indexToUpdate ? updatedTimebox : timebox
            );
            return {timeboxes};
        });  
    }

    handleCreate = (createdTimebox) => {
        this.addTimebox(createdTimebox);
    }

    render() {
        return(
            <>
            <TimeboxCreator onCreate = {this.handleCreate}/>
            {this.state.timeboxes.map((timebox, index) => (
                <Timebox 
                key = {timebox.id} 
                title = {timebox.title} 
                totalTimeInMinutes = {timebox.totalTimeInMinutes} 
                onDelete = {() => this.removeTimebox(index)}
                onEdit = {() => this.updateTimebox(index, {...timebox, title: "new title"})}
                titleInputChange = {this.titleInputChange}
                totalTimeInMinutesInputChange = {this.totalTimeInMinutesInputChange}
                />
            )
            )}
            </>
        )
    }
}

class Timebox extends React.Component {        

    render () {

        return(

            <div className="Timebox">
                <h3>{this.props.title} - {this.props.totalTimeInMinutes} min</h3>
                <button onClick = {this.props.onDelete}>Usuń</button>
                <button onClick = {this.props.onEdit}>Zmień</button>
            </div>
        )
    }
}

export {EditableTimebox, TimeboxList};