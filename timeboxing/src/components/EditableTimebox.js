import React from 'react';
import TimeboxEditor from "./TimeboxEditor"
import CurrentTimebox from "./CurrentTimebox";

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
            { isEditable ? (
                <TimeboxEditor 
                    isEditable = {isEditable}
                    onConfirm = {this.handleConfirm} 
                    title = {title} totalTimeInMinutes = {totalTimeInMinutes}
                    onTitleChange = {this.handleTitleChange}
                    onTotalTimeInMinutesChange = {this.handleTotalTimeInMinutesChange}
                />
                  ): ( 
                <CurrentTimebox 
                isEditable = {isEditable}
                title = {title} 
                totalTimeInMinutes = {totalTimeInMinutes}
                onEdit = {this.handleEdit}/> 
                 )} 
            </>
        );
    }
}

export default EditableTimebox;