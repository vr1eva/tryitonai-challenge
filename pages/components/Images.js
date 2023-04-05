import useSWR from "swr"
import { useState } from 'react'
import { CldImage } from 'next-cloudinary';

const Image = () => {
   const [selectedImageId, setSelectedImageId] = useState(null);
  const { data, error } = useSWR('/api/staticdata', async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  const parsed = JSON.parse(data)

   return (
    <>
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-800 tracking-tight mb-4">50 cat photos found</h1>
    <p className="text-xl sm:text-xl md:text-2xl  leading-tight text-gray-500 tracking-tight mb-4">Click on edit to turn them blue</p>
      <div className="grid grid-cols-5 gap-4">
         {parsed.images.map((imageId) => (
            <div className="relative ">
               <CldImage
                  alt="cat pic"
                  key={imageId}
                  className={`${selectedImageId === imageId ? "bg-black w-full h-full object-contain cursor-pointer fixed top-0 left-0 w-screen h-screen z-50" : "cursor-pointer rounded-lg w-64 h-64 object-cover"}`}
                  width="600"
                  tint={ selectedImageId === imageId? "equalize:80:blue:blueviolet": ""}
                  height="600"
                  src={imageId} />
                   {selectedImageId === imageId && (
          <button className="fixed top-4 right-4 bg-white p-2 rounded-md shadow-md text-red-800 hover:bg-gray-100 z-50" onClick={() => setSelectedImageId(null)}>
            Cerrar
          </button>
        )}
               <div className="flex space-x-6 absolute bottom-0">
                  <button 
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setSelectedImageId(imageId)}
                  >Edit</button>
                  <button className="px-4 py-2 relative inline-block px-8 py-2 font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-800">
                     <span className="relative">Request Edit</span>
                  </button>
               </div>

            </div>
         ))}
      </div>
   </>
   )
}
export default Image