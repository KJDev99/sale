"use client";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useState } from "react";
import { api } from "../Host/host";
import { usePathname } from "next/navigation";
import { useStore } from "../Store/Store"; // Update this path

export default function Addcom() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");

  const pathname = usePathname();
  const id = pathname;

  // Get the current user from Zustand store
  const currentUser = useStore((state) => state.currentUser);

  const sendData = async () => {
    if (!currentUser || !currentUser.token) {
      console.error("No user token found. Please log in.");
      return;
    }

    const commentData = {
      announcement: id,
      text: text,
      rating: parseInt(rating),
    };

    try {
      const token = localStorage.getItem("token");
      console.log(token, "token");

      const response = await axios({
        url: `${api}/blog/comments/`,
        method: "POST",
        data: JSON.stringify(commentData),
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response);
      setText("");
      setRating("");
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) {
        console.log("Server error details:", err.response.data);
      }
    }
  };

  return (
    <div className="addcom">
      <div className="addcom_col">
        <h4>Текст</h4>
        <TextArea
          showCount
          maxLength={100}
          placeholder="disable resize"
          style={{ height: 120, resize: "none" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="addcom_col">
        <h4>Rating</h4>
        <input
          className="rating"
          type="number"
          placeholder="$"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <div className="bts">
        <button onClick={sendData}>Джонатан</button>
      </div>
    </div>
  );
}
