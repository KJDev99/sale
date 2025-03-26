"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { Carousel, Image, message, Modal } from "antd";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { api } from "../../Host/host";
import Comments from "../../comments/Comments";
import Addcom from "../../Addcomment/Addcom";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Send, UserPen } from "lucide-react";
import AdvertiseBanner from "../../../components/AdvertiseBanner";

export default function page() {
  const [data, setData] = useState();
  const [rate, setrate] = useState(0);
  const [comment, setcomment] = useState("");
  const [isModalOpen, setisModalOpen] = useState(false);

  const route = useRouter();
  const token = localStorage.getItem("token");

  const pathname = usePathname();

  const id = pathname.split("/")[2]; // `&` bo‘yicha bo‘lish

  const sendChats = async () => {
    try {
      const response = await axios({
        url: `${api}/blog/chats/create/`,
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          announcement_id: id,
        },
      });

      if (response.data) {
        toast.success("Чат успешно создан!");
        route.push(`/chat/${response.data.id}`);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data?.message || "Не удалось создать чат.");
      } else {
        toast.error(
          "Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз."
        );
      }
    } finally {
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(`${api}/blog/announcements/${id}`);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleOk = () => {
    if (rate === 0) {
      showToast();
    } else {
      sendDataComment();
    }
  };
  const sendDataComment = async () => {
    try {
      const formData = new FormData();
      formData.append("text", comment);
      formData.append("rating", rate);
      formData.append("announcement", id);

      try {
        const token = localStorage.getItem("token");

        const response = await axios({
          url: `${api}/blog/comments/`,
          method: "POST",
          data: formData,
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setText("");
        setRating("");
        setisModalOpen(false);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) {
          console.log("Server error details:", err.response.data);
        }
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log("Server error details:", err.response.data);
      }
    }
  };
  const showToast = () => {
    toast.error("Вы не оценили товар. Пожалуйста, оцените его.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const handleCancel = () => {
    setisModalOpen(false);
    setrate(0);
    setcomment("");
  };
  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="info">
      <Navbar />
      <div className="info_rows">
        {data && (
          <div className="info_ri">
            <h1>{data?.title}</h1>
            <div className="carousel">
              <Carousel arrows infinite={false}>
                <div>
                  <h3 className="contentStyle">
                    <img
                      src={
                        data.images.length > 0
                          ? data.images[0].image
                          : "/car.png"
                      }
                      alt={data.title || "Product image"}
                      style={{
                        width: "auto",
                        height: "100%",
                        borderRadius: "15px",
                        position: "center",
                        flexWrap: "nowrap",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                  </h3>
                </div>
                <div>
                  <h3 className="contentStyle">
                    <img
                      src={
                        data.images.length > 0
                          ? data.images[0].image
                          : "/car.png"
                      }
                      alt={data.title || "Product image"}
                      style={{
                        width: "auto",
                        height: "100%",
                        borderRadius: "15px",
                        position: "center",
                        flexWrap: "nowrap",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                  </h3>
                </div>
                <div>
                  <h3 className="contentStyle">
                    <img
                      src={
                        data.images.length > 0
                          ? data.images[0].image
                          : "/car.png"
                      }
                      alt={data.title || "Product image"}
                      style={{
                        width: "auto",
                        height: "100%",
                        borderRadius: "15px",
                        position: "center",
                        flexWrap: "nowrap",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                  </h3>
                </div>
                <div>
                  <h3 className="contentStyle">
                    <img
                      src={
                        data.images.length > 0
                          ? data.images[0].image
                          : "/car.png"
                      }
                      alt={data.title || "Product image"}
                      style={{
                        width: "auto",
                        height: "100%",
                        borderRadius: "15px",
                        position: "center",
                        flexWrap: "nowrap",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                  </h3>
                </div>
              </Carousel>
            </div>
            <div className="info_row">
              <div className="info_col">
                <p>
                  Категория:{" "}
                  <span>
                    {data?.category?.name || JSON.stringify(data?.category)}
                  </span>
                </p>
                <p>
                  Условие:{" "}
                  <span>
                    {data?.condition?.name || JSON.stringify(data?.condition)}
                  </span>
                </p>
                <p>
                  Местоположение:{" "}
                  <span>
                    {data?.location?.name || JSON.stringify(data?.location)}
                  </span>
                </p>
                <p>
                  Статус:{" "}
                  <span>
                    {data?.status?.name || JSON.stringify(data?.status)}
                  </span>
                </p>
              </div>
              <div className="info_col2">
                <p>
                  План: <span>{data?.plan}</span>
                </p>
                <p>
                  Приоритет: <span>{data?.priority}</span>
                </p>
                <p>
                  Цена: <span>{data?.price}</span>
                </p>
              </div>
            </div>
            <div className="info_text">
              <h2>Описание</h2>
              <p>{data?.description}</p>
            </div>
            <div></div>
            <div className="com_all">
              <h1>Комментарии</h1>
              <Comments />
            </div>
            <button
              onClick={() => {
                setisModalOpen(true);
              }}
              className="add_com_btn"
            >
              Добавить комментарий
            </button>
            <div className="chat_box">
              <div className="chat_box_text">
                <div className="chat_icon">
                  <p>
                    <UserPen />
                  </p>
                  <p>
                    <Send />
                  </p>
                </div>
                <button onClick={sendChats}>Перейти в чат</button>
              </div>
            </div>
          </div>
        )}

        <Modal
          title="Добавить комментарий"
          open={isModalOpen}
          okText="Отправить"
          cancelText="Отменить"
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="com_form_item">
            <label>Оцените товар</label>
            <div className="add_stars">
              <div
                onClick={() => {
                  setrate(1);
                }}
                className={`add_star ${rate >= 1 ? "active_star" : ""}`}
              >
                <FaRegStar className="star_icon" />{" "}
                <FaStar className="active_star_icon" />
              </div>
              <div
                onClick={() => {
                  setrate(2);
                }}
                className={`add_star ${rate >= 2 ? "active_star" : ""}`}
              >
                <FaRegStar className="star_icon" />{" "}
                <FaStar className="active_star_icon" />
              </div>
              <div
                onClick={() => {
                  setrate(3);
                }}
                className={`add_star ${rate >= 3 ? "active_star" : ""}`}
              >
                <FaRegStar className="star_icon" />{" "}
                <FaStar className="active_star_icon" />
              </div>
              <div
                onClick={() => {
                  setrate(4);
                }}
                className={`add_star ${rate >= 4 ? "active_star" : ""}`}
              >
                <FaRegStar className="star_icon" />{" "}
                <FaStar className="active_star_icon" />
              </div>
              <div
                onClick={() => {
                  setrate(5);
                }}
                className={`add_star ${rate >= 5 ? "active_star" : ""}`}
              >
                <FaRegStar className="star_icon" />{" "}
                <FaStar className="active_star_icon" />
              </div>
            </div>
          </div>
          <div className="com_form_item">
            <label>Комментарий</label>
            <textarea
              rows={6}
              value={comment}
              onChange={(e) => {
                setcomment(e.target.value);
              }}
            ></textarea>
          </div>
        </Modal>

        <div className="advertise">
          <AdvertiseBanner />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
