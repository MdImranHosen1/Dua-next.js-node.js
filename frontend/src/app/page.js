"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import searchImg from "../../public/images/other/search.png";
import duaImg from "../../public/images/other/dua.png";

export default function Home() {
  const [categories, setCategories] = useState([]); // Initialize as an empty array

  const fetchCategories = async () => {
    console.log("Working ok");
    try {
      const response = await axios.get("http://localhost:5000/category");
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []); // Empty dependency array to fetch categories only once on mount

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
      {/* categories */}
      <div className="flex rounded-lg mt-5">
        <div className="bg-[#FFFFFF] w-[400px]">
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
              {categories && categories.map((category) => (

                <div key={category.id} className="flex w-full bg-[#E8F0F5] rounded-xl mt-3">
                  {console.log(category)}
                  <div className="w-24 h-16 bg-[#CFE0E5] m-3 rounded-xl">
                    <Image src={duaImg} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex w-full  justify-center p-3">
                    <div className="flex flex-col w-full justify-between font-bold text-[20px]">
                      <div>{category.cat_name_en}</div>
                      <div>Subcategory: {category.no_of_subcat}</div>
                    </div>
                    <div className="flex  flex-col justify-between  text-[18px]">
                      
                      <div>Duas</div>
                      <div>{category.no_of_dua}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
