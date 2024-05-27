import {BrowserRouter, Routes ,Route} from "react-router-dom"
import Login from "./components/Auth/Login"
import Home from "./components/expense/Home"
import Signup from "./components/Auth/Signup"

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
