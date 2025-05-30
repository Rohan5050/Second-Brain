import { useState, useRef } from "react";
import { CrossIcon } from "../Icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModel({ open, onClose }: CreateContentModelProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState("youtube");
  const [fieldErrors, setFieldErrors] = useState<{ title?: string; link?: string }>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  async function addContent() {
    const title = titleRef.current?.value?.trim();
    const link = linkRef.current?.value?.trim();

    const errors: { title?: string; link?: string } = {};
    if (!title) errors.title = "Title is required";
    if (!link) errors.link = "Link is required";

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      await axios.post(
        `${BACKEND_URL}/content`,
        { link, title, type },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setGlobalError(null);
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error creating content:", error.message);
      }
      setGlobalError("Failed to create content. Please check your inputs or token.");
    }
  }

  return (
    <div>
      {open && (
      <div>
        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 z-40"></div>
        <div className="w-screen h-screen fixed left-0 flex justify-center items-center z-50">
        <div className="bg-white opacity-100 p-4 sm:p-6 m-6 rounded shadow-lg w-[95%] sm:w-full max-w-md mx-2">
          <div className="flex justify-end mb-2">
          <div onClick={onClose} className="cursor-pointer p-2">
            <CrossIcon />
          </div>
          </div>
          <div className="space-y-4">
            <div className="text-center">
            <Input reference={titleRef} placeholder={"Title"} />
            {fieldErrors.title && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.title}</p>
            )}
            </div>

          <div className="text-center">
            <Input reference={linkRef} placeholder={"Link"} />
            {fieldErrors.link && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.link}</p>
            )}
          </div>

          <div>
            <h1 className="font-medium text-center sm:text-left">Type</h1>
            <div className="flex flex-col sm:flex-row mx-auto sm:w-40 p-2 gap-2 items-center sm:justify-center">
            <Button
              text="Youtube"
              variant={type === ContentType.Youtube ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Youtube)}
            />
            <Button
              text="Twitter"
              variant={type === ContentType.Twitter ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Twitter)}
            />
            </div>
          </div>

          {globalError && (
            <p className="text-red-600 text-center text-sm">{globalError}</p>
          )}

            <div className="flex justify-center pt-2">
            <Button 
              onClick={addContent} 
              variant="primary" 
              text="Submit"
            />
            </div>
          </div>
        </div>
        </div>
      </div>
      )}
    </div>
  );
}
