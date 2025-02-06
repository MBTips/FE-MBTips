import LoadingSpinner from "./spinner/LoadingSpinner";

const LoadingCommentBox = () => {
  return (
    <div className="flex justify-center items-center border-gray-100 bg-white border rounded-xl rounded-tl-none w-[100px] h-[52px]">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingCommentBox;
