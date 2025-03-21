"use client";
import { ArrowBigLeft, FilePlus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextArea from "antd/es/input/TextArea";
import { message } from "antd";
import axios from "axios";
import { api } from "../Host/host";

export default function Addpage() {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]); // Store multiple images
  const [errorImage, setErrorImage] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("");
  const [plan, setPlan] = useState("");
  const router = useRouter();

  useEffect(() => {
    getCategory();
  }, []);

  const sendData = async () => {
    if (images.length === 0) {
      setErrorImage(true);
      message.error("Rasm tanlamadingiz");
      return;
    }

    var formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("priority", priority || 1);
    formData.append("plan", plan);

    images.forEach((img) => formData.append("images", img.file)); // Append all images

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${api}/blog/announcements/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      message.success("Announcement created successfully");
      router.push("/");
    } catch (err) {
      console.log("Error:", err);
      message.error("Failed to create announcement");
    }
  };

  const getCategory = async () => {
    try {
      const response = await axios.get(`${api}/blog/categories/`);
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]); // Append new images
    }
  };

  return (
    <div className="add max-w-6xl">
      <div className="add_top">
        <Link href="/" className="link2">
          <ArrowBigLeft />
        </Link>
        <button type="button" className="btn" onClick={sendData}>
          Сохранить и выйти
        </button>
      </div>

      <form>
        <div className="add_bottom">
          <div className="add_bottom_row">
            <div className="add_bottom_col">
              <span>Имя</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="имя"
                required
              />
            </div>

            <div className="add_bottom_col">
              <span>Место</span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="информация"
                required
              />
            </div>

            <div className="add_bottom_col">
              <span>Цена</span>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="number"
                type="number"
                placeholder="$"
              />
            </div>

            <div className="add_bottom_col">
              <span>Приоритет</span>
              <input
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="number"
                type="number"
                placeholder="1"
              />
            </div>
          </div>

          <div className="add_bottom_row2">
            <div className="add_bottom_col">
              <span>План</span>
              <select value={plan} onChange={(e) => setPlan(e.target.value)}>
                <option>Вершина</option>
                <option>Середина</option>
                <option>Стандартный</option>
              </select>
            </div>

            <div className="add_bottom_col">
              <span>Категория</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((item, key) => (
                  <option key={key} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="add_bottom_col add_text">
            <span>Тариф</span>
            <TextArea
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Info"
              style={{ height: 150, resize: "none" }}
            />
          </div>

          <div className="add_bottom_col add_img">
            <span>Фото</span>
            <div className="img_box">
              <div className="upload-box">
                <div
                  className={`input_file ${errorImage ? "error_image" : ""}`}
                >
                  <FilePlus />
                </div>
                <input
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />
              </div>

              <div className="box">
                {images.length > 0 ? (
                  images.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt="Uploaded"
                      className="preview-img"
                    />
                  ))
                ) : (
                  <p>Загруженное изображение пока недоступно.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
