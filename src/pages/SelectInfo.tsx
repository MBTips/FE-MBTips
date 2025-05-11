import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getMBTIgroup, mapAgeToNumber } from "@/utils/helpers";
import { authInstance } from "@/api/axios";
import { trackEvent } from "@/libs/analytics";
import FormButton from "@/components/button/FormButton";
import Header from "@/components/header/Header";
import ToastMessage from "@/components/ToastMessage";

type FastFriendResponse = {
  header: {
    code: number;
    message: string;
  };
  data: number;
};

type VirtualFriendResponse = {
  header: {
    code: number;
    message: string;
  };
  data: {
    conversationId: number;
    virtualFriendId: number;
    mbti: string;
    virtualFriendName: string;
    virtualFriendAge: number;
    virtualFriendSex: "MALE" | "FEMALE";
    virtualFriendRelationship: string;
  };
};

type FriendResponse = FastFriendResponse | VirtualFriendResponse;

function isVirtualFriendResponse(
  data: number | VirtualFriendResponse["data"]
): data is VirtualFriendResponse["data"] {
  return typeof data === "object" && data !== null && "conversationId" in data;
}

const SelectInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, mbti: testResultMBTI } = location.state; // type: fastFriend, virtualFriend 두 종류 존재
  const isNameRequired = type === "virtualFriend";
  const headerTitle =
    type === "fastFriend" ? "상대방 정보선택" : "친구 저장하기";
  const selectInfoTitle =
    type === "fastFriend"
      ? `상대방의 MBTI를 선택하면\n대화를 시뮬레이션 해볼 수 있어요`
      : `친구의 MBTI를\n선택해주세요`;

  const mbtiTestResult =
    typeof location.state === "object" && testResultMBTI !== null
      ? testResultMBTI
      : undefined;

  const confirmButtonText =
    type === "fastFriend" ? "대화 시작하기" : "친구 저장하기";

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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (mbtiTestResult && mbtiTestResult.length === 4) {
      setSelectedMBTI({
        E: mbtiTestResult[0],
        N: mbtiTestResult[1],
        F: mbtiTestResult[2],
        P: mbtiTestResult[3]
      });
    }
  }, [mbtiTestResult]);

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

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.substring(0, 6));
  };

  const handleButtonClick = (
    value: string,
    setter: (val: string | null) => void,
    state: string | null
  ) => {
    setter(state === value ? null : value);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleConfirmButton = async () => {
    const isMBTIComplete = Object.values(selectedMBTI).every(
      (val) => val !== null
    );
    // 선택한 MBTI값이 하나라도 부재할 경우
    if (!isMBTIComplete) {
      return showToast("MBTI를 선택해주세요");
    }
    // 이름 필수 && 이름이 입력되지 않았을 경우 (virtualFriend)
    if (isNameRequired && !name) {
      return showToast("이름을 입력해주세요");
    }

    const mbti = `${selectedMBTI.E}${selectedMBTI.N}${selectedMBTI.F}${selectedMBTI.P}`;

    const commonData = {
      gender: gender === "남자" ? "MALE" : gender === "여자" ? "FEMALE" : null,
      mbti,
      interests: interest
    };

    const selectedData =
      type === "virtualFriend"
        ? {
            ...commonData,
            friendName: name,
            age: mapAgeToNumber(age),
            relationship
          }
        : {
            ...commonData,
            fastFriendName: name,
            fastFriendAge: mapAgeToNumber(age),
            fastFriendRelationship: relationship
          };

    const apiUrl =
      type === "virtualFriend" ? "api/virtual-friend" : "api/fast-friend";

    try {
      const response = await authInstance.post<FriendResponse>(
        `/${apiUrl}`,
        selectedData
      );
      const responseData = response.data.data;

      if (type === "virtualFriend" && isVirtualFriendResponse(responseData)) {
        trackEvent("Click", {
          page: "친구 저장",
          element: "친구 저장하기"
        });
        navigate("/");
      } else if (type === "fastFriend" && typeof responseData === "number") {
        trackEvent("Click", {
          page: "빠른 대화 설정",
          element: "대화 시작하기"
        });
        navigate("/chat", {
          state: {
            mbti,
            mode: type,
            id: responseData,
            name
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={
            type === "fastFriend" ? "상대방 정보 설정" : "친구 정보 저장"
          }
        />
        <meta
          property="og:description"
          content={
            type === "fastFriend" ? "상대방 정보 설정" : "친구 정보 저장"
          }
        />
        <meta
          property="twitter:description"
          content={
            type === "fastFriend" ? "상대방 정보 설정" : "친구 정보 저장"
          }
        />
      </Helmet>

      <Header title={headerTitle} showShareIcon={false} />

      <main>
        <div className="mx-auto w-[320px]">
          {/* MBTI 선택 */}
          <div className="mb-[40px] pt-[48px]">
            <p className="text-[20px] leading-[30px] font-bold tracking-[-0.01em] whitespace-pre-line">
              {selectInfoTitle}
            </p>

            <div className="grid grid-cols-4 gap-[24px_13px] pt-[24px]">
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

        <div className="h-[8px] w-full bg-[#EEF0F3]" />

        <div className="mx-auto w-[320px]">
          <div className="pt-[40px]">
            <p className="text-[20px] leading-[30px] font-bold tracking-[-0.01em]">
              정보 추가 입력
            </p>

            {/* 이름 입력 */}
            <div className="flex flex-col gap-2 pt-[32px]">
              <label
                htmlFor="name"
                className="text-2lg leading-[24px] font-bold tracking-[0em] text-gray-600"
              >
                이름
                {isNameRequired && <span className="text-red-500">*</span>}
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
                className="h-[56px] w-full rounded-lg border border-gray-200 px-4 focus:border-primary-light focus:ring-primary-light focus:outline-none"
                placeholder="이름"
                maxLength={6}
              />
            </div>

            {/* 나이 선택 */}
            <div className="pt-[20px] pb-[12px]">
              <p className="text-2lg leading-[24px] font-bold tracking-[0em] text-gray-600">
                나이
              </p>
              <div className="flex gap-[16px] pt-[16px]">
                {ageOptions.map((option) => (
                  <FormButton
                    key={option}
                    size="sm"
                    selected={age === option}
                    onClick={() => handleButtonClick(option, setAge, age)}
                  >
                    {option}
                  </FormButton>
                ))}
              </div>
            </div>

            {/* 성별 선택 */}
            <div className="pt-[20px] pb-[12px]">
              <p className="text-2lg leading-[24px] font-bold tracking-[0em] text-gray-600">
                성별
              </p>
              <div className="flex gap-[16px] pt-[16px]">
                {genderOptions.map((option) => (
                  <FormButton
                    key={option}
                    size="sm"
                    selected={gender === option}
                    onClick={() => handleButtonClick(option, setGender, gender)}
                  >
                    {option}
                  </FormButton>
                ))}
              </div>
            </div>

            {/* 관계 선택 */}
            <div className="pt-[20px] pb-[20px]">
              <p className="text-2lg leading-[24px] font-bold tracking-[0em] text-gray-600">
                상대방과 나의 관계
              </p>
              <div className="grid grid-cols-4 gap-[16px] pt-[16px]">
                {relationshipOptions.map((option) => (
                  <FormButton
                    key={option}
                    size="sm"
                    selected={relationship === option}
                    onClick={() =>
                      handleButtonClick(option, setRelationship, relationship)
                    }
                  >
                    {option}
                  </FormButton>
                ))}
              </div>
            </div>

            {/* 관심사 선택 */}
            <div className="pt-[20px] pb-[26px]">
              <p className="text-2lg leading-[24px] font-bold tracking-[0em] text-gray-600">
                관심사
              </p>
              <div className="grid grid-cols-4 gap-[16px] pt-[16px]">
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

          {toastMessage && (
            <ToastMessage
              message={toastMessage}
              onClose={() => setToastMessage(null)}
            />
          )}

          {/* 대화 시작 버튼 */}
          <button
            className="my-[22px] h-[60px] w-full rounded-[8px] bg-primary-normal font-bold text-white"
            onClick={handleConfirmButton}
          >
            {confirmButtonText}
          </button>
        </div>
      </main>
    </>
  );
};

export default SelectInfo;
