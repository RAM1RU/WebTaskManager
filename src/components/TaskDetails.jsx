import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TaskDetails() {
    const { taskId } = useParams();
    const task = useSelector((state) =>
        state.tasks.items.find((t) => t.id === taskId)
    );

    if (!task) {
        return <div className="placeholder">Задача не найдена</div>;
    }

    return (
        <div className="task-details">
            <div className="task-details__title">
                <input
                    type="text"
                    value={task.title}
                    readOnly // Поле только для чтения
                    className="readonly-field"
                />
            </div>
            <div className="task-details__description">
                <textarea
                    value={task.description}
                    readOnly // Поле только для чтения
                    className="readonly-field"
                />
            </div>
        </div>
    );
}
