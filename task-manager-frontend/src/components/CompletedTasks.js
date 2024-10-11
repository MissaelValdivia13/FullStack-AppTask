import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TaskList.css'; // Asegúrate de que este archivo CSS exista y tenga el estilo adecuado

const CompletedTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Carga inicial de todas las tareas
        axios.get('/api/tasks') // Asegúrate de que este endpoint retorne todas las tareas
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    return (
        <div className="task-list-container">
            <h2>All Tasks</h2>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length > 0 ? (
                        tasks.filter(task => ! task.Pending) // Cambia 'pending' al nombre correcto si es necesario
                             .map(task => ( // Filtra tareas que no están en estado "Pending"
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.completed ? "Completed" : "Pending"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No tasks found excluding pending tasks.</td> {/* Mensaje si no hay tareas encontradas */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CompletedTasks;
