import { useNavigate } from "react-router-dom";

const RestartButton = () => {
    const navigate = useNavigate();

    const goFirstStep = () => {
        navigate("/mbti-test");
    }

    return (
        <button className="flex justify-center items-center bg-gray-100 rounded-lg w-[72px] h-[60px]" onClick={goFirstStep}>
            <img src="/icon/restart.svg" alt="다시하기 버튼" width={24} height={24} />
        </button>
  )
}

export default RestartButton;