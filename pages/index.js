import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>TryitonAI Challenge</title>
      </Head>

      <main className="flex place-content-center">
        <Link href="/dashboard" className="text-3xl font-bold underline">Enter</Link>
      </main>
    </div>
  );
}
