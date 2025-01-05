const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Unauthorized Access
        </h1>
        <p className="text-gray-600">
          You don't have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
