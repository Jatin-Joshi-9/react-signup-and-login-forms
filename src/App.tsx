import { Toaster } from "react-hot-toast";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  )
}

export default App;
