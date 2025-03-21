"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { api } from "../../Host/host";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Message from "../../Chats/Message";
import Loader from "../../../components/Loader";

export default function Page() {
  const router = useRouter();
  const [chat, setChats] = useState();
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");
  const [loadings, setLoadings] = useState(false);

  const sendMessage = {
    text: text,
  };

  const pathname = usePathname();

  const id = pathname.split("/")[2];

  const sendChat = async () => {
    if (!text) return false;
    try {
      const response = await axios({
        url: `${api}/blog/chats/${id}/messages/`,
        method: "POST",
        data: JSON.stringify(sendMessage),
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      setText("");
      getChats();
    } catch (err) {
      console.error("Error creating chat:", err);
      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response data:", err.response.data);
      }
    }
  };

  const [data, setData] = useState();

  useEffect(() => {
    getChats();
  }, []);

  const getChats = async () => {
    setLoadings(true);
    try {
      const response = await axios({
        url: `${api}/blog/chats/`,
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      setData(response.data);
    } catch (err) {
      console.error("Error fetching chats:", err);
      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response data:", err.response.data);
      }
    } finally {
      setLoadings(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendChat();
    }
  };

  if (loadings) return <Loader />;

  return (
    <div className="chat">
      <div className="message">
        <Message data={data} />
      </div>
      <div className="chats flex items-center border-t p-2 bg-white">
        <input
          type="text"
          placeholder="text"
          value={text}
          onKeyDown={handleKeyDown}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={sendChat}>
          <ArrowUp />
        </button>
      </div>
    </div>
  );
}
