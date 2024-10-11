import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = { title, description, completed: false };
        axios.post('/api/tasks', newTask)
            .then(response => {
                onTaskAdded(response.data); // Llama a la función para actualizar el DataTable
                setTitle('');
                setDescription('');
            })
            .catch(error => console.error('Error creating task:', error));
    };

    return (
        <div className="form-container">
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                    required
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task Description"
                    required
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
