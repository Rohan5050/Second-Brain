/*import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { Sidebaritem } from "./Sidebaritem";
import { Logo } from "../Icons/Logo";

interface SidebarProps {
  onFilter: (type: "twitter" | "youtube") => void;
  className?:string;
}



 export function Sidebar ({onFilter}: SidebarProps) {
  return (<div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-2">
    <div className="flex text-2xl pt-8 items-center">
        <div className="pl-2 pr-6 text-purple-400">
            <Logo />
        </div>
        Second Brain
    </div>
    <div className="pt-8 pl-4">
      <Sidebaritem  text="Twitter" icon={<TwitterIcon />} onClick={() => onFilter("twitter")} />
      <Sidebaritem text="Youtube" icon={<YoutubeIcon />}  onClick={() => onFilter("youtube")} />
    </div>
  </div>
  )
}
*/

import { useState, useEffect } from "react";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { Sidebaritem } from "./Sidebaritem";
import { Logo } from "../Icons/Logo";

interface SidebarProps {
  onFilter: (type: "twitter" | "youtube") => void;
  className?:string;
}

export function Sidebar({ onFilter }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar open state

  // Detect screen size and automatically close sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false); // Close sidebar on small screens
      } else {
        setIsSidebarOpen(true); // Keep sidebar open on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once on initial load to check the screen size

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Sidebar: Visible on large screens, collapsed on smaller screens */}
      <div
        className={`fixed left-0 top-0 h-screen bg-white border-r transition-all duration-300 ${
          isSidebarOpen ? "w-72" : "w-0 sm:w-0"
        } md:w-72 z-10 overflow-hidden`}
      >
        <div className="flex text-2xl pt-8 items-center">
        <div className="pl-6 pr-6 text-purple-400">
            <Logo />
        </div>
        Second Brain
    </div>
        <div className="pt-8 pl-4">
          <Sidebaritem
            text="Twitter"
            icon={<TwitterIcon />}
            onClick={() => onFilter("twitter")}
          />
          <Sidebaritem
            text="Youtube"
            icon={<YoutubeIcon />}
            onClick={() => onFilter("youtube")}
          />
        </div>
      </div>

      {/* Sidebar toggle button (only visible on smaller screens) */}
      <button
        className="fixed bottom-4 right-4 bg-purple-500 text-white p-4 rounded-full md:hidden z-20"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "Close" : "Open"}
      </button>
    </div>
  );
}
