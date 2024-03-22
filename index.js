import React, { useState } from "react"
import "./App.css"
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("");
  const [editText, setEditText] = useState("");
  const [listItem, setListItem] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  

  function submitTask(prop) {
    prop.preventDefault()

    if (todo.trim() !== "") {
      const newTodo = {
        id: uuidv4(), // Generate unique ID
        text: todo,
        completed: false,
      };
  
      setListItem([...listItem, newTodo]);
    } else {
      alert("Write something now!");
    }
  
    setTodo("");
  }

  function deleteTask(id) {
    const newListItems = [...listItem].filter((item) => item.id !== id);

    setListItem(newListItems);
  }

  function toggleComplete(id) {
    const newListItems = [...listItem].map((item) => {
      if (item.id === id) {
        item.completed = !item.completed
      }
      return item
    })

    setListItem(newListItems)
  }

  function editTask(id) {
    const newListItems = [...listItem].map((item) => {
      if (item.id === id && editText !== "") {
        item.text = editText
      }
      return item
    })
    setListItem(newListItems)
    setEditingTask(null)
    setEditText("")
  }

  return (
    <div className="task">
      <div
        style={{
          textAlign: "center",
          color: "rgb(3, 0, 0)",
        }}>
        <h1>To-do List</h1>
      </div>

      <h3>Tasks : {listItem.length} </h3>

      <div className="list">
        {listItem.map((item) => (
          <div className="todoItem" key={item.id}>
            <div className="text-Section">
              <input
                type="checkbox"
                onChange={ () => toggleComplete(item.id)}
                checked={item.completed}
                className="checkbox"
              />
              {editingTask === item.id ? (
                <input
                  type="text"
                  placeholder={item.text}
                  onChange={(e) => setEditText(e.target.value)}
                  value={editText}
                  className="todoInput editInput"
                />
              ) : (
                <div className="todoTask">{item.text}</div>
              )}
            </div>

            <div className="activitySection">
              {editingTask === item.id ? (
                <button
                  onClick={() => editTask(item.id)}
                  className="activityBtn"
                >
                  Submit Task
                </button>
              ) : (
                <button
                  onClick={() => setEditingTask(item.id)}
                  className="activityBtn"
                >
                  {" "}
                  Edit Task
                </button>
              )}

              <button
                onClick={() => deleteTask(item.id)}
                className="activityBtn delete"
              >
                Delete Task
              </button>
            </div>
          </div>
        ))}

        <form onSubmit={submitTask} className="todoForm">
          <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            className="todoInput"
            placeholder="New Task"
          />
          <button className="todoBtn" type="submit">
            Add Task
          </button>
        </form>
      </div>
    </div>
  )
}
export default App