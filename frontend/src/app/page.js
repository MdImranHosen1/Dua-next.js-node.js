'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import searchImg from "../../public/images/other/search.png";
import duaImg from "../../public/images/other/dua.png";
import SubCategorie from "@/components/SubCategorie";
import Dua from "@/components/Dua";

const url = "https://dua-next-js-node-js-1.onrender.com";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [tempCategories, setTempCategories] = useState([]);
  const [categoriesId, setCategoriesId] = useState(-1);
  const [subCategoryId, setSubCategoryId] = useState(undefined);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/category`);
      setCategories(response.data);
      setTempCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (cId) => {
    setCategoriesId(cId === categoriesId ? -1 : cId);
    setSubCategoryId(undefined);
  };

  const handleSubCategoryClick = (subCategoryId) => {
    setSubCategoryId(subCategoryId);
  };

  useEffect(() => {
 
    setCategories(tempCategories);
    if(searchCategory){
    const filteredDua = tempCategories.filter((item) =>
      item.cat_name_en.toLowerCase().includes(searchCategory.toLowerCase())
    );
      setCategories(filteredDua);
  }
}, [searchCategory, tempCategories]);

  return (
    <main className="flex pt-10 flex-col w-full">
      <div className="flex w-full justify-between items-center">
        <div className="text-[25px] font-bold">Dua Page</div>
        <div>
          <form className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="search"
                className="block p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#FFFFFF] focus:ring-blue-500 focus:border-blue-500 w-[350px]"
                placeholder="Search by Dua Name"
                required
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <button
                type="submit"
                className="absolute end-2.5 bottom-2.5 bg-[#E8F0F5] hover:bg-[#E8F0F5] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2"
              >
                <Image src={searchImg} alt="Search" width={20} height={20} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex rounded-lg mt-5 w-full">
        {/* Categories sidebar */}
        <div className="bg-[#FFFFFF] w-[400px]  h-full rounded-lg mb-10 border">
          <div className="flex w-full text-[20px] justify-center bg-[#1FA45B] h-16 items-center rounded-t-lg text-white font-bold">
            Categories
          </div>
          <div className="p-3 w-full">
            <div>
              <form>
                <div className="relative w-full">
                  <input
                    type="search"
                    className="block p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#FFFFFF] focus:ring-blue-500 focus:border-blue-500 w-full"
                    placeholder="Search by Categories Name"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    required
                  />

                  <button
                    type="submit"
                    className="absolute end-2.5 bottom-2.5 bg-[#E8F0F5] hover:bg-[#E8F0F5] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2"
                  >
                    <Image
                      src={searchImg}
                      alt="Search"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </form>
            </div>
            {/* list of categories */}
            <div>
              {categories &&
                categories.map((category) => (
                  <div key={category.id}>
                    <div
                      className={`flex w-full ${category.cat_id === categoriesId
                        ? "bg-[#E8F0F5]"
                        : ""
                        } rounded-xl mt-3 cursor-pointer`}
                      onClick={() => handleCategoryClick(category.cat_id)}
                    >
                      <div className="w-24 h-16 bg-[#CFE0E5] m-3 rounded-xl">
                        <Image
                          src={duaImg}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex w-full  justify-center p-3">
                        <div className="flex flex-col w-full justify-between  ">
                          <div className="font-medium text-[20px]">
                            {category.cat_name_en}
                          </div>
                          <div className="text-[18px] opacity-85">
                            Subcategory: {category.no_of_subcat}
                          </div>
                        </div>
                        <div className="flex  flex-col justify-between items-center  ">
                          <div className="font-medium text-[20px]">
                            {category.no_of_dua}
                          </div>
                          <div className=" text-[18px] opacity-85">Duas</div>
                        </div>
                      </div>
                    </div>
                    {category.cat_id === categoriesId && (
                      <SubCategorie
                        id={category.cat_id}
                        onSubCategoryClick={handleSubCategoryClick}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* Dua container */}
        <div className="flex-1">
          <Dua cId={categoriesId === -1 ? 1 : categoriesId} scId={subCategoryId} searchQuery={searchQuery} />
        </div>
      </div>
    </main>
  );
}
