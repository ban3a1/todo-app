import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function ToDo() {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [result, setResult] = useState("");
  const [task, setTask] = useState();
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef();

  const onDelete = (id) => {
    axios.delete(`${BASE_URL}/tasks`, { data: { id, user: result.user } });
    setTasks((prevTask) => {
      const newArray = prevTask.filter((el, i) => {
        return i !== id;
      });
      return newArray;
    });
  };

  const handleAdd = () => {
    axios.put(`${BASE_URL}/tasks`, { task, user: result.user });
    setTasks((prevTask) => {
      return [...prevTask, task];
    });
    inputRef.current.value = "";
  };

  useEffect(() => {
    const token = cookies.get("TOKEN");
    const configuration = {
      method: "get",
      url: `${BASE_URL}/user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configuration)
      .then((result) => {
        setResult(result.data);
        setTasks(result.data.tasks);
      })
      .catch((error) => {
        error = new Error();
      });
  }, [BASE_URL]);

  return (
    <div className="m-5">
      <h3>New task</h3>
      <div className="d-flex pt-1 mt-0 gap-5">
        <input
          type="text"
          className="form-control w-75"
          ref={inputRef}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <button className="btn btn-primary w-25" onClick={handleAdd}>
          Add
        </button>
      </div>
      <div className="mt-3">
        <h3>Tasks</h3>
        <ul className="list-group">
          {tasks.map((task, id) => {
            return (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={id}
              >
                {task}
                <button onClick={() => onDelete(id)} className="btn btn-danger">
                  x
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
