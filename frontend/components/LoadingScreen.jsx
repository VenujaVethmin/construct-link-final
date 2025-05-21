import {
    ClockIcon
} from "@heroicons/react/24/outline";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <ClockIcon className="h-5 w-5 text-orange-500 animate-spin" />
        <span className="text-white">Loading ...</span>
      </div>
    </div>
  );
}

export default LoadingScreen