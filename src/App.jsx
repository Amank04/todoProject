import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { MdOutlineEditNote } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
// import './App.css'
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let items = localStorage.getItem("todos");
      setTodos(JSON.parse(items));
      console.log(Todos);
    }
  }, []);

  const saveToLS = (Todos) => {
    localStorage.setItem("todos", JSON.stringify(Todos));
  };

  const handleAdd = () => {
    setTodos((prevTodos) => {
      const newTodos = [...Todos, { Todo, id: uuidv4(), isCompleted: false }];
      saveToLS(newTodos); // Pass the updated todos to saveToLS
      return newTodos; // Return the updated todos to setTodos
    });
    setTodo("");
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, yourDesiredId) => {
    console.log(yourDesiredId);
    const filteredTodosIndex = Todos.findIndex(
      (item) => item.id == yourDesiredId
    );
    console.log(Todos[filteredTodosIndex]);
    setTodo(Todos[filteredTodosIndex].Todo);
    const newTodos = [...Todos];

    newTodos.splice(filteredTodosIndex, 1);
    console.log(newTodos);
    setTodos(newTodos);

    saveToLS(newTodos); //saving data to localStorage.
  };
  const handleDelete = (e, yourDesiredId) => {
    console.log(yourDesiredId);
    const filteredTodosIndex = Todos.findIndex(
      (item) => item.id == yourDesiredId
    );
    const newTodos = [...Todos];
    console.log(newTodos[filteredTodosIndex]);

    newTodos.splice(filteredTodosIndex, 1);
    console.log(newTodos);
    setTodos(newTodos);

    saveToLS(newTodos); //saving data to localStorage.
  };
  const handleChange = (e) => {
    // Check the condition and show the message if needed
    if (Todo.length < 3) {
      setShowMessage(true);
    }
    // console.log(e.target.value);
    setTodo(e.target.value);
    // Todos.push(e.target.value);
    // console.log(Todos)
  };

  //Handle input using 'Enter' key.
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  // Checkbox handling function.
  const handleCheckbox = (e) => {
    const yourDesiredId = e.target.name;
    console.log(e.target.name);
    const filteredTodosIndex = Todos.findIndex(
      (item) => item.id == yourDesiredId
    );
    // console.log("filtered todo is : " + Todos[filteredTodos].id)
    console.log(filteredTodosIndex);

    //Creating new object so re-rendering takes place.
    const newTodos = [...Todos];
    newTodos[filteredTodosIndex].isCompleted =
      !newTodos[filteredTodosIndex].isCompleted;

    //set Todos to newTodos again.
    setTodos(newTodos);
    // console.log(newTodos[filteredTodosIndex]);
    saveToLS(newTodos); //saving data to localStorage.
  };

  return (
    <>
      <div className="w-full h-fit">
        <NavBar />
        <div className="container bg-purple-200 py-2 px-3 m-5 rounded-xl mx-auto min-h-[75vh] h-fit w-[60%] min-h-80 overflow-auto">

          <div className={`  ${Todos.length == 0 ? "my-[16%]" : ""}`}>
            <h1 className="text-center my-3 text-3xl font-serif font-medium mt-0">
              {" "}
              <span className="font-extrabold text-red-700 font-serif">
                e-Task:{" "}
              </span>
              A place for all your todos.
            </h1>
            <h2 className="text-lg font-bold text-center">Add a Todo</h2>
            <div className="addTodo sm:flex my-4 w-[70%] mx-auto justify-center ">
              <input
                type="text"
                autoFocus
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                value={Todo}
                className="w-full sm:w-[60%] h-8 rounded-sm border border-solid border-purple-400 focus:border-purple-950 focus:outline-none overflow-hidden "
              />
              <button
                onClick={handleAdd}
                disabled={Todo.length < 3}
                className="bg-purple-800 hover:bg-purple-950 disabled:bg-purple-300 text-white w-full sm:w-fit sm:mx-5 p-2 py-1 rounded-md text-xs sm:text-sm font-bold"
              >
                Save
              </button>
            </div>

            {/* Show finished todos or NOT. */}
            <div className="justify-center flex mx-auto">
              <input
                type="checkbox"
                onChange={toggleFinished}
                checked={showFinished}
                className="mx-1"
              />
              <div>Show finished items.</div>
            </div>

            {showMessage && Todo.length < 3 && (
              <p className="text-red-500 text-center">
                Your todo must contain atleast <b>3</b> characters.
              </p>
            )}
          </div>
          <div className="bg-black h-[1px] w-[70%] mx-auto my-2"></div>

          <h2 className="font-bold text-lg text-center mt-5">Your Todos</h2>

          {Todos.length == 0 && (
            <div className="mx-auto shadow-lg w-fit my-7">
              No todos to show.
            </div>
          )}
          <div className="todos lg:w-[70%]  mx-auto justify-center">
            {Todos.map((item) => {
              // console.log("I am rendering");
              return (
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="todo w-full justify-between my-3 flex"
                  >
                    <div className="flex">
                      <input
                        type="checkbox"
                        name={item.id}
                        onChange={handleCheckbox}
                        checked={item.isCompleted}
                        className="mx-2"
                      />
                      <div
                        className={`flex font-serif sm:text-2xl  ${
                          item.isCompleted ? "line-through" : ""
                        }`}
                      >
                        {item.Todo}
                      </div>
                    </div>
                    <div className="buttons mx-5">
                      <button
                        onClick={(e) => {
                          handleEdit(e, item.id);
                        }}
                        className="bg-purple-800 hover:bg-purple-950 text-white mx-1 sm:mx-2 p-1 sm:p-2 rounded-md"
                      >
                        <MdOutlineEditNote />
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className="bg-purple-800 hover:bg-purple-950 text-white mx-1 sm:mx-2 my-1 p-1 sm:p-2 rounded-md"
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
