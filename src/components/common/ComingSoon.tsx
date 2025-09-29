const ComingSoon = ({ message = "This page is coming soon!" }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh]">
    <h2 className="text-4xl font-bold mb-4">Coming Soon</h2>
    <p className="text-lg text-gray-600">{message}</p>
  </div>
);

export default ComingSoon;
