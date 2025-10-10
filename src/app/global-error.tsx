"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-4">
          <h2 className="text-2xl font-semibold">Something went wrong</h2>
          {error?.digest && (
            <p className="text-sm text-muted-foreground">Error ID: {error.digest}</p>
          )}
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
