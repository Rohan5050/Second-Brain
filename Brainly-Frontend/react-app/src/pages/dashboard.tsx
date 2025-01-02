import { useState, useEffect } from 'react'
import { Card } from '../Card'
import { Button } from '../Components/Button'
import { CreateContentModel } from '../Components/CreateContentModel'
import { Plusicon } from '../Icons/Plusicon'
import { Shareicon } from '../Icons/Shareicon'
import { Sidebar } from '../Components/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Dashboard() {
   const [modelOpen, setModelOpen] = useState(false);
    const contents: CardProps[] = useContent();

/*
  // Sync filteredContent with contents
  useEffect(() => {
    setFilteredContent(contents);
  }, [contents]);

  const [filteredContent, setFilteredContent] = useState<CardProps[]>(contents);

  const handleFilteredContent = (type: "twitter" | "youtube"): void => {
    if(!type) {
      setFilteredContent(contents);
    } else {
    const filtered = contents.filter((item) => item.type === type);
    setFilteredContent(filtered);
    }
  };*/

  const [filteredContent, setFilteredContent] = useState<CardProps[]>([]);
  const [filterType, setFilterType] = useState<"twitter" | "youtube" | null>(null); // Track active filter

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

  


  return <div>
    <Sidebar onFilter={handleFilteredContent} />
    <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
    <CreateContentModel open={modelOpen} onClose={() => setModelOpen(false)} />
    <div className='flex justify-end gap-4 pb-4'>
       <Button onClick= {() => {
        setModelOpen(true)
       }} variant="primary" text="Add Content" startIcon={<Plusicon />}></Button>
       <Button onClick={ async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
          share: true
        },  {
          headers: {
            "Authorization":localStorage.getItem("token")
          }
        });
        const shareUrl =`http://localhost:5173/share/${response.data.hash}`;
        alert(shareUrl);
       }} variant="secondary" text="Share Brain" startIcon={<Shareicon />}></Button>
   </div>
    <div className='flex gap-4 flex-wrap'>
      {filteredContent.map(({type, link, title}) => <Card 
        key={link}
        type={type}
        link={link} 
        title={title} 
      />)}

    </div>
  </div>
  </div>
}


