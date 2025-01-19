import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import TaskForm from "./components/TaskForm.jsx";
import TaskDetails from "./components/TaskDetails.jsx";
import TaskList from "./components/TaskList.jsx"; // Импорт TaskList
import "./styles/index.css";

export default function App() {
    const navigate = useNavigate();

    return (
        <div className="app">
            {/* Левая колонка */}
            <div className="left-column">
                <h1>Task Manager</h1>
                <h2>Filters</h2>
                <div className="categories">
                    <button onClick={() => navigate("/?filter=all")}>All</button>
                    <button onClick={() => navigate("/?filter=completed")}>Completed</button>
                    <button onClick={() => navigate("/?filter=incomplete")}>Incompleted</button>
                </div>
                <button onClick={() => navigate("/new")}>New Task</button>
                <TaskList /> {/* Здесь рендерится TaskList */}
            </div>

            {/* Правая колонка */}
            <div className="right-column">
                <Routes>
                    <Route path="/" element={<div className="placeholder">Выберите Задачу</div>} />
                    <Route path="/new" element={<TaskForm isNew={true} />} />
                    <Route path="/:taskId" element={<TaskDetails />} />
                    <Route path="/:taskId/edit" element={<TaskForm isNew={false} />} />
                </Routes>
            </div>
        </div>
    );
}
