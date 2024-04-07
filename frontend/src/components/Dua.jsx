// Dua.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import icon from "../../public/images/duaCat/allah.png";
import copyIcon from "../../public/images/duaCat/copy.png";
import bookmarkIcon from "../../public/images/duaCat/bookmark.png";
import lightbulbIcon from "../../public/images/duaCat/lightbulb.png";
import shareIcon from "../../public/images/duaCat/share.png";
import infoIcon from "../../public/images/duaCat/info.png";

const iconList = [copyIcon, bookmarkIcon, lightbulbIcon, shareIcon, infoIcon];
const url = "https://dua-next-js-node-js-1.onrender.com";

const Dua = ({ cId = 1, scId = undefined, searchQuery = "" }) => {
  const [dua, setDua] = useState(null);
  const [tempDua, setTempDua] = useState(null);
  const [sectionName, setSectionName] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      let duaResponse, sectionResponse;
      if (scId === undefined) {
        [duaResponse, sectionResponse] = await Promise.all([
          axios.get(`${url}/category/dua/${cId}`),
          axios.get(`${url}/category/section/${cId}`),
        ]);
      } else {
        [duaResponse, sectionResponse] = await Promise.all([
          axios.get(`${url}/sub_category/dua/${cId}/${scId}`),
          axios.get(`${url}/sub_category/section/${cId}/${scId}`),
        ]);
      }

      setDua(duaResponse.data);
      setTempDua(duaResponse.data);
      setSectionName(sectionResponse.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [cId, scId]);

useEffect(() => {
 
    setDua(tempDua);
    if(searchQuery){
    const filteredDua = tempDua.filter((item) =>
      item.dua_name_en.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDua(filteredDua);
  }
}, [searchQuery, tempDua]);

  if (loading) {
    return (
      <div className="border border-blue-300 shadow rounded-md p-4  w-full mx-auto ml-5 mr-10 h-screen">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-600 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-600 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-600 rounded col-span-2"></div>
                <div className="h-2 bg-slate-600 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full  ml-3 mr-3 text-[20px] mb-10 ">
      <div className="flex font-medium bg-[#FFFFFF] w-full p-5 rounded-lg border">
        <span className="text-[#1FA45B]">Section: </span>
        <div className="text-[#393939]">
          {sectionName?.subcat_name_en}
          {sectionName?.cat_name_en}
        </div>
      </div>
      {dua &&
        dua.map((value, index) => (
          <div
            key={index}
            className="w-full border bg-[#FFFFFF] rounded-lg mt-5 pl-5 pr-5"
          >
            <div className="text-[#1FA45B] font-semibold flex  w-full items-center pt-5 pb-5">
              <div className=" w-12 h-12 ">
                <Image src={icon} />
              </div>
              <div>
                {index + 1}
                {". "}
                {value.dua_name_en === null
                  ? "Read the dua"
                  : value?.dua_name_en}
              </div>
            </div>

            {value.top_en && <div className="mt-5">{value.top_en}</div>}
            {value.dua_arabic && (
              <div className="mt-5 text-right font-semibold">
                {value?.dua_arabic}
              </div>
            )}
            {value.transliteration_en && (
              <div className="mt-5">
                <span className="font-semibold">Transliteration:</span>{" "}
                {value?.transliteration_en}
              </div>
            )}
            {value.translation_en && (
              <div className="mt-5">
                <span className="font-semibold">Translation:</span>{" "}
                {value?.translation_en}
              </div>
            )}
            {value.bottom_en && (
              <div className="mt-5">
                <span className="font-semibold"> Bottom:</span>{" "}
                {value?.bottom_en}
              </div>
            )}
            {value.refference_en && (
              <div className="mt-5 font-semibold">
                <div className="text-[#1FA45B] ">Refference:</div>{" "}
                <div>{value?.refference_en}</div>
              </div>
            )}
            {value.audio && (
              <div className="mt-5  w-full ">
                <audio controls className="w-full">
                  <source src={value?.audio} type="audio/mp3" />
                </audio>
              </div>
            )}
            <div className="flex w-full justify-end ">
              {iconList.map((icon, index) => (
                <div
                  key={index}
                  className="w-6 h-6 ml-8 flex cursor-pointer opacity-70 mt-5"
                >
                  <Image src={icon} alt="" />
                </div>
              ))}
            </div>
            <div className="mb-5"></div>
          </div>
        ))}
    </div>
  );
};

export default Dua;
