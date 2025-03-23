"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "../app/Host/host";
import axios from "axios";
import Link from "next/link";
import Loader from "./Loader";

export default function Things() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/blog/categories/`);
      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error("Unexpected data structure:", response.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="things">
      <div className="things_left">
        <h1 className="all">Все категории</h1>
        <div className="things_row">
          {loading ? (
            <div>Loading categories...</div>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} className="things_col">
                {/* Kategoriya linki to'g'ri bo'lishi uchun URL to'g'ri formatda berildi */}
                <Link href={`/category/${item.id}`} className="things_card">
                  <h1>{item.name}</h1>
                </Link>
              </div>
            ))
          ) : (
            <div>No categories found</div>
          )}
        </div>
      </div>

      {/* O'ng panel qismi (xizmatlar, reklamalar) */}
      <div className="advertise things_adv">
        <div className="right_col advertise_col">
          <img
            src="/main2.jpg"
            alt="Katalog rasmi"
            style={{ width: "100%", height: "auto" }}
          />
          <img
            src="/main3.jpg"
            alt="Katalog rasmi"
            style={{ width: "100%", height: "auto" }}
          />
          <img
            src="/luxury.jpg"
            alt="Katalog rasmi"
            style={{ width: "100%", height: "auto" }}
          />
          <div className="right_text  advertise_col_text">
            <h2>Здесь вы можете разместить свою рекламу. Купить и продать</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
