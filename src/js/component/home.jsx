import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [inputValue, setInputvalue] = useState("");
  const [todos, setTodos] = useState([]);
  const apiUrl = "https://assets.breatheco.de/apis/fake/todos/user/Rayferg";
  useEffect(() => {
    getTodo();
  }, []);
  const getTodo = () => {
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((data) => setTodos(data))
      .catch((error) => {
        //error handling
        console.log(error);
      });
  };
  const addTodo = (e) => {
    if (e.key === "Enter") {
      let newList = todos.concat({ label: inputValue, done: false });

      setTodos(newList)
      updateList(newList);
      // next step finish add with fetch
    }
  };
  const updateList = (newList) => {
    fetch(apiUrl, {
      method: "PUT",
      body: JSON.stringify(newList),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      //  .then((data) => setTodos(data))
     

      .catch((error) => {
        //error handling
        console.log(error);
      });
  };
  const deleteToDo = (index) => {
    let newList =  todos.filter((t, currentIndex) => index != currentIndex)
    setTodos(
     newList
    )
    updateList(newList)
  }
  

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
                deleteToDo(index)
               
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
