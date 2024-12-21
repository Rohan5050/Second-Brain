import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../Components/Button"
import { Input } from "../Components/Input"

import axios from "axios"
import { BACKEND_URL } from "../config"

 export function Signup () {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup () {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
       await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password
        })
        
        navigate("/signin")
        alert("You have signed up!")

    }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl boder min-w-48 p-8">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center">
               <Button onClick={signup} variant="primary" text="Signup" fullWidth={true} />
            </div>
        </div>
    </div>
  )
}