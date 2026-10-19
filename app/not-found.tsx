import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col justify-center px-5 py-24 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-mark">404 — Not found</p>
      <h1 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-6xl">
        Nothing on this page.{" "}
        <Link href="/" className="underline decoration-mark decoration-2 underline-offset-8 hover:text-pool">
          Head home →
        </Link>
      </h1>
    </main>
  );
}
