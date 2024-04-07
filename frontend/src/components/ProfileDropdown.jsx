import Image from "next/image";
import profileImg from "../../public/images/profile/person.png";
import translateImg from "../../public/images/profile/translate.png";
import settingImg from "../../public/images/profile/setting.png";
import menuImg from "../../public/images/profile/menu.png";

const iconArr = [translateImg, settingImg, menuImg, menuImg];
const textArr = [
  "Language Settings",
  "General Settings",
  "Font Settings",
  "Appearance Settings",
];

const ProfileDropdown = () => {
  return (
    <div className="flex flex-col   p-2 m-5  rounded-xl items-end">
      <div className=" w-[50px]  flex justify-between  items-center mr-5">
        <Image
          className="rounded-full bg-[#3D454E]"
          src={profileImg}
          alt="Picture"
        />
        <span className="ml-2 opacity-50">▼</span>
      </div>
      <div className="bg-[#FFFFFF] w-[330px] h-[834px] flex flex-col items-center mt-8 rounded-xl p-3 border">
        <div className=" text-[24px] opacity-90 font-bold">Setting</div>
        {iconArr.map((value, index) => {
          return (
            <div className=" mt-5">
              <div
                className={`${
                  index === 3 ? "text-green-600 font-bold" : ""
                } bg-[#F7F8FA] w-[289px] h-[55px] flex items-center p-3 rounded-lg `}
              >
                <div className="w-[40px] h-[40px] bg-[#E8F0F5] rounded-full p-2">
                  <Image className="opacity-50" src={value} alt="Picture" />
                </div>
                <p className="pl-5 opacity-80">{textArr[index]}</p>
              </div>
            </div>
          );
        })}

        <div className=" mt-5 flex justify-between w-full p-6">
          <div className=" opacity-90">Night Mode</div>
          <div>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" />
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
