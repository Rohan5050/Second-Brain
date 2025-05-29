import { Delete } from "../Icons/Delete";
import { Shareicon } from "../Icons/Shareicon";
//import { Editicon } from "../Icons/Editicon";
import {deleteContent} from "../Components/deleteContent"
import { CardProps } from "../types/CardProps";


export function Card ({_id,title,link,type}: CardProps){
  const handleDelete = async () => {
    await deleteContent(_id);

  }

  function extractYouTubeId(url: string): string | null {
     const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
     const match = url.match(regex);
     return match ? match[1] : null;
  }


  return ( <div>
    <div className="p-2 bg-white rounded-md shadow-md border-gray-200 max-w-72 border min-h-48 min-w-72 sm:ml-72">
        <div className="flex justify-between">
            <div className="flex items-center text-md ml-4">
                {/*<div className="text-gray-500 pr-2 cursor-pointer">
                  <Editicon />
                </div> */}
                {title}
            </div>
            <div className="flex items-center">
                <div className="mr-4 text-gray-500">
                   <a href={link} target="_blank">
                    <Shareicon />
                  </a>
                </div>
                <div className="text-red-400 cursor-pointer mt-2">
                    <Delete onClick={handleDelete} />
                </div>

            </div>
        </div>
      <div className="pt-4">
        {type === "youtube" && (() => {
       const videoId = extractYouTubeId(link);
       if (!videoId) return <p className="text-red-500">Invalid YouTube link</p>;

       return (
        <iframe
         className="w-full aspect-video"
         src={`https://www.youtube.com/embed/${videoId}`}
         title="YouTube video player"
         frameBorder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowFullScreen
        ></iframe>
       );
     })()}

        { type === "twitter" && <blockquote className="twitter-tweet">
          <a href={link.replace("x.com","twitter.com")}></a>
        </blockquote> }
       </div>
        
    </div>
    </div>
  )
}

