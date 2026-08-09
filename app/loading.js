export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas" role="status" aria-label="Loading">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-ink-1 text-lg font-medium animate-pulse">
          Loading drill...
        </p>
        <p className="text-ink-3 text-sm mt-1">
          Preparing your free training session
        </p>
        <span className="sr-only">Loading SkillDrills training drill. Please wait.</span>
      </div>
    </div>
  );
}