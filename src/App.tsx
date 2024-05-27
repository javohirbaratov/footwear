import { ToastContainer } from "react-toastify";
import "./App.css";
import Router from "./Router";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <Router />
      <ToastContainer position="top-center" closeOnClick />
    </>
  );
}
