// TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaCheck } from 'react-icons/fa'; // Importa los íconos
import './TaskList.css'; // Importa el archivo CSS
import TaskForm from './TaskForm'; // Asegúrate de importar TaskForm

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null); // Almacena la tarea seleccionada para editar
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    useEffect(() => {
        // Carga inicial de tareas
        axios.get('/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    // Manejar clic en el botón de editar
    const handleEditClick = (task) => {
        setSelectedTask(task);
        setUpdatedTitle(task.title);
        setUpdatedDescription(task.description);
        setShowModal(true); // Muestra el modal
    };

    // Manejar el envío del formulario para guardar los cambios
    const handleSave = () => {
        const updatedTask = { ...selectedTask, title: updatedTitle, description: updatedDescription };

        axios.put(`/api/tasks/${selectedTask.id}`, updatedTask)
            .then(() => {
                setTasks(tasks.map(t => (t.id === selectedTask.id ? updatedTask : t))); // Actualiza la lista de tareas
                setShowModal(false); // Oculta el modal
            })
            .catch(error => console.error('Error updating task:', error));
    };

    // Manejar clic en el botón de eliminar con confirmación
    const handleDeleteClick = (taskId) => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");

        if (confirmed) {
            axios.delete(`/api/tasks/${taskId}`)
                .then(() => {
                    setTasks(tasks.filter(task => task.id !== taskId)); // Filtra la tarea eliminada
                })
                .catch(error => console.error('Error deleting task:', error));
        }
    };

    // Manejar clic en el botón de marcar como completada
    const handleCompleteClick = (task) => {
        const updatedTask = { ...task, completed: true };

        axios.put(`/api/tasks/${task.id}`, updatedTask)
            .then(() => {
                setTasks(tasks.filter(t => t.id !== task.id)); // Elimina la tarea de la lista
            })
            .catch(error => console.error('Error completing task:', error));
    };

    // Función para manejar la adición de nuevas tareas
    const handleTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]); // Agrega la nueva tarea al estado
    };

    return (
        <div className="task-list-container">
            <h2>Task List</h2>
            {/* Incluir el componente TaskForm y pasar la función handleTaskAdded */}
            <TaskForm onTaskAdded={handleTaskAdded} />

            <table className="task-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.filter(task => !task.completed).map(task => ( // Filtra solo las tareas pendientes
                        <tr key={task.id} className={task.completed ? 'completed' : ''}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.completed ? "Completed" : "Pending"}</td>
                            <td>
                                <FaEdit onClick={() => handleEditClick(task)} className="action-icon" />
                                <FaCheck onClick={() => handleCompleteClick(task)} className="action-icon" />
                                <FaTrashAlt onClick={() => handleDeleteClick(task.id)} className="action-icon" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Botón para ir a tareas completadas */}
            <button onClick={() => window.location.href = '/completed-tasks'} className="view-completed-button">
                View Completed Tasks
            </button>

            {/* Modal para editar la tarea */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Task</h2>
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            placeholder="Task Title"
                            className="modal-input"
                        />
                        <textarea
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                            placeholder="Task Description"
                            className="modal-textarea"
                        />
                        <div className="modal-buttons">
                            <button onClick={handleSave} className="modal-save-button">Save</button>
                            <button onClick={() => setShowModal(false)} className="modal-cancel-button">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;
