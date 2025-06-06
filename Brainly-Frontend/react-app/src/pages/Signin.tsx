import { Button } from "../Components/Button"
import { Input } from "../Components/Input"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
//const BACKEND_URL = process.env.BACKEND_URL;
import { BACKEND_URL } from "../config"

 export function Signin () {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  async function signin () {
     try {const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;
     const response = await axios.post(BACKEND_URL + "/signin", {
              username,
              password
      })

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      // redirect user to the dashboard
      navigate("/dashboard");
     } catch (error) {
        // You can add more specific error handling based on error.response.status
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.message || "Failed to sign in");
        } else {
          alert("An unexpected error occurred");
        }
      }


  }
return (
  <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center px-8 sm:px-6 lg:px-8">
  <div className="bg-white rounded-xl border p-8 w-full max-w-sm sm:max-w-md">
    <h2 className="text-center text-2xl sm:text-3xl mb-4">Sign in</h2>
    <div className="flex flex-col justify-center items-center gap-4">
      <Input reference={usernameRef} placeholder="Username" />
      <Input reference={passwordRef} placeholder="Password" />
    </div>
    <div className="flex justify-center mt-4 sm:px-8 sm:text-lg relative z-10 w-full px-4 py-2 rounded-md text-lg font-semibold transition-transform duration-150 ease-out">
      <Button onClick={signin} variant="primary" text="Sign In" fullWidth={true} />
    </div>
    <div className="flex justify-center mt-2">
          <p className="text-xs text-muted-foreground">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="font-smallS text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
  </div>
</div>
)
}