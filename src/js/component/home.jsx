import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [inputValue, setInputvalue] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    getTodo();
  }, []);
  const getTodo = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/Rayferg")
      .then((resp) => resp.json())
      .then((data) => setTodos(data));
  };
  const addTodo = (e) => {
    e.key === "Enter" &&
      setTodos(todos.concat({ label: inputValue, done: false }));
  };

  return (
    <div className="container">
      <h1>My Todos</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputvalue(e.target.value)}
            value={inputValue}
            onKeyPress={(e) => addTodo(e)}
            placeholder="What do you need to do?"
          ></input>
        </li>
        {todos.map((item, index) => (
          <li>
            {item.label}
            {""}
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() =>
                setTodos(
                  todos.filter((t, currentIndex) => index != currentIndex)
                )
              }
            ></FontAwesomeIcon>
          </li>
        ))}
      </ul>
      <div>{todos.length} tasks</div>
    </div>
  );
};

export default Home;
