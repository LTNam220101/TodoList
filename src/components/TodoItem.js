import React from "react";

export default function TodoItem({ todo, destroy, toggle, editing, disableEditing, disableBlur}) {
  return (
    <li
      className={`${todo.isCompleted ? "completed" : " "} ${todo.isEditing ? "editing" : " "}`}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() => toggle(todo)}
          checked={todo.isCompleted}
        ></input>
        <label onDoubleClick={() => editing(todo)}>{todo.name}</label>
        <button className="destroy" onClick={() => destroy(todo.id)}></button>
      </div>
      <input className="edit" defaultValue={todo.name} onKeyDown={(e) => disableEditing(todo, e)} onBlur={(e) =>disableBlur(todo, e)}></input>
    </li>
  );
}
