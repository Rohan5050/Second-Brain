import { Button } from "../Components/Button"
import { Input } from "../Components/Input"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"


import axios from "axios"
import { BACKEND_URL } from "../config"

 export function Signin () {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const navigate = useNavigate();

  async function signin () {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;
     const response = await axios.post(BACKEND_URL + "/signin", {
              username,
              password
      })

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      // redirect user to the dashboard
      navigate("/dashboard");


  }
return (
  <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl boder min-w-48 p-8">
          <Input reference={usernameRef} placeholder="Username" />
          <Input reference={passwordRef} placeholder="Password" />
          <div className="flex justify-center">
             <Button onClick={signin} variant="primary" text="Signin" fullWidth={true} />
          </div>
      </div>
  </div>
)
}