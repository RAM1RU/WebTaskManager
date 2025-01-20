import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        items: JSON.parse(localStorage.getItem("tasks")) || [], // Load tasks from localStorage
        filter: "all",
        filteredTasks: [],
    },
    reducers: {
        addTask(state, action) {
            const newTask = {
                id: Date.now().toString(),
                title: action.payload.title,
                description: action.payload.description,
                completed: false,
            };
            state.items.push(newTask);
            updateLocalStorage(state.items);
            state.filteredTasks = applyFilter(state.items, state.filter);
        },
        toggleTask(state, action) {
            const task = state.items.find((t) => t.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
            updateLocalStorage(state.items);
            state.filteredTasks = applyFilter(state.items, state.filter);
        },
        deleteTask(state, action) {
            state.items = state.items.filter((t) => t.id !== action.payload);
            updateLocalStorage(state.items);
            state.filteredTasks = applyFilter(state.items, state.filter);
        },
        setFilter(state, action) {
            state.filter = action.payload;
            state.filteredTasks = applyFilter(state.items, action.payload);
        },
        updateTask(state, action) {
            const { id, title, description } = action.payload;
            const task = state.items.find((t) => t.id === id);
            if (task) {
                task.title = title;
                task.description = description;
            }
            updateLocalStorage(state.items);
            state.filteredTasks = applyFilter(state.items, state.filter);
        },
        filterBySearch(state, action) {
            const query = action.payload.toLowerCase();
            state.filteredTasks = state.items.filter((task) =>
                task.title.toLowerCase().includes(query)
            );
        },
        loadTasks(state, action) {
            state.items = action.payload;
            state.filteredTasks = applyFilter(state.items, state.filter);
        },
    },
});

function applyFilter(items, filter) {
    if (filter === "completed") {
        return items.filter((task) => task.completed);
    }
    if (filter === "incomplete") {
        return items.filter((task) => !task.completed);
    }
    return items;
}

function updateLocalStorage(items) {
    localStorage.setItem("tasks", JSON.stringify(items));
}

export const { addTask, toggleTask, deleteTask, setFilter, updateTask, filterBySearch, loadTasks } = tasksSlice.actions;
export default tasksSlice.reducer;