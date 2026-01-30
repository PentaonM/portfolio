import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <html>
      <body className="h-screen">
        <main className="flex h-screen items-center justify-center text-center">
          <h1 className="relative !z-50 text-6xl font-semibold">
            Page not found
          </h1>
        </main>
      </body>
    </html>
  );
}
