import { useState } from "react";
import { v4 } from "uuid";
import React from "react";

export default function Header() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  const onTextInputChange = (e) => {
    setTextInput(e.target.value);
  };
  const checkKey = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      setTodoList([
        ...todoList,
        { id: v4(), name: { textInput }, isCompleted: false },
      ]);
      console.log(todoList)
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={textInput}
        onChange={onTextInputChange}
        onKeyUp={checkKey}
      ></input>
    </header>
  );
}
