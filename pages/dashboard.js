import Head from 'next/head';
import images from "./images.json"

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>

      <main className="container">
        {images.map(url => (
          <p>{url}</p>
        ))}
      </main>

    </div>
  );
}
