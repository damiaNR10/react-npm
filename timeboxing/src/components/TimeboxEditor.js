import React from 'react';
//import classNames from 'classnames';

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

export default TimeboxEditor;