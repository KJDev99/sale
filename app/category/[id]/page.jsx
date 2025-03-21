"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { api } from "../../Host/host";
import Market from "../../../components/Market";
import Navbar from "../../../components/Navbar";
import Link from "next/link";
import Loader from "../../../components/Loader";

export default function CategoryPage() {
  const { id: category } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Category ID:", category); // Tekshirish uchun
    if (category) {
      getData();
    }
  }, [category]);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api}/blog/categories/${category}`);
      setData(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page">
      <Navbar />
      <div className="page_row">
        {loading ? (
          <p>Loading...</p>
        ) : data ? ( // data null yoki undefined emasligini tekshiramiz
          <div className="page_col">
            <img src={data.image} alt={data.name} />
            <h1>{data.name}</h1>
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}
