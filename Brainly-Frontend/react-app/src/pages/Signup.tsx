import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Components/Button"
import { Input } from "../Components/Input"
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
        <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">
            <div className="bg-white rounded-xl border p-8 w-full max-w-md">
            <h2 className="text-center text-3xl mb-4">Signup</h2>
            <div className="flex flex-col justify-center items-center">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password"/>
            </div>
            <div className="flex justify-center mt-4 p-8 text-lg">
                <Button onClick={signup} variant="primary" text="Signup Now" fullWidth={true} />
            </div>
            </div>
        </div>
    );
}

