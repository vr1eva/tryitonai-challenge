import Head from 'next/head';
import images from "./images.json"
import { CldImage } from 'next-cloudinary';
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data, error } = useSWR('/api/staticdata', fetcher);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>

      <main className="container">
        {/* {images.map(url => (
          <p>{url}</p>
        ))} */}

        <CldImage
          width="600"
          height="600"
          src="<Public ID>" />

      </main>
    </div>
  );
}
