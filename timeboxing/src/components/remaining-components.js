import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

import EditableTimebox from './EditableTimebox';

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

    //Obsługa formularzy 1 cd:
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