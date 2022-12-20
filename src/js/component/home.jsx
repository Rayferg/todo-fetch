import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [inputValue, setInputvalue] = useState("");
  const[todos, setTodos] = useState([]);
  return (
    <div className="container">
      <h1>My Todos</h1>
      <ul>
        <li>
          <input type="text" 
		  onChange={(e) => setInputvalue(e.target.value)} 
		  value={inputValue} onKeyPress= {(e) => e.key === "Enter" && setTodos(todos.concat(inputValue))} 
		  placeholder="What do you need to do?"></input>
        </li>
        {todos.map((item, index) => (
		<li>
         {item}{""}<FontAwesomeIcon icon={faTrash} onClick={() => setTodos(
			todos.filter(
				(t, currentIndex) => index != currentIndex
				)
			)
		 }></FontAwesomeIcon>
        </li>
		))}
      </ul>
      <div>{todos.length} tasks</div>
    </div>
  );
};

export default Home;
