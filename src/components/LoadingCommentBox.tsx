import LoadingSpinner from "@/components/spinner/LoadingSpinner";

const LoadingCommentBox = () => {
  return (
    <div className="flex justify-center items-center bg-white border border-gray-100 rounded-xl rounded-tl-none w-[100px] h-[52px]">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingCommentBox;
