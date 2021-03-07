import React from 'react';
import Timebox from './Timebox';
import TimeboxCreator from './TimeboxCreator';
import ErrorBoundary from './ErrorBoundary';

class TimeboxList extends React.Component {

    state = {
        timeboxes: [
            {id: "aa", title: "Uczę się A", totalTimeInMinutes: "5"}, 
            {id: "bb", title: "Uczę się B", totalTimeInMinutes: "10"},
            {id: "cc", title: "Uczę się C", totalTimeInMinutes: "15"}
        ],
        // hasError: false,
    }

    // static getDerivedStateFromError(error) {
    //     // Update state so the next render will show the fallback UI.
    //     return { hasError: true };
    // }

    // componentDidCatch(error, errorInfo) {
    //     // You can also log the error to an error reporting service
    //     console.log("Wystąpił następujący błąd:", error, errorInfo);
    // }

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
        try {
            this.addTimebox(createdTimebox);
        } catch(error) {
            console.log("An error occured in 'createTimebox' function", error);
        }
    }

    render() {
        return(
            <>
            <TimeboxCreator onCreate = {this.handleCreate}/>
            <ErrorBoundary message = "Something went wrong :(">
            {  
                // this.state.hasError ? "Smth went wrong" : 
                this.state.timeboxes.map((timebox, index) => (
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
            </ErrorBoundary>
            </>
        )
    }
}

export default TimeboxList;