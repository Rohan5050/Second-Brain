import {Dashboard} from "../src/pages/dashboard"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Protectedroute from "../src/Protected_route"
function App() {
  return (
  <BrowserRouter>
   <Routes>
     <Route path="/signup" element={<Signup />} />
     <Route path="/signin" element={<Signin />} />
     <Route element={<Protectedroute />} >
        <Route path="/dashboard" element={<Dashboard />} />
     </Route>
    </Routes>
  </BrowserRouter>
)}

export default App
