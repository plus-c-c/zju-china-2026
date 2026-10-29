import ReactDOM from "react-dom/client";
import "../containers/App/App.css";
import "../contents/home.css";
import "./standalone.css";
import { StandaloneHome } from "./StandaloneHome";

window.history.scrollRestoration = "manual";

ReactDOM.createRoot(document.getElementById("root")!).render(<StandaloneHome />);
