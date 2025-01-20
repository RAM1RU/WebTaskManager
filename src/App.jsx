import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilter, loadTasks } from "./redux/tasksSlice";
import TaskForm from "./components/TaskForm.jsx";
import TaskDetails from "./components/TaskDetails.jsx";
import TaskList from "./components/TaskList.jsx";
import SearchBar from "./components/SearchBar.jsx";
import "./styles/index.css";

export default function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
            dispatch(loadTasks(savedTasks));
        }
    }, [dispatch]);

    return (
        <div className="app">
            <div className="left-column">
                <h1>R.T.M</h1>
                <hr className="divider" />
                <h2>Filters:</h2>
                <div className="categories">
                    <button onClick={() => dispatch(setFilter("all"))}>All</button>
                    <button onClick={() => dispatch(setFilter("completed"))}>Completed</button>
                    <button onClick={() => dispatch(setFilter("incomplete"))}>Incomplete</button>
                </div>
                <hr className="divider" />
                <SearchBar /> {/* Встраиваем строку поиска */}
                <div className="create">
                    <button onClick={() => navigate("/new")}>Create New Task</button>
                </div>
                <TaskList />
            </div>
            <div className="right-column">
                <Routes>
                    <Route path="/" element={<div className="placeholder">Select Task</div>} />
                    <Route path="/new" element={<TaskForm isNew={true} />} />
                    <Route path="/:taskId" element={<TaskDetails />} />
                    <Route path="/:taskId/edit" element={<TaskForm isNew={false} />} />
                </Routes>
            </div>
        </div>
    );
}