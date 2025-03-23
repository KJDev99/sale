"use client";
import Search from "antd/es/input/Search";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Kategory() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://mirzohidjon.pythonanywhere.com/blog/banners/"
      );
      setData(res.data);
      console.log("API banner:", res.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="kategory">
      {data?.[0] ? (
        <div
          className="kategory_row"
          style={{
            backgroundImage: `url(https://mirzohidjon.pythonanywhere.com${data[0].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "400px",
            borderRadius: "12px",
          }}
        >
          <p>{data[0]?.alt_text}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
