export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-4 py-8">
        <div className="space-y-4 animate-pulse">
          <div className="bg-gray-400 h-6 w-3/4 mx-auto rounded-md"></div> 
          
          <div className="bg-gray-400 h-6 w-1/2 mx-auto rounded-md"></div>
          
          <div className="bg-gray-400 h-6 w-1/3 mx-auto rounded-md"></div>
          
          <div className="bg-gray-400 h-6 w-2/3 mx-auto rounded-md"></div>

          <div className="bg-gray-400 h-40 w-full rounded-md mx-auto"></div>

          <div className="bg-gray-400 h-10 w-3/4 mx-auto rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
