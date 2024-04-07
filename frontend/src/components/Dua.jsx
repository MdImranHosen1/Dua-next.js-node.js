import React, { useEffect, useState } from "react";
import axios from "axios";
import icon from "../../public/images/other/allah.png";
import Image from "next/image";

const Dua = ({ cId = 1, scId = 1 }) => {
  const [dua, setDua] = useState(null);
  const [sectionName, setSectionName] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    console.log(cId, scId);
    setLoading(true);
    try {
      const [duaResponse, sectionResponse] = await Promise.all([
        axios.get(`http://localhost:5000/dua/${cId}/${scId}`),
        axios.get(`http://localhost:5000/section/${cId}/${scId}`),
      ]);
      setDua(duaResponse.data);
      setSectionName(sectionResponse.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [cId, scId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("sectionName", sectionName, dua);

  return (
    <div className="flex flex-col w-full  ml-3 mr-3 text-[20px] mb-10">
      <div className="flex font-medium bg-[#FFFFFF] w-full p-5 rounded-lg border">
        <span className="text-[#1FA45B]">Section: </span>
        <div className="text-[#393939]"> {sectionName?.subcat_name_en}</div>
      </div>
      {dua &&
        dua.map((value, index) => (
          <div className="w-full border bg-[#FFFFFF] rounded-lg mt-4 pl-5 pr-5">
            <div className="text-[#1FA45B] font-semibold flex  w-full items-center pt-5 pb-5">
              <div className=" w-12 h-12 ">
                <Image src={icon} />
              </div>
              <div>
                {"  "}
                {index + 1}
                {". "}
                {value?.dua_name_en}
              </div>
            </div>
            <div className={`${value.top_en === null ? "" : "mt-5"}`}>
              {value?.top_en}
            </div>
            <div
              className={`${
                value.dua_arabic === null ? "" : "mt-5 text-right font-semibold"
              }`}
            >
              {value?.dua_arabic}
            </div>
            <div
              className={`${value.transliteration_en === null ? "" : "mt-5"}`}
            >
              Transliteration: {value?.transliteration_en}
            </div>

            <div className={`${value.translation_en === null ? "" : "mt-5"}`}>
              Translation: {value?.translation_en}
            </div>
            <div className={`${value.bottom_en === null ? "" : "mt-5"}`}>
              Bottom: {value?.bottom_en}
            </div>

            {value.refference_en === null ? (
              ""
            ) : (
              <div className="mt-5 font-semibold">
                <div className="text-[#1FA45B] ">Refference:</div>{" "}
                <div>{value?.refference_en}</div>
              </div>
            )}

            {value.audio === null ? (
              ""
            ) : (
              <div className="mt-5 mb-5">
                <audio controls>
                  <source src={value?.audio} type="audio/mp3" />
                </audio>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Dua;
