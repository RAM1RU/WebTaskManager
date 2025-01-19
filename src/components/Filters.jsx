import React from 'react';
import { useDispatch } from 'react-redux';
import { filterTasks } from '../redux/tasksSlice';

function Filters() {
    const dispatch = useDispatch();

    return (
        <div className="filters">
            <button onClick={() => dispatch(filterTasks('all'))}>All</button>
            <button onClick={() => dispatch(filterTasks('completed'))}>Completed</button>
            <button onClick={() => dispatch(filterTasks('incomplete'))}>Incomplete</button>
        </div>
    );
}

export default Filters;