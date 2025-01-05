import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function useContent(): { contents: CardProps[] } {
  const [contents, setContents] = useState<CardProps[]>([]);

  function refresh() {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing");
      return;
    }

    return axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token with "Bearer" prefix
        },
      })
      .then((response) => {
        setContents(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  }

  useEffect(() => {
    refresh();

    const interval = setInterval(() => {
      refresh();
    }, 10 * 1000); // Refresh every 10 seconds

    return () => {
      clearInterval(interval); // Clean up interval on component unmount
    };
  }, []);

  return { contents };
}
