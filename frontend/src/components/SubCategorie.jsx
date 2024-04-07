import React, { useEffect, useState } from "react";
import axios from "axios"; 

const SubCategorie = ({ id=1, onSubCategoryClick }) => {
  const [subCategories, setSubCategories] = useState(null);

  const getSubCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/sub_category/${id}`
      );
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching subCategories:", error);
    }
  };

  useEffect(() => {
    getSubCategories();
    console.log("subCategories",subCategories)
  }, [id]); 

  const handleSubCategoryClick = (subCategoryId) => {
    onSubCategoryClick(subCategoryId);
  };

  return (
    <div className=" cursor-pointer">
      {subCategories &&
        subCategories.map((value) => (
          <ul
            key={value.id}
            className="text-[20px] font-medium mt-10 opacity-85 m-5"
          >
            <li
              className="relative pl-5"
              onClick={() => handleSubCategoryClick(value.subcat_id)}
            >
              <span className="absolute top-1/2 left-[-20px] transform -translate-y-1/2 w-[8px] h-[8px] bg-black rounded-full"></span>
              {value.subcat_name_en}
            </li>
          </ul>
        ))}
    </div>
  );
};

export default SubCategorie;
