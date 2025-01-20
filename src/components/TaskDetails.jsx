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
                <label>Task Title</label>
                <input
                    type="text"
                    value={task.title}
                    readOnly
                    className="readonly-field"
                />
            </div>
            <div className="task-details__description">
                <label>Task Description</label>
                <textarea
                    value={task.description}
                    readOnly
                    className="readonly-field"
                />
            </div>
        </div>
    );
}
