// app/loading.js
// Shows during page transitions - improves perceived performance

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          {/* Spinner */}
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          Loading drill...
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Preparing your training session
        </p>
      </div>
    </div>
  );
}