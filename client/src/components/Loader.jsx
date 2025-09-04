import { useSelector } from "react-redux";
const Loader = ({ message }) => {
  const { loading } = useSelector(state => state.loader);
  if (!loading) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-95 backdrop-blur-sm">
      {/* Pulsing Dot */}
      <div className="mt-6 flex space-x-2">
        <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce"></span>
        <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce [animation-delay:200ms]"></span>
        <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce [animation-delay:400ms]"></span>
      </div>

      {/* Message */}
      <span className="mt-6 text-gray-800 font-semibold text-lg tracking-wide">
        {message || "Loading, please wait..."}
      </span>
    </div>
  );
};

export default Loader;
