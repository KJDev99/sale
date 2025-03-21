"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Added missing axios import
import { api } from "../app/Host/host";
import { getToken } from "../app/Host/Auth";
import cookies from "js-cookie";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
export default function Market() {
  const [reklamalar, setReklamalar] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [imageError, setImageError] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getFavorites(token);
    const fetchReklamalar = async () => {
      try {
        const res = await fetch(`${api}/blog/announcements/`);
        const data = await res.json();
        setReklamalar(data);
      } catch (error) {
        console.error("Reklamalarni yuklashda xatolik: ", error);
      }
    };

    fetchReklamalar();
  }, []);

  const handleImageError = (id) => {
    setImageError((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const getFavorites = async (token) => {
    if (!token) {
      return;
    }
    try {
      const response = await axios({
        url: "https://mirzohidjon.pythonanywhere.com/blog/favorites/",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      setFavorites(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToFavorite = async (adId) => {
    let data = JSON.stringify({
      announcement: adId,
    });
    if (!token) {
      toast.warn("Itlimos tizimga kiring!");
      return;
    }

    try {
      const response = await axios({
        method: "post",
        url: "https://mirzohidjon.pythonanywhere.com/blog/favorites/",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      });

      console.log(response);

      getFavorites();
    } catch (err) {
      console.log(err);
    }
  };

  const isFavorite = (id) => {
    return favorites.findIndex((x) => x.announcement == id) != -1;
  };

  return (
    <div className="market">
      <h1 className="market-title">Рекомендации для вас</h1>
      <div className="market_row">
        {reklamalar.map((reklama) => (
          <div key={reklama.id} className="market_col">
            <div className="market_card">
              <div className="market_img">
                {imageError[reklama.id] ? (
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "15px 15px 0px 0xp",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  ></div>
                ) : (
                  <img
                    src={
                      reklama.images.length > 0
                        ? reklama.images[0].image
                        : "/car.png"
                    }
                    alt={reklama.title || "Product image"}
                    style={{
                      borderRadius: "15px 15px 0px 0px",
                      display: "flex",
                      justifyContent: "center",
                      position: "center",
                      flexWrap: "nowrap",
                    }}
                    onError={() => handleImageError(reklama.id)}
                  />
                )}
                <div className="market_text">
                  <div className="market_text1">
                    <Link
                      href={`/about/${reklama.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {" "}
                      <h1>{reklama.title}</h1>
                    </Link>
                    <p>{reklama.price} $</p>
                    <span>{reklama.location}</span>
                  </div>
                  <div className={`favorites`}>
                    <button
                      onClick={(e) => addToFavorite(reklama.id)}
                      className={
                        isFavorite(reklama.id) ? "active-favorite" : ""
                      }
                    >
                      {isFavorite(reklama.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
