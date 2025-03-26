"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Phone, CalendarClock } from "lucide-react";

const AdvertiseBanner = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAds = async () => {
    try {
      const response = await axios.get(
        "https://mirzohidjon.pythonanywhere.com/blog/other-announcements/"
      );
      setAds(response.data);
    } catch (err) {
      setError("Не удалось загрузить объявления.");
      console.error("Error fetching ads:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAds();
  }, []);

  if (loading) {
    return <div className="advertise-loading">Загрузка объявлений...</div>;
  }

  if (error) {
    return <div className="advertise-error">{error}</div>;
  }

  if (ads.length === 0) {
    return (
      <div className="advertise-empty">
        В данный момент нет доступных объявлений.
      </div>
    );
  }

  return (
    <div className="advertise-grid">
      {ads.map((ad) => (
        <div key={ad.id} className="advertise-card">
          {ad.image && (
            <div className="advertise-image-container">
              <img src={ad.image} alt={ad.title} className="advertise-image" />
            </div>
          )}
          <div className="advertise-content">
            <h3 className="advertise-item-title">{ad.title}</h3>
            <p className="advertise-description">{ad.description}</p>
            <div className="advertise-meta">
              <span className="advertise-price">${ad.price}</span>
              <div className="advertise-contact">
                <Phone size={16} />
                <span>{ad.phone}</span>
              </div>
              <div className="advertise-date">
                <CalendarClock size={16} />
                <span>
                  {new Date(ad.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            {/* <Link href={`/ads/${ad.id}`} className="advertise-link">
              View Details
            </Link> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdvertiseBanner;
