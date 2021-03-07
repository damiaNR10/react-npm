import React from 'react';
import EditableTimebox from './EditableTimebox';
import TimeboxList from './TimeboxList';
import ErrorBoundary from './ErrorBoundary';

function App() {
    return (    
        <div className="App">
            <ErrorBoundary message="Something is wrong with whole app">
                <TimeboxList />
                <ErrorBoundary message="Something is wrong with whole EditableTimebox">
                    <EditableTimebox />
                </ErrorBoundary>
            </ErrorBoundary>
        </div>
    );
}

export default App;