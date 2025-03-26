"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../app/Host/host";
import { getToken } from "../app/Host/Auth";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";

export default function Market() {
  const [reklamalar, setReklamalar] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [imageError, setImageError] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);

    const fetchReklamalar = async () => {
      try {
        const res = await fetch(`${api}/blog/announcements/`);
        const data = await res.json();
        setReklamalar(data);
      } catch (error) {
        console.error("Reklamalarni yuklashda xatolik: ", error);
      }
    };

    const fetchFavorites = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          "https://mirzohidjon.pythonanywhere.com/blog/favorites/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setFavorites(response.data.map((fav) => fav.announcement));
      } catch (err) {
        console.log("Favorites loading error: ", err);
      }
    };

    fetchReklamalar();
    fetchFavorites();
  }, [token]);

  const handleImageError = (id) => {
    setImageError((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const isFavorite = (adId) => {
    return favorites.includes(adId);
  };

  const toggleFavorite = async (adId) => {
    if (!token) {
      toast.warn("Пожалуйста, войдите в свой аккаунт!");
      return;
    }

    try {
      if (isFavorite(adId)) {
        await axios.delete(
          `https://mirzohidjon.pythonanywhere.com/blog/favorites/${adId}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setFavorites(favorites.filter((id) => id !== adId));
      } else {
        await axios.post(
          "https://mirzohidjon.pythonanywhere.com/blog/favorites/",
          {
            announcement: adId,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setFavorites([...favorites, adId]);
      }
    } catch (err) {
      console.log(err);
      toast.error("Произошла ошибка, попробуйте снова.");
    }
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
                    src={reklama.images.length > 0 && reklama.images[0].image}
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
                      onClick={(e) => toggleFavorite(reklama.id)}
                      className={
                        isFavorite(reklama.id) ? "active-favorite" : ""
                      }
                    >
                      {isFavorite(reklama.id) ? (
                        <FaHeart color="red" />
                      ) : (
                        <FaRegHeart />
                      )}
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
