//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.css file into the bundle
import "../styles/index.css";

//import your own components
import { Todo } from "./component/todo.js";

//render your react application
ReactDOM.render(<Todo />, document.querySelector("#app"));
