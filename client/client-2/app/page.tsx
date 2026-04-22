import Link from "next/link";

export default function Home() {
  return (
    <div className="m-4">
      <h1>Welcome to Next</h1>
      <Link href="/about" className="text-blue-600 m-5 hover:underline">
        About
      </Link>
      <Link href="/tasks" className="text-blue-600 m-5 hover:underline">
        Tasks
      </Link>
      <Link href="/dashboard" className="text-blue-600 m-5 hover:underline">
        Dashboard
      </Link>
    </div>
  );
}
