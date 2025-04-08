import Header from "@/components/Header";

interface MenuItem {
  label: string;
  onClick?: () => void;
}

const menuItems: MenuItem[] = [
  { label: "이용약관", onClick: () => console.log("이용약관 클릭") },
  {
    label: "개인정보처리방침",
    onClick: () => console.log("개인정보처리방침 클릭")
  },
  { label: "로그아웃", onClick: () => console.log("로그아웃 클릭") },
  { label: "회원탈퇴", onClick: () => console.log("회원탈퇴 클릭") }
];

const MyInfo = () => {
  return (
    <div className="flex w-[360px] flex-col bg-white md:w-[375px] lg:w-[500px]">
      <Header title="내 정보" showShareIcon={false} />

      <ul className="mt-[10px] flex flex-col justify-between gap-[20px]">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex h-[56px] cursor-pointer items-center justify-between px-5 py-4 hover:bg-gray-50"
            onClick={item.onClick}
          >
            <span className="text-base text-[16px] leading-6 font-medium tracking-normal text-gray-900 ">
              {item.label}
            </span>
            <img
              src="/icon/arrow_right.svg"
              alt="arrow"
              className="h-6 w-6 text-gray-600"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyInfo;
