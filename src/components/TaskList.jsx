import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from '../redux/tasksSlice';
import { useNavigate } from 'react-router-dom';
import editIcon from '../images/edit.png';
import deleteIcon from '../images/delete.png';

function TaskList() {
    const tasks = useSelector((state) => state.tasks.filteredTasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength) {
            return title.slice(0, maxLength) + '...'; // Обрезка строки с добавлением многоточия
        }
        return title;
    };

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
                    <div
                        className="task-title"
                        onClick={() => navigate(`/${task.id}`)}
                        title={task.title} // Показываем полный текст при наведении
                    >
                        {truncateTitle(task.title, 40)}
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
