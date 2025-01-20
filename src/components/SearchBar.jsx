import React from "react";
import { useDispatch } from "react-redux";
import { filterBySearch } from "../redux/tasksSlice";

export default function SearchBar() {
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        dispatch(filterBySearch(e.target.value));
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search tasks..."
                onChange={handleSearch}
            />
        </div>
    );
}