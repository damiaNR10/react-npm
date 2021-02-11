import React from 'react';
import {TimeboxList, EditableTimebox} from './remaining-components.js';

function App() {
    return (    
        <div className="App">
            <TimeboxList />
            <EditableTimebox />
        </div>
    );
}

export default App;