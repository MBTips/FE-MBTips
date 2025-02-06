const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center space-x-3">
      <div className="bg-primary-normal rounded-full w-2.5 h-2.5 animate-pulse-custom delay-400"></div>
      <div className="bg-primary-light rounded-full w-2.5 h-2.5 animate-pulse-custom delay-600"></div>
      <div className="bg-primary-pale rounded-full w-2.5 h-2.5 animate-pulse-custom delay-800"></div>
    </div>
  );
};

export default LoadingSpinner;
