import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Components/Button"
import { Input } from "../Components/Input"
//const BACKEND_URL = process.env.BACKEND_URL;
import { BACKEND_URL } from "../config"; // Ensure BACKEND_URL is set in config or environment variable

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            alert("Please provide both username and password.");
            return;
        }

        try {
            // Make the API call to the backend signup endpoint
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
            });

            alert("You have signed up!");
            navigate("/signin");  // Redirect to the Sign In page after successful signup
        } catch (error) {
            console.error("Signup Error:", error);
            alert("An error occurred during signup. Please try again.");
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center px-8 sm:px-6 lg:px-8">
       <div className="bg-white rounded-xl border p-8 w-full max-w-sm sm:max-w-md">
          <h2 className="text-center text-2xl sm:text-3xl mb-4">Signup</h2>
       <div className="flex flex-col justify-center items-center gap-4">
         <Input reference={usernameRef} placeholder="Username" />
         <Input reference={passwordRef} placeholder="Password" />
       </div>
       <div className="flex justify-center mt-4 sm:px-8 sm:text-lg relative z-10 w-full px-4 py-2 rounded-md text-lg font-semibold transition-transform duration-150 ease-out">
          <Button onClick={signup} variant="primary" text="Sign Up Now" fullWidth={true} />
        </div>
       </div>
       </div>
        
    );
}

