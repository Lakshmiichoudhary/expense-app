import {BrowserRouter, Routes ,Route} from "react-router-dom"
import Login from "./components/Auth/Login"
import Home from "./components/expense/Home"
import Signup from "./components/Auth/Signup"
import LeaderBoard from "./components/expense/LeaderBoard"
import ForgotPassword from "./components/Auth/ForgotPassword"

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/leaderboard" element={<LeaderBoard />}></Route>
      <Route path="/password" element={<ForgotPassword />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
