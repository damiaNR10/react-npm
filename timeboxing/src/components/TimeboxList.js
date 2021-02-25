import React from 'react';
import Timebox from './Timebox';
import TimeboxCreator from './TimeboxCreator';


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
        console.table(this.state.timeboxes);
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

export default TimeboxList;