import React from 'react';
import classNames from 'classnames';

// import EditableTimebox from './EditableTimebox';
// import TimeboxCreator from './TimeboxCreator';

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

//export {EditableTimebox, TimeboxList};
export default Timebox;