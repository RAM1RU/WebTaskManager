import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        items: [], // Список всех задач
        filter: "all", // Текущий фильтр
        filteredTasks: [], // Отфильтрованные задачи
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
            state.filteredTasks = applyFilter(state.items, state.filter);
        },
        toggleTask(state, action) {
            const task = state.items.find((t) => t.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
            state.filteredTasks = applyFilter(state.items, state.filter);
        },
        deleteTask(state, action) {
            state.items = state.items.filter((t) => t.id !== action.payload);
            state.filteredTasks = applyFilter(state.items, state.filter);
        },
        setFilter(state, action) {
            state.filter = action.payload;
            state.filteredTasks = applyFilter(state.items, action.payload);
        },
        updateTask(state, action) { // Добавленный редуктор
            const { id, title, description } = action.payload;
            const task = state.items.find((t) => t.id === id);
            if (task) {
                task.title = title;
                task.description = description;
            }
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

export const { addTask, toggleTask, deleteTask, setFilter, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
