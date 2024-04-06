import Image from "next/image";
import duaImage from "../../public/images/sidebar/dua.png";
import giveImage from "../../public/images/sidebar/give.png";
import homeImage from "../../public/images/sidebar/home.png";
import menuImage from "../../public/images/sidebar/menu.png";
import lightImage from "../../public/images/sidebar/lightbulb.png";
import bookmarkImage from "../../public/images/sidebar/bookmark.png";
import jarImage from "../../public/images/sidebar/jar.png";
import communicationsImage from "../../public/images/sidebar/communications.png";
import bookImage from "../../public/images/sidebar/book.png";

const sidebarButton = [
  homeImage,
  menuImage,
  lightImage,
  bookmarkImage,
  jarImage,
  communicationsImage,
  bookImage,
];

const Sidebar = () => {
  console.log("sidebarButton", sidebarButton);
  return (
    <div className="flex flex-col justify-between bg-[#FFFFFF] w-[100px] h-[927px] p-2 m-5 ml-8 rounded-xl border">
      <div className="mt-5 p-1">
        <Image
          className="bg-[#1FA45B] p-1 rounded-xl"
          src={duaImage}
          alt="Picture"
        />
      </div>
      <div>
        {sidebarButton.map((value) => {
          return (
            <div className="bg-[#E8F0F5] mt-5 m-3 rounded-full">
              <Image
                className="p-3 rounded-xl opacity-50"
                src={value}
                alt="Picture"
              />
            </div>
          );
        })}
      </div>
      <div>
        <div className=" mb-5 p-1">
          <Image
            className="bg-[#1FA45B] p-2 rounded-xl"
            src={giveImage}
            alt="Picture"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
