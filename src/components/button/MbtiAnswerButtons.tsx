import useMbtiTestState from "@/store/useMbtiTestState";

interface MbtiAnswerButtonsProps {
    content : {
        mbti: string;
        message: string;
    }[];
}
const MbtiAnswerButtons = ({content}: MbtiAnswerButtonsProps) => {
    
    const { setNextStep, setMbtiLog} = useMbtiTestState();

    const commonStyle = "flex justify-center items-center bg-primary-pale border-1 border-primary-light rounded-lg w-[335px] h-[80px] font-medium text-primary-normal text-md py-4 px-2.5 ";

    const handleClick =(mbti : string ) => {
        setNextStep();
        setMbtiLog(mbti)
    }

    return (
        <div className="flex flex-col gap-9">
            <button onClick={()=>handleClick(content[0].mbti)} className={commonStyle}>
            {content[0].message}
            </button>
            <button onClick={()=>handleClick(content[1].mbti)} className={commonStyle}>
            {content[1].message}
            </button>
        </div>
  )
}

export default MbtiAnswerButtons;