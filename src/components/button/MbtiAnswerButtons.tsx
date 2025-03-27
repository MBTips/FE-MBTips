const MbtiAnswerButtons = ({ content }: { content: string[] }) => {
    
    const commonStyle = "flex justify-center items-center bg-primary-pale border-1 border-primary-light rounded-lg w-[335px] h-[80px] font-medium text-primary-normal text-lg";

    return (
        <div className="flex flex-col gap-9">
            <button className={commonStyle}>
            {content[0]}
            </button>
            <button className={commonStyle}>
            {content[1]}
            </button>
        </div>
  )
}

export default MbtiAnswerButtons;