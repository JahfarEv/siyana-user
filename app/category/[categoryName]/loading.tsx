export default function CategoryLoading() {
  return (
    <main
      className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 py-12 text-center">
          <div className="mx-auto mb-6 h-1 w-16 animate-pulse rounded-full bg-amber-300" />
          <p role="status" className="text-lg font-medium text-gray-700">
            Loading category products…
          </p>
          <div className="mx-auto h-12 w-2/3 max-w-md animate-pulse rounded bg-gray-200" />
          <div className="mx-auto mt-5 h-5 w-40 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <div className="aspect-square animate-pulse bg-gray-200" />
              <div className="space-y-3 p-4">
                <div className="h-4 animate-pulse rounded bg-gray-200" />
                <div className="mx-auto h-4 w-1/2 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
