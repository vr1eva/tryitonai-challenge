
import useSWR from 'swr';
import {useState} from "react"
import { CldImage } from 'next-cloudinary';


export default function Dashboard() {
  const [selectedImageId, setSelectedImageId] = useState(null);
  const { data, error } = useSWR('/api/staticdata', async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });
  const handleImageClick = (id) => {
    setSelectedImageId(id);
  };
  
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  const parsed = JSON.parse(data)
  console.log(parsed.images)
  return (
    <div className="grid grid-cols-5 gap-4">
     {parsed.images.map((imageId, index) => (
        <CldImage
        key={index}
        className={`cursor-pointer rounded-lg object-cover h-full w-full`}
        width="600"
        height="600"
        src={imageId}
        onClick={() => handleImageClick(imageId)} />
     ))}
    </div>
  );
}
