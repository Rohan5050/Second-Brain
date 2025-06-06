import { ReactElement } from "react";

export function Sidebaritem({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: ReactElement;
  onClick?: () => void; // Optional onClick handler
}) {
  return (
    <div
      className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-150"
      onClick={onClick} // Add onClick handler here
    >
      <div className="p-2">{icon}</div>
      <div className="p-2">{text}</div>
    </div>
  );
}


