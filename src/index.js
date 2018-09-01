import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import "./index.css";

const initialState = {
  time: new Date(),
  timeColor: "#f88"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_TIME":
      return {
        ...state,
        time: new Date()
      };

    case "CHANGE_COLOR":
      return {
        ...state,
        timeColor: action.timeColor
      };

    default:
      return state;
  }
};

const store = createStore(reducer);

setInterval(() => {
  store.dispatch({ type: "CHANGE_TIME" });
}, 1000);

const Clock = props => (
  <div style={{ color: props.timeColor }} className="example-clock">
    {props.time}
  </div>
);

const ColorInput = props => (
  <div>
    Time Color:{" "}
    <input
      type="text"
      value={props.timeColor}
      onChange={e => props.changeColor(e.target.value)}
    />
  </div>
);

const App = props => (
  <div>
    <h1>Hello world, it is now</h1>
    <Clock time={props.time} timeColor={props.timeColor} />
    <ColorInput timeColor={props.timeColor} changeColor={props.changeColor} />
  </div>
);

const ConnectedApp = connect(
  state => ({
    time: state.time.toTimeString().split(" ")[0],
    timeColor: state.timeColor
  }),
  dispatch => ({
    changeColor: newColor =>
      dispatch({
        type: "CHANGE_COLOR",
        timeColor: newColor
      })
  })
)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("root")
);
