import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/result'
const initialState ={
grid: [null, null, null, null, "B", null, null, null, null],
message : '',
form : {
  'x' : 2,
  'y' : 2,
  'steps' : 0,
  'email' : '' 
},

}


export default class AppClass extends React.Component {
constructor(props) {
  super(props)
  this.state = initialState
}
updateLocation = (id) =>{
  const form = this.state.form
if (id === 'left' && form.x != 1) {form.x = form.x-1, form.steps = form.steps + 1,this.state.message = ''}
 else if (id === 'right' && form.x != 3) {form.x = form.x+1, form.steps = form.steps + 1,this.state.message = '' }
 else if (id === 'up' && form.y != 1) {form.y = form.y-1, this.state.form.steps = this.state.form.steps + 1, this.state.message = ''}
 else if (id === 'down' && form.y != 3) {form.y = form.y+1, form.steps = form.steps + 1,this.state.message = ''}
 else if (id === 'reset'){form.x = 2, form.y = 2, form.steps = 0, this.state.message = ''}
 else if (id === 'right' && form.x === 3) {this.state.message = "You can't go right"}
 else if (id === 'left' && form.x === 1){this.state.message = "You can't go left"}
 else if (id === 'up' && form.y === 1) {this.state.message = "You can't go up"}
 else if (id === 'down' && form.y === 3){this.state.message = "You can't go down"}
 this.setState({...this.state,form: form, grid:this.gridSwitch(form.x, form.y)})
 

}

gridSwitch = (x, y) => {

 if(x ===1 && y === 1 ){return ["B", null, null, null, null, null, null, null, null]}
 else if (x === 2 && y === 1){return[null, "B", null, null, null, null, null, null, null]}
 else if (x === 3 && y === 1){return[null, null, "B", null, null, null, null, null, null]}
 else if (x === 1 && y === 2){return[null, null, null, "B", null, null, null, null, null]}
 else if(x === 2 && y === 2){return[null, null, null, null, "B", null, null, null, null]}
 else if(x === 3&& y === 2){return[null, null, null, null, null, "B", null, null, null]}
 else if(x === 1 && y === 3){return[null, null, null, null, null , null,"B", null, null]}
 else if(x === 2 && y === 3){return[null, null, null, null, null , null, null,"B", null]}
 else if(x === 3 && y === 3){return[null, null, null, null, null, null, null, null, "B"]}



}

onChange = (key, value) => {
this.setState({
  ...this.state,
  form: {...this.state.form, [key]: value},
})
}
updateForm = (evt) => {
const name = evt.target.name;
const value = evt.target.value;
this.onChange(name, value)
}

onSubmit = (evt) => {
  evt.preventDefault()
  this.addNew()
  this.setState({
    ...this.state,
    form: {...this.state.form, ['email']: ''},
  })
}
addNew = () =>{
  const newForm = {
    x: this.state.form.x,
    y : this.state.form.y,
    steps : this.state.form.steps,
    email: this.state.form.email,
  }
  console.log(newForm)
axios.post(URL, newForm)
.then(res => {
  console.log(res)
  this.setState({
    ...this.state,
    message: [...this.state.message, res.data.message]
  })
})
.catch(err => {
  this.setState({
    ...this.state,
    message: err.response.data.message,
  })
})
}





  render() {
    const { className } = this.props
    console.log(this.state.form.x, this.state.form.y, this.state.form.steps)
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates"> Coordinates ({this.state.form.x}, {this.state.form.y})</h3>
          <h3 id="steps">You moved {this.state.form.steps} {`${this.state.form.steps === 1 ? 'time' : 'times'}`}</h3>
        </div>
        <div id="grid">
          <div className={`square${this.state.grid[0]? ' active': ''}`}>{this.state.grid[0]}</div>
          <div className={`square${this.state.grid[1]? ' active': ''}`}>{this.state.grid[1]}</div>
          <div className={`square${this.state.grid[2]? ' active': ''}`}>{this.state.grid[2]}</div>
          <div className={`square${this.state.grid[3]? ' active': ''}`}>{this.state.grid[3]}</div>
          <div className={`square${this.state.grid[4]? ' active': ''}`}>{this.state.grid[4]}</div>
          <div className={`square${this.state.grid[5]? ' active': ''}`}>{this.state.grid[5]}</div>
          <div className={`square${this.state.grid[6]? ' active': ''}`}>{this.state.grid[6]}</div>
          <div className={`square${this.state.grid[7]? ' active': ''}`}>{this.state.grid[7]}</div>
          <div className={`square${this.state.grid[8]? ' active': ''}`}>{this.state.grid[8]}</div>
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={evt => this.updateLocation('left')} id="left">LEFT</button>
          <button onClick={evt => this.updateLocation("up")} id="up">UP</button>
          <button onClick={evt => this.updateLocation('right')} id="right">RIGHT</button>
          <button onClick={evt => this.updateLocation('down')} id="down">DOWN</button>
          <button onClick={evt => this.updateLocation('reset')}id="reset">reset</button>
        </div>
        <form>
          <input onChange={evt => this.updateForm(evt)} id="email" name = "email" value = {this.state.form.email} type="email" placeholder="type email"></input>
          <input id="submit" type="submit" onClick = {evt => this.onSubmit(evt)}></input>
        </form>
      </div>
    )
  }
}
