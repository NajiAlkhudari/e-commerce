export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-screen-xl px-4 py-8">
        <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
          {Array(12)
            .fill(null)
            .map((_, index) => (
              <li
                key={index}
                className="animate-pulse space-y-3 flex flex-col bg-gray-300 rounded-lg shadow-lg p-4"
              >
                <div className="bg-gray-400 h-40 w-full rounded-md"></div> 
                <div className="bg-gray-400 h-6 w-3/4 mx-auto rounded-md"></div> 
                <div className="bg-gray-400 h-4 w-1/2 mx-auto rounded-md"></div>
                <div className="bg-gray-400 h-10 w-full rounded-md"></div> 
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
