import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export function useContent () {

    const [contents, setContents] = useState([]);

    function refresh () {
        return axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        .then((response) => {
            setContents(response.data.content)
        })
        .catch((error) => {
            console.error("Error fetching content:", error);
        });
    }

    useEffect(() => {
        refresh()
        
        const interval=setInterval(() => {
            refresh()

        }, 10 * 1000)

      return () => {
        clearInterval(interval);
      }
    }, [])

  return contents;
}
