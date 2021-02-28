import React from 'react';
import EditableTimebox from './EditableTimebox';
import TimeboxList from './TimeboxList';
import Error from './Error';

function App() {
    return (    
        <div className="App">
            <Error message="Something is wrong with whole app">
                <TimeboxList />
                <Error message="Something is wrong with whole EditableTimebox">
                    <EditableTimebox />
                </Error>
            </Error>
        </div>
    );
}

export default App;