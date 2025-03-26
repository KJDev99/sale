"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Heart, Trash2 } from "lucide-react";
import { api } from "../Host/host";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";

export default function CardPanel() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "https://mirzohidjon.pythonanywhere.com/blog/favorites/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setFavorites(response.data);
    } catch (err) {
      console.error("Error fetching favorites:", err);
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setDeletingId(id);
    try {
      await axios.delete(`${api}/blog/favorites/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setFavorites(favorites.filter((item) => item.id !== id));
      toast.success("Removed from favorites");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to remove favorite");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="card-panel">
        <h1 className="card-panel-title">
          <span>Your</span> Favorites
        </h1>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <p>You don't have any favorite ads yet.</p>
            <Link href="/" className="browse-link">
              Bosh Sahifa
            </Link>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="favorite-item">
                <Link
                  href={`/about/${favorite.announcement}`}
                  className="favorite-content"
                >
                  <img src={favorite.announcement_images[0].image} alt="" />
                  <h2>{favorite.announcement_title}</h2>
                </Link>
                <button
                  onClick={() => handleDelete(favorite.id)}
                  className="remove-favorite"
                  disabled={deletingId === favorite.id}
                  aria-label="Remove from favorites"
                >
                  {deletingId === favorite.id ? (
                    <Loader size={20} />
                  ) : (
                    <Trash2 size={20} />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
