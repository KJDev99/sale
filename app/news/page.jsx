"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../Host/host";
import { ClipboardList } from "lucide-react";
import Navbar from "../../components/Navbar";

export default function Page() {
  const [data, setData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`${api}/blog/news/`);

      setData(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Oy 0 dan boshlanadi
    const year = date.getUTCFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  return (
    <>
      <Navbar />
      <div className="news">
        <h1>
          Новости{" "}
          <span>
            <ClipboardList />
          </span>
        </h1>
        <div className="news_row">
          {data &&
            data.map((item, key) => (
              <div className="news_col" key={key}>
                <div className="news_col_img">
                  <img src={item.image} alt="Item image" />
                </div>
                <div className="news_col_text">
                  <h2>{item.title}</h2>
                  <p>{item.content}</p>
                  <span>{formatDate(item.created_at)}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
