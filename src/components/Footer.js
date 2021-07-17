import React from "react";

export default function Footer({
  todoList,
  filters,
  filter,
  switchFilter,
  deleteCompleted,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{todoList.filter((todo) => !todo.isCompleted).length} </strong>
        item left
      </span>
      <ul className="filters">
        {Object.keys(filters).map((type) => (
          <li key={type} onClick={() => switchFilter(type)}>
            <a
              className={`${filter === type ? "selected" : ""}`}
              href={`#/${type[0].toUpperCase() + type.slice(1)}`}
            >
              {type[0].toUpperCase() + type.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      {todoList.filter(filters.completed).length > 0 && (
        <button className="clear-completed" onClick={() => deleteCompleted()}>
          Clear completed
        </button>
      )}
    </footer>
  );
}
