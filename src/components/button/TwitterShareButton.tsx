const TwitterShareButton = ({ title }: { title: string }) => {
  const currentUrl = window.location.href;

  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${title}&url=${currentUrl}`}
      className="flex flex-col items-center gap-1"
    >
      <img src="/icon/twitter.svg" alt="트위터 아이콘" width={72} height={72} />
    </a>
  );
};

export default TwitterShareButton;
