import  ReactDOM  from "react-dom/client";
import { APP } from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS + Popper.js
import { MyProvider } from "./context/context";
let root=ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <MyProvider>

    <BrowserRouter> 
            <APP/>
    </BrowserRouter> 
    </MyProvider>



)