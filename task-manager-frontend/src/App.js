import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';  
import CompletedTasks from './components/CompletedTasks'; 

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/completed-tasks" element={<CompletedTasks />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
