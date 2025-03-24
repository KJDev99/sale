"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { api } from "../../Host/host";
import Navbar from "../../../components/Navbar";
import Loader from "../../../components/Loader";
import { FaMapMarkerAlt, FaTag, FaUser } from "react-icons/fa";
import Link from "next/link";

export default function CategoryPage() {
  const { id: category } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Category ID:", category);
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

  if (!data) {
    return <p>No data available.</p>;
  }

  return (
    <div className="page">
      <Navbar />
      {data.image && (
        <div
          className="category-header"
          style={{ backgroundImage: `url(${data.image})` }}
        >
          {data.name}
        </div>
      )}
      <div className="announcements">
        {data.announcements && data.announcements.length > 0 ? (
          data.announcements.map((announcement) => (
            <div className="announcement-card" key={announcement.id}>
              <Link href={`/about/${announcement.id}`}>
                <img
                  src={announcement.images[0]?.image}
                  alt={announcement.title}
                />
                <h2>{announcement.title}</h2>
                <p>{announcement.description}</p>
                <div className="announcement-details">
                  <p>
                    <FaTag /> <strong>Price:</strong> ${announcement.price}
                  </p>
                  <p>
                    <FaMapMarkerAlt /> <strong>Location:</strong>{" "}
                    {announcement.location}
                  </p>
                  <p>
                    <FaUser /> <strong>User:</strong> {announcement.user}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No announcements available.</p>
        )}
      </div>
    </div>
  );
}
