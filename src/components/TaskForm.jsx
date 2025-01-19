import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../redux/tasksSlice";

export default function TaskForm({ isNew }) {
    const { taskId } = useParams(); // Получаем ID задачи из URL
    const task = useSelector((state) =>
        state.tasks.items.find((t) => t.id === taskId)
    ); // Ищем задачу по ID
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // При изменении задачи (или при первом рендере) устанавливаем данные
    useEffect(() => {
        if (isNew) {
            setTitle(""); // Очищаем поля для новой задачи
            setDescription("");
        } else if (task) {
            setTitle(task.title); // Заполняем поля данными задачи
            setDescription(task.description);
        }
    }, [isNew, task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isNew) {
            dispatch(addTask({ title, description })); // Создание новой задачи
        } else {
            dispatch(updateTask({ id: taskId, title, description })); // Обновление существующей задачи
        }
        navigate("/"); // Возврат к списку задач
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title" // Призрачный текст
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description" // Призрачный текст
            />
            <button type="submit">Save</button>
        </form>
    );
}
