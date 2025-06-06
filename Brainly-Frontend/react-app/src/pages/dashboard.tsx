import { useState, useEffect } from "react";
import { Card } from "../Components/Card";
import { Button } from "../Components/Button";
import { CreateContentModel } from "../Components/CreateContentModel";
import { Plusicon } from "../Icons/Plusicon";
import { Shareicon } from "../Icons/Shareicon";
import { Sidebar } from "../Components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
//const BACKEND_URL = process.env.BACKEND_URL;
import { BACKEND_URL } from "../config";
import { CardProps } from "../types/CardProps";



export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const { contents }: { contents: CardProps[] } = useContent();

  const [filteredContent, setFilteredContent] = useState<CardProps[]>([]);
  const [filterType, setFilterType] = useState<"twitter" | "youtube" | null>(
    null
  ); // Track active filter
  const [isSharing, setIsSharing] = useState(false); // Track sharing state

  useEffect(() => {
    if (filterType) {
      const filtered = contents.filter((item) => item.type === filterType);
      setFilteredContent(filtered);
    } else {
      setFilteredContent(contents);
    }
  }, [contents, filterType]);

  const handleFilteredContent = (type?: "twitter" | "youtube"): void => {
    setFilterType(type || null); // Update filter type
  };

  const handleShare = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User is not authenticated. Please log in.");
      return;
    }

    setIsSharing(true); // Disabled button during request
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
      alert(`Shareable URL: ${shareUrl}`);
    } catch (error) {
      console.error("Error sharing brain:", error);
      alert("An error occurred while sharing.");
    } finally {
      setIsSharing(false); // Re-enable button
    }
  };

  return (
    <div>
      <Sidebar onFilter={handleFilteredContent} />
      <div className="p-4">
        <CreateContentModel open={modelOpen} onClose={() => setModelOpen(false)} />
        <div className="fixed mb-20 right-4 bottom-4 md:top-4 md:bottom-auto flex flex-col md:flex-row gap-4">
          <Button
        onClick={() => setModelOpen(true)}
        variant="primary"
        text="Add Content"
        startIcon={<Plusicon />}
          />
          <Button
        onClick={handleShare}
        variant="secondary"
        text={isSharing ? "Sharing..." : "Share Brain"}
        startIcon={<Shareicon />}
        //disabled={isSharing} // Disable while sharing
          />
        </div>

        <div className="mt-16 flex gap-4 flex-wrap">
          {filteredContent.map(({ _id,type, link, title }) => (
        <Card key={_id} _id={_id} type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}
