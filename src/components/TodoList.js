import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({
  todoList,
  destroy,
  toggle,
  toggleAll,
  editing,
  disableEditing,
  filters,
  filter,
  disableBlur,
}) {
  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={() =>
          toggleAll(todoList.every((item) => item.isCompleted === true))
        }
        checked={todoList.every((item) => item.isCompleted === true)}
      ></input>
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {todoList.filter(filters[filter]).map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            destroy={destroy}
            toggle={toggle}
            editing={editing}
            disableEditing={disableEditing}
            disableBlur={disableBlur}
          />
        ))}
      </ul>
    </section>
  );
}
