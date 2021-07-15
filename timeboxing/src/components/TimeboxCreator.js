import React from 'react';
import { v4 as uuidv4 } from 'uuid';

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

export default TimeboxCreator;