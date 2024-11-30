import { useState } from "react"
import { Link } from "react-router-dom"
import { CrossIcon } from "../Icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import { useRef } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

enum ContentType {
   Youtube = "youtube",
   Twitter = "twitter"
}

export function CreateContentModel ({open, onClose}) {
   const titleRef=useRef();
   const linkRef=useRef<HTMLInputElement>();
   const [type, setType] = useState("youtube");

   async function addContent () {
      const title = titleRef.current?.value;
      const link = linkRef.current?.value;

      await axios.post(`${BACKEND_URL}/api/v1/content`, {
         link,
         title,
         type
      }, {
         headers: {
            "Authorization": localStorage.getItem("token")
         }
      } )

   }

  return <div>
        {open && <div>
         <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
            
       </div>
       <div className="w-screen h-screen fixed left-0 flex justify-center">
       <span className="bg-white opacity-100 p-4 rounded fixed">
                <div className="flex justify-end">
                    <div onClick={onClose} className="cursor-pointer">
                      <CrossIcon />
                    </div>
                </div>
                <div>
                   <Input reference={titleRef} placeholder={"Title"} />
                   <Input reference={linkRef} placeholder={"Link"} />
                   <div>
                     <h1>Type</h1>
                     <div className="flex p-4 gap-2 justify-center">
                     <Button text="Youtube" variant={type === ContentType.Youtube ?
                     "primary" : "secondary"} onClick={() => {
                        setType(ContentType.Youtube)
                     }}></Button>
                     <Button text="Twitter" variant={type === ContentType.Twitter ?
                     "primary" : "secondary"} onClick={() => {
                        setType(ContentType.Twitter)
                     }}></Button>
                     </div>
                   </div>
                </div>
                <div className="flex justify-center">
                   <Button onClick={addContent} variant="primary" text="Submit" />
                </div>
            </span>
       </div>
       <div className="flex flex-col justify-center">
            
         </div>
      </div>}
   </div>
}

