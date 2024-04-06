'use client'
import Image from "next/image";
import searchImg from "../../public/images/other/search.png"
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Home() {
  const [caterories, setCaterories] = useState({})

  const fetchCaterories = async () => {
    console.log("Working ok")
    const response = await axios.get('http://localhost:5000/category');
    console.log(response.data);
  }

  useEffect(() => {
    fetchCaterories();
  },)




  return (
    <main className="flex pt-10 flex-col w-full">
      <div className="flex w-full justify-between items-center">
        <div className="text-[25px] font-bold">Dua Page</div>
        <div>
          <form className="max-w-md mx-auto">
            <div className="relative">
              <input type="search" className="block p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#FFFFFF] focus:ring-blue-500 focus:border-blue-500 w-[350px]" placeholder="Search by Dua Name" required />

              <button type="submit" className="absolute end-2.5 bottom-2.5 bg-[#E8F0F5] hover:bg-[#E8F0F5] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2">
                <Image src={searchImg} alt="Search" width={20} height={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* caterories */}
      <div className=" flex rounded-lg w-[360px] mt-5">
        <div className="  bg-[#FFFFFF]">
          <div className="flex w-full text-[20px] justify-center bg-[#1FA45B] h-16 items-center rounded-t-lg text-white font-bold">Categories</div>
          <div className=" p-3">
            <div>
              <form>
                <div className="relative">
                  <input type="search" className="block p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#FFFFFF] focus:ring-blue-500 focus:border-blue-500 w-[350px]" placeholder="Search by Categories Name" required />

                  <button type="submit" className="absolute end-2.5 bottom-2.5 bg-[#E8F0F5] hover:bg-[#E8F0F5] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2">
                    <Image src={searchImg} alt="Search" width={20} height={20} />
                  </button>
                </div>
              </form>
            </div>
            <div>Introduction to Dua</div></div>

        </div>
        <div></div>
      </div>
    </main>
  );
}
