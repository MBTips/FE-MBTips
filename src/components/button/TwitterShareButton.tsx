const TwitterShareButton = ({ title }: { title: string }) => {
  const currentUrl = window.location.href;

  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${title}&url=${currentUrl}`}
      className="flex flex-col items-center gap-1"
    >
      {/* 디자인 시안 나오면 고칠 예정 -> 4.17 정준영 */}
      <img src="/icon/twitter.svg" alt="트위터 아이콘" width={76} height={76} />
      <p className="text-md text-gray-800">트위터</p>
    </a>
  );
};

export default TwitterShareButton;
