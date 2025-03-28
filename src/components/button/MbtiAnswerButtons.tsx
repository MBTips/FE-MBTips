interface MbtiAnswerButtonsProps {
    onClick: () => void;
    content: string[];
}


const MbtiAnswerButtons = ({ onClick, content }: MbtiAnswerButtonsProps) => {
    
    const commonStyle = "flex justify-center items-center bg-primary-pale border-1 border-primary-light rounded-lg w-[335px] h-[80px] font-medium text-primary-normal text-lg";

    return (
        <div className="flex flex-col gap-9">
            <button onClick={onClick} className={commonStyle}>
            {content[0]}
            </button>
            <button onClick={onClick} className={commonStyle}>
            {content[1]}
            </button>
        </div>
  )
}

export default MbtiAnswerButtons;