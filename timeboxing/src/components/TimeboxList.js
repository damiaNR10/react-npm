import React from 'react';
import Timebox from './Timebox';
import TimeboxCreator from './TimeboxCreator';
import ErrorBoundary from './ErrorBoundary';
import TimeboxesAPI from '../api/FakeTimeboxesApi';
class TimeboxList extends React.Component {

    state = {
        timeboxes: [],
        loading: true,
        error: false,
        // hasError: false,
    }

    //Timeboxes will be shown after time defined in wait() funciton:

    componentDidMount() {
        TimeboxesAPI.getAllTimeboxes().then(
            (timeboxes) => {this.setState({timeboxes})}
        ).catch(
            (error) => this.setState({error})
        ).finally(
            () => this.setState({loading: false})
        );
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
        TimeboxesAPI.addTimebox(timebox).then(
            // .then(() => TimeboxesAPI.getAllTimeboxes())
            // .then(
            //     (timeboxes) => {this.setState({timeboxes})}
            (addedTimebox) => this.setState(prevState => {
                const timeboxes = [...prevState.timeboxes, addedTimebox];
                return {timeboxes};
            })
        );
    }

    removeTimebox = (indexToRemove) => {
        TimeboxesAPI.removeTimebox(this.state.timeboxes[indexToRemove])
        .then(
            () => this.setState(prevState => {
                const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
                return {timeboxes};
            }) 
        );
        // this.setState(prevState => {
        //     const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
        //     return {timeboxes};
        // })        
    }

    updateTimebox = (indexToUpdate, timeboxToUpdate) => {
        TimeboxesAPI.replaceTimebox(timeboxToUpdate)
        .then(
            (updatedTimebox) => this.setState(prevState => {
                const timeboxes = prevState.timeboxes.map((timebox, index) => 
                    index === indexToUpdate ? updatedTimebox : timebox
                );
                return {timeboxes};
            })  
        );
    }

    handleCreate = (createdTimebox) => {
        try {
            this.addTimebox(createdTimebox);
        } catch(error) {
            console.log("An error occured in 'createTimebox' function.", error);
        }
    }

    render() {
        return(
            <>
            <TimeboxCreator onCreate = {this.handleCreate}/>
            <ErrorBoundary message = "Something went wrong :(">
            {this.state.loading ? "Timeboxes loading..." :  null}
            {this.state.error ? "Timeboxes loading went wrong :(" :  null}
            {  
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