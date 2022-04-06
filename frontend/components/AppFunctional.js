import React, { useState } from "react";
import axios from "axios";

const URL = "http://localhost:9000/api/result";
const initialState = {
  grid: [null, null, null, null, "B", null, null, null, null],
  message: "",
  form: {
    x: 2,
    y: 2,
    steps: 0,
    email: "",
  },
};

export default function AppFunctional(props) {
  const [grid, setGrid] = useState([null, null, null, null, "B", null, null, null, null]);
  const [message, setMessage] = useState("");
  const [x, setX] = useState(2);
  const [y, setY] = useState(2);
  const [steps, setSteps] = useState(0);
  const [email, setEmail] = useState("");
  
  const updateLocation = (id) => {
 
    if (id === "left" && x != 1) {
      setX(x - 1), setSteps(steps + 1), setMessage(""), setGrid(gridSwitch(x-1,y))
    } else if (id === "right" && x != 3) {
      setX(x + 1), setSteps(steps + 1), setMessage(""),setGrid(gridSwitch(x+1,y))
    } else if (id === "up" && y != 1) {
      setY(y - 1), setSteps(steps + 1), setMessage(""),setGrid(gridSwitch(x,y-1))
    } else if (id === "down" && y != 3) {
      setY(y + 1), setSteps(steps + 1), setMessage(""),setGrid(gridSwitch(x,y+1))
    } else if (id === "reset") {
      setX(2), setY(2), setSteps(0), setMessage(""),setGrid(gridSwitch(2,2))
    } else if (id === "right" && x === 3) {
      setMessage("You can't go right");
    } else if (id === "left" && x === 1) {
      setMessage("You can't go left");
    } else if (id === "up" && y === 1) {
      setMessage("You can't go up");
    } else if (id === "down" && y === 3) {
      setMessage("You can't go down");
    }
   
  }

const gridSwitch = (x, y) => {
    if (x === 1 && y === 1) {
      return(["B", null, null, null, null, null, null, null, null]);
    } else if (x === 2 && y === 1) {
      return([null, "B", null, null, null, null, null, null, null]);
    } else if (x === 3 && y === 1) {
      return([null, null, "B", null, null, null, null, null, null]);
    } else if (x === 1 && y === 2) {
      return([null, null, null, "B", null, null, null, null, null]);
    } else if (x === 2 && y === 2) {
      return([null, null, null, null, "B", null, null, null, null]);
    } else if (x === 3 && y === 2) {
      return([null, null, null, null, null, "B", null, null, null]);
    } else if (x === 1 && y === 3) {
      return([null, null, null, null, null, null, "B", null, null]);
    } else if (x === 2 && y === 3) {
      return([null, null, null, null, null, null, null, "B", null]);
    } else if (x === 3 && y === 3) {
      return([null, null, null, null, null, null, null, null, "B"]);
    }
  }
  

    
const onSubmit = (evt) => {
      evt.preventDefault()
      addNew()
      setEmail('')
    }
const addNew =() => {
      const newForm = {
        x: x,
        y :y,
        steps : steps,
        email: email,
      }
      console.log(newForm)
    axios.post(URL, newForm)
    .then(res => {
      console.log(res)
      setMessage(res.data.message)
      })
   
    .catch(err => {
     
    setMessage(err.response.data.message)
  })}
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({x},{y} )
        </h3>
        <h3 id="steps">
          You moved {steps} {`${steps === 1 ? "time" : "times"}`}
        </h3>
      </div>
      <div id="grid">
        <div className={`square${grid[0] ? " active" : ""}`}>{grid[0]}</div>
        <div className={`square${grid[1] ? " active" : ""}`}>{grid[1]}</div>
        <div className={`square${grid[2] ? " active" : ""}`}>{grid[2]}</div>
        <div className={`square${grid[3] ? " active" : ""}`}>{grid[3]}</div>
        <div className={`square${grid[4] ? " active" : ""}`}>{grid[4]}</div>
        <div className={`square${grid[5] ? " active" : ""}`}>{grid[5]}</div>
        <div className={`square${grid[6] ? " active" : ""}`}>{grid[6]}</div>
        <div className={`square${grid[7] ? " active" : ""}`}>{grid[7]}</div>
        <div className={`square${grid[8] ? " active" : ""}`}>{grid[8]}</div>
      </div>
      <div className="info">
        <h3 id="message"> {message} </h3>
      </div>
      <div id="keypad">
        <button onClick={(evt) => updateLocation("left")} id="left">
          LEFT
        </button>
        <button onClick={(evt) => updateLocation("up")} id="up">
          UP
        </button>
        <button onClick={(evt) => updateLocation("right")} id="right">
          RIGHT
        </button>
        <button onClick={(evt) => updateLocation("down")} id="down">
          DOWN
        </button>
        <button onClick={(evt) => updateLocation("reset")} id="reset">
          reset
        </button>
      </div>
      <form>
        <input onChange={evt => setEmail(evt.target.value)} id="email" type="email" placeholder="type email" value= {email}></input>
        <input onClick={evt => onSubmit(evt)} id="submit" type="submit"></input>
      </form>
    </div>
  );
}


