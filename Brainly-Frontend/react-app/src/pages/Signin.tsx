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
  <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">
            <div className="bg-white rounded-xl border p-8 w-full max-w-md">
            <h2 className="text-center text-3xl mb-4">Sign in</h2>
            <div className="flex flex-col justify-center items-center">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password"/>
            </div>
            <div className="flex justify-center mt-4 p-8 text-lg">
                <Button onClick={signin} variant="primary" text="Sign In" fullWidth={true} />
            </div>
            </div>
        </div>
)
}