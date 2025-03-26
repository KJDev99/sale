"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "../app/Host/host";
import axios from "axios";
import Link from "next/link";
import Loader from "./Loader";
import Galary from "./Galary";
import AdvertiseBanner from "./AdvertiseBanner";

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
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} className="things_col">
                <Link
                  href={`/category/${item.id}`}
                  className="things_card"
                  style={{ backgroundImage: `url(${api}${item.image})` }}
                >
                  <div className="name-overlay">
                    <h1 className="text-white text-lg font-bold">
                      {item.name}
                    </h1>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div>Категории не найдены.</div>
          )}
        </div>
        <Galary />
      </div>

      <div className="advertise things_adv">
        <AdvertiseBanner />
      </div>
    </div>
  );
}
