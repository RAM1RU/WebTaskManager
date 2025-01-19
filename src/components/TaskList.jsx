import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from '../redux/tasksSlice';
import { useNavigate } from 'react-router-dom';
import editIcon from '../images/edit.png'; // Импорт иконки Edit
import deleteIcon from '../images/delete.png'; // Импорт иконки Delete

function TaskList() {
    const tasks = useSelector((state) => state.tasks.filteredTasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <div className="task-item" key={task.id}>
                    <div className="task-checkbox">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => dispatch(toggleTask(task.id))}
                        />
                    </div>
                    <div className="task-title" onClick={() => navigate(`/${task.id}`)}>
                        {task.title}
                    </div>
                    <div className="task-buttons">
                        <button onClick={() => navigate(`/${task.id}/edit`)}>
                            <img src={editIcon} alt="Edit" />
                        </button>
                        <button onClick={() => dispatch(deleteTask(task.id))}>
                            <img src={deleteIcon} alt="Delete" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
