import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import FormButton from "@/components/button/FormButton";
import Header from "@/components/Header";

const SelectInfo = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // mode: fastFriend, virtualFriend 두 종류 존재
  const isNameRequired = mode === "virtualFriend";

  const [selectedMBTI, setSelectedMBTI] = useState<{
    [key: string]: string | null;
  }>({
    E: null,
    N: null,
    F: null,
    P: null
  });
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [relationship, setRelationship] = useState<string | null>(null);
  const [interest, setInterest] = useState<string[]>([]);

  const mbtiOptions = ["E", "N", "F", "P", "I", "S", "T", "J"];
  const ageOptions = ["10대", "20대", "30대 이상"];
  const genderOptions = ["여자", "남자"];
  const relationshipOptions = [
    "부모",
    "자녀",
    "친구",
    "짝사랑",
    "이별",
    "연인",
    "선생님",
    "직장동료"
  ];
  const interestOptions = [
    "연애",
    "결혼",
    "취미",
    "사회생활",
    "여행",
    "운동",
    "심리",
    "뷰티/패션",
    "음식",
    "인간관계"
  ];

  const handleMBTISelect = (option: string) => {
    const group = getMBTIgroup(option);
    setSelectedMBTI((prevState) => ({
      ...prevState,
      [group]: prevState[group] === option ? null : option
    }));
  };

  const getMBTIgroup = (option: string) => {
    if (["E", "I"].includes(option)) return "E";
    if (["N", "S"].includes(option)) return "N";
    if (["F", "T"].includes(option)) return "F";
    if (["P", "J"].includes(option)) return "P";
    return "";
  };

  const isMBTISelected = (option: string) => {
    const group = getMBTIgroup(option);
    return selectedMBTI[group] === option;
  };

  const handleInterestSelect = (option: string) => {
    if (interest.includes(option)) {
      setInterest((prevInterests) =>
        prevInterests.filter((item) => item !== option)
      );
    } else {
      setInterest((prevInterests) => [...prevInterests, option]);
    }
  };

  const isInterestSelected = (option: string) => {
    return interest.includes(option);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 6) {
      const truncatedValue = value.substring(0, 6);
      setName(truncatedValue);
    } else {
      setName(value);
    }
  };

  const handleStartChat = () => {
    const isEGroupSelected = selectedMBTI.E !== null;
    const isNGroupSelected = selectedMBTI.N !== null;
    const isFGroupSelected = selectedMBTI.F !== null;
    const isPGroupSelected = selectedMBTI.P !== null;

    // 선택한 MBTI값이 하나라도 부재할 경우
    if (
      !isEGroupSelected ||
      !isNGroupSelected ||
      !isFGroupSelected ||
      !isPGroupSelected
    ) {
      return alert("각 MBTI 그룹에서 하나의 값을 선택해주세요."); // TODO: Toast popup UI 완료 시 반영 예정
    }

    // 이름 필수 && 이름이 입력되지 않았을 경우
    if (isNameRequired && !name) {
      return alert("이름을 입력해주세요."); // TODO: Toast popup UI 완료 시 반영 예정
    }

    alert("대화 시작 API 연결하기.");
  };

  return (
    <div className="flex w-[360px] flex-col bg-white md:w-[375px] lg:w-[500px]">
      <Header />

      <div className="w-[320px] mx-auto">
        {/* MBTI 선택 */}
        <div className="mb-[40px] pt-[48px]">
          <p className="font-bold text-[20px] leading-[30px] tracking-[-0.01em]">
            상대방의 MBTI를 선택하면 <br />
            대화를 시뮬레이션 해볼 수 있어요
          </p>

          <div className="pt-[24px] grid grid-cols-4 gap-[24px_13px]">
            {mbtiOptions.map((option) => (
              <FormButton
                key={option}
                size="md"
                selected={isMBTISelected(option)}
                onClick={() => handleMBTISelect(option)}
              >
                {option}
              </FormButton>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-[8px] bg-[#EEF0F3]" />

      <div className="w-[320px] mx-auto">
        <div className="pt-[40px]">
          <p className="font-bold text-[20px] leading-[30px] tracking-[-0.01em]">
            정보 추가 입력
          </p>

          {/* 이름 입력 */}
          <div className="pt-[32px]">
            <label
              htmlFor="name"
              className="font-bold text-2lg leading-[24px] tracking-[0em] text-gray-600"
            >
              이름
              {isNameRequired && <span className="text-red-500">*</span>}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full h-[56px] px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-primary-light focus:border-primary-light"
              placeholder="이름"
              maxLength={6}
            />
          </div>

          {/* 나이 선택 */}
          <div className="pt-[20px] pb-[12px]">
            <p className="font-bold text-2lg leading-[24px] tracking-[0em] text-gray-600">
              나이
            </p>
            <div className="pt-[16px] flex gap-[16px]">
              {ageOptions.map((option) => (
                <FormButton
                  key={option}
                  size="sm"
                  selected={age === option}
                  onClick={() => setAge(option)}
                >
                  {option}
                </FormButton>
              ))}
            </div>
          </div>

          {/* 성별 선택 */}
          <div className="pt-[20px] pb-[12px]">
            <p className="font-bold text-2lg leading-[24px] tracking-[0em] text-gray-600">
              성별
            </p>
            <div className="pt-[16px] flex gap-[16px]">
              {genderOptions.map((option) => (
                <FormButton
                  key={option}
                  size="sm"
                  selected={gender === option}
                  onClick={() => setGender(option)}
                >
                  {option}
                </FormButton>
              ))}
            </div>
          </div>

          {/* 관계 선택 */}
          <div className="pt-[20px] pb-[20px]">
            <p className="font-bold text-2lg leading-[24px] tracking-[0em] text-gray-600">
              상대방과 나의 관계
            </p>
            <div className="pt-[16px] grid grid-cols-4 gap-[16px]">
              {relationshipOptions.map((option) => (
                <FormButton
                  key={option}
                  size="sm"
                  selected={relationship === option}
                  onClick={() => setRelationship(option)}
                >
                  {option}
                </FormButton>
              ))}
            </div>
          </div>

          {/* 관심사 선택 */}
          <div className="pt-[20px] pb-[26px]">
            <p className="font-bold text-2lg leading-[24px] tracking-[0em] text-gray-600">
              관심사
            </p>
            <div className="grid grid-cols-4 gap-[16px]">
              {interestOptions.map((option) => (
                <FormButton
                  key={option}
                  size="sm"
                  selected={isInterestSelected(option)}
                  onClick={() => handleInterestSelect(option)}
                >
                  {option}
                </FormButton>
              ))}
            </div>
          </div>
        </div>

        {/* 대화 시작 버튼 */}
        <button
          className="w-full my-[22px] h-[60px] bg-primary-normal text-white rounded-[8px] font-bold bg-[#5c4ae8]" //TODO: Theme 반영 후 bg값 수정
          onClick={handleStartChat}
        >
          대화 시작하기
        </button>
      </div>
    </div>
  );
};

export default SelectInfo;
