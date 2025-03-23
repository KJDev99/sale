"use client";
import { ArrowBigLeft, FilePlus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextArea from "antd/es/input/TextArea";
import { message } from "antd";
import axios from "axios";
import { api } from "../Host/host";
import { toast, ToastContainer } from "react-toastify";
import { MdClose, MdOutlineCurrencyRuble } from "react-icons/md";
import { FaRubleSign } from "react-icons/fa";

export default function Addpage() {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [errorImage, setErrorImage] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("");
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState("");
  const router = useRouter();
  const [modal, setModal] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [addAdsId, setAddAdsId] = useState("");

  const handleSelect = (id) => {
    setSelectedPlan(id);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const sendData = async () => {
    if (images.length === 0) {
      setErrorImage(true);
      toast.error("Rasm tanlamadingiz");
      return;
    }

    let formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("priority", priority || 1);

    images.forEach((img) => formData.append("images", img.file));

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Malumot saqlanmadi iltimos hisobingizga kiring");
      return;
    }
    try {
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

      toast.success("Announcement created successfully");

      setModal(response.data.id);
    } catch (err) {
      console.log("Error:", err);
      toast.error("Malumot saqlanmadi iltimos hisobingizga kiring");
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
      setImages((prev) => [...prev, ...newImages]);
    }
  };
  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${api}/blog/plans/`);
      setPlans(response.data);
      console.log("Plans:", response.data);
    } catch (err) {
      console.error("Plans API Error:", err);
    }
  };

  const Plane = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Malumot saqlanmadi iltimos hisobingizga kiring");
      return;
    }
    try {
      const res = await axios.post(
        "https://mirzohidjon.pythonanywhere.com/blog/payments/create/",
        {
          announcement: modal,
          plan: selectedPlan,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      localStorage.setItem("paymentID", res.data.payment_id);
      if (selectedPlan == 2) {
        router.push("/");
      } else {
        window.location.href = res.data.confirmation_url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

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
            {/* <div className="add_bottom_col">
              <span>План</span>
              <select value={plan} onChange={(e) => setPlan(e.target.value)}>
                <option key={0} value={0}>
                  Выберите план
                </option>

                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="add_bottom_col add_bottom_col2">
              <span>Категория</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option key={0} value={0}>
                  Выберите категорию
                </option>
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
      {modal ? (
        <div className="modal_bg">
          <div className="modal_box">
            <div className="modal_header">
              <h2>PLAN </h2>
              <button className="modal_close" onClick={() => setModal("")}>
                <MdClose />
              </button>
            </div>
            <div className="modal_body">
              <div className="modal_plan">
                {plans.map((p) => (
                  <div
                    key={p.id}
                    className={`modal_plan-card ${
                      selectedPlan === p.id ? "selected" : ""
                    }`}
                    onClick={() => handleSelect(p.id)}
                  >
                    {p.name}
                    <div className="modal_price">
                      {p.amount} <MdOutlineCurrencyRuble />{" "}
                    </div>
                  </div>
                ))}
              </div>
              <p>
                Siz bizni tariflarimiz bilan mahsulotingizni yanada tez sotishiz
                mumkin.
              </p>
            </div>
            <div className="modal_btn">
              <button className="btn" onClick={() => Plane()}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <ToastContainer />
    </div>
  );
}
