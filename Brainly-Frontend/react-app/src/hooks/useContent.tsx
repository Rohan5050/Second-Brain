import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);
  //const [error, setError] = useState<string | null>(null);

  // Refresh the content (GET request)
  function refresh() {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing");
      return;
    }

    return axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          "Authorization": `Bearer ${token}`, // Send token with "Bearer" prefix
        },
      })
      .then((response) => {
        setContents(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  }

  // Add new content (POST request)
 /* function addContent(newContent: { link: string; type: string; title: string }) {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing");
      return;
    }

    return axios
      .post(
        `${BACKEND_URL}/content`,
        {
          link: newContent.link,
          type: newContent.type,
          title: newContent.title,
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`, // Send token with "Bearer" prefix
          },
        }
      )
      .then(() => {
        refresh(); // Refresh content after adding new content
      })
      .catch((error) => {
        console.error("Error adding content:", error);
        setError("Failed to add content.");
      });
  }*/

  useEffect(() => {
    refresh();

    const interval = setInterval(() => {
      refresh();
    }, 10 * 1000); // Refresh every 10 seconds

    return () => {
      clearInterval(interval); // Clean up interval on component unmount
    };
  }, []);

  return { contents,/* addContent, error*/ };
}





/*import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);

  function refresh() {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing");
      return;
    }

    return axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          "Authorization": `Bearer ${token}`, // Send token with "Bearer" prefix
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

  return contents;
}

*/




