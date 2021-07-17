import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import { useState, useCallback, useEffect } from "react";
import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const filters = {
    all: () => true,
    active: (todo) => !todo.isCompleted,
    completed: (todo) => todo.isCompleted,
  };

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const checkKey = useCallback(
    (e) => {
      if (e.keyCode === 13 && textInput.trim() !== '') {
        setTodoList([
          { id: v4(), name: textInput, isCompleted: false, isEditing: false },
          ...todoList,
        ]);
        setTextInput("");
      }
    },
    [textInput, todoList]
  );

  const destroy = useCallback(
    (id) => {
      let newTodoList = todoList.filter((todo) => {
        return todo.id !== id;
      });
      setTodoList(newTodoList);
    },
    [todoList]
  );

  const toggle = useCallback((todoToggle) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo === todoToggle
          ? { ...todo, isCompleted: !todoToggle.isCompleted }
          : todo
      )
    );
  }, []);

  const toggleAll = useCallback((checked) => {
    setTodoList((prevState) =>
      prevState.map((todo) => (todo = { ...todo, isCompleted: !checked }))
    );
  }, []);
  const editing = (todoEdit) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo === todoEdit ? { ...todo, isEditing: true } : todo
      )
    );
  };
  const disableEditing = (todoDisE, e) => {
    if (e.keyCode === 13 && e.target.value.trim() !== "") {
      setTodoList((prevState) =>
        prevState.map((todo) =>
          todo === todoDisE
            ? { ...todo, name: e.target.value, isEditing: false }
            : todo
        )
      );
    }
    if (e.keyCode === 27) {
      e.target.value = todoDisE.name
      setTodoList((prevState) =>
        prevState.map((todo) =>
          todo === todoDisE ? { ...todo, isEditing: false } : todo
        )
      );
    }
  };
  const disableBlur = (todoBlur, e) => {
    if(e.target.value !== ''){
    }
    else{
      e.target.value = todoBlur.name
    }
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo === todoBlur
          ? { ...todo, name: e.target.value, isEditing: false }
          : todo
      )
    );
  };
  const switchFilter = (type) => {
    setFilter(type);
  };
  const deleteCompleted = () => {
    setTodoList((prevState) =>
      prevState.filter((todo) => {
        return todo.isCompleted !== true;
      })
    );
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={textInput}
          onChange={onTextInputChange}
          onKeyUp={checkKey}
        ></input>
      </header>
      <TodoList
        todoList={todoList}
        destroy={destroy}
        toggle={toggle}
        toggleAll={toggleAll}
        editing={editing}
        disableEditing={disableEditing}
        filters={filters}
        filter={filter}
        disableBlur={disableBlur}
      />
      <Footer
        todoList={todoList}
        filters={filters}
        filter={filter}
        switchFilter={switchFilter}
        deleteCompleted={deleteCompleted}
      />
    </section>
  );
}

export default App;
