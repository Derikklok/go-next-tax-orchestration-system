import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Next</h1>
      <Link href="/about" className="text-blue-600 m-5 hover:underline">
        About
      </Link>
      <Link href="/tasks" className="text-blue-600 hover:underline">
        Tasks
      </Link>
    </div>
  );
}
