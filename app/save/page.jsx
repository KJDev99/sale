"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Heart, Trash2 } from "lucide-react";
import { api } from "../Host/host";
import Cookies from "js-cookie";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";

export default function CardPanel() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState({});
  const [delate, setdelate] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getFavorites();
    }
  }, []);

  const getFavorites = async () => {
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
    } finally {
      setLoading(false);
    }
  };

  const deleteFavorites = async (id) => {
    console.log(id, "delete");
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      if (!token) {
        console.error("No authentication token found");
        return { success: false, error: "Authentication required" };
      }
      const response = await axios.delete(`${api}/blog/favorites/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      return { success: true };
    } catch (err) {
      console.error("Delete failed:", err);

      if (err.response) {
        console.log("Response status:", err.response.status);
        console.log("Response data:", err.response.data);

        return {
          success: false,
          status: err.response.status,
          error: err.response.data || "Server error",
        };
      }

      return { success: false, error: "Failed to delete favorite" };
    }
  };

  if (loading) {
    return <Loader />;
  }
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
      <div className="card-panel">
        <h1 className="card-panel-title">
          {" "}
          <span>Ваши</span> Избранные
        </h1>
        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <p>You don't have any favorite ads yet.</p>
            <Link href="/market" className="browse-link">
              Browse Ads
            </Link>
          </div>
        ) : (
          <div className="card_row">
            <div className="favorites-grid">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="favorite-item">
                  <h1>{favorite.announcement}</h1>
                  <p>{favorite.announcement_title}</p>
                  <span>{formatDate(favorite.created_at)}</span>
                  <button
                    onClick={() => deleteFavorites(favorite.id)}
                    className="remove-favorite"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
