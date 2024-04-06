import React, { useEffect, useState } from "react";
import axios from "axios"; 
// http://localhost:5000/dua/1/1
const Dua = ({ cId, scId }) => {
  const [dua, setDua] = useState(null);

  const getDua = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/dua/${cId}/${scId}`);
      setDua(response.data);
    } catch (error) {
      console.error("Error fetching Dua:", error);
    }
  };
  useEffect(() => {
    getDua();
  }, []);

  return (
    <div>
      <div>Section</div>
      <div>
        <div>DUa title</div>
        <div>Dua details</div>
        <div>Dua refarence</div>
        <div>Icons</div>
      </div>
    </div>
  );
};

export default Dua